import mysql.connector

from app.database import get_db_connection
from app.models.leave import Leave


def apply_leave(
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason
):
    """
    Apply for Leave
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Check employee exists
        cursor.execute(
            """
            SELECT id
            FROM employees
            WHERE id=%s
            """,
            (employee_id,)
        )

        employee = cursor.fetchone()

        if employee is None:
            raise Exception("Employee not found")

        # Insert leave request
        cursor.execute(
            """
            INSERT INTO leaves
            (
                employee_id,
                leave_type,
                start_date,
                end_date,
                reason
            )
            VALUES (%s,%s,%s,%s,%s)
            """,
            (
                employee_id,
                leave_type,
                start_date,
                end_date,
                reason
            )
        )

        conn.commit()

        leave_id = cursor.lastrowid

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE id=%s
            """,
            (leave_id,)
        )

        row = cursor.fetchone()

        return Leave.from_db_row(row).to_dict()

    except mysql.connector.Error as e:
        raise Exception(str(e))

    finally:
        cursor.close()
        conn.close() 
          
          
def get_employee_leaves(employee_id):
    """
    Get Leave History for an Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE employee_id=%s
            ORDER BY applied_at DESC
            """,
            (employee_id,)
        )

        rows = cursor.fetchall()

        leaves = [
            Leave.from_db_row(row).to_dict()
            for row in rows
        ]

        return leaves

    finally:
        cursor.close()
        conn.close()          
         
         
def get_all_leaves():
    """
    Get All Leave Requests
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT
                l.id,
                l.employee_id,
                e.name AS employee_name,
                e.email,
                d.department_name,
                l.leave_type,
                l.start_date,
                l.end_date,
                l.reason,
                l.status,
                l.applied_at
            FROM leaves l
            INNER JOIN employees e
                ON l.employee_id = e.id
            INNER JOIN departments d
                ON e.department_id = d.department_id
            ORDER BY l.applied_at DESC
            """
        )

        return cursor.fetchall()

    finally:
        cursor.close()
        conn.close()         
        
def approve_leave(leave_id):
    """
    Approve Leave Request
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE id=%s
            """,
            (leave_id,)
        )

        leave = cursor.fetchone()

        if leave is None:
            raise Exception("Leave request not found")

        if leave["status"] != "Pending":
            raise Exception("Leave request is already processed")

        cursor.execute(
            """
            UPDATE leaves
            SET status='Approved'
            WHERE id=%s
            """,
            (leave_id,)
        )

        conn.commit()

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE id=%s
            """,
            (leave_id,)
        )

        row = cursor.fetchone()

        return Leave.from_db_row(row).to_dict()

    finally:
        cursor.close()
        conn.close()      
        
        
def reject_leave(leave_id):
    """
    Reject Leave Request
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE id=%s
            """,
            (leave_id,)
        )

        leave = cursor.fetchone()

        if leave is None:
            raise Exception("Leave request not found")

        if leave["status"] != "Pending":
            raise Exception("Leave request is already processed")

        cursor.execute(
            """
            UPDATE leaves
            SET status='Rejected'
            WHERE id=%s
            """,
            (leave_id,)
        )

        conn.commit()

        cursor.execute(
            """
            SELECT *
            FROM leaves
            WHERE id=%s
            """,
            (leave_id,)
        )

        row = cursor.fetchone()

        return Leave.from_db_row(row).to_dict()

    finally:
        cursor.close()
        conn.close()          