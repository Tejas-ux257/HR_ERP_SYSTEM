
from app.database import get_db_connection
from app.models.attendance import Attendance
from datetime import date, datetime

from app.database import get_db_connection


def check_in(employee_id):
    """
    Employee Check-In
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

        # Check today's attendance
        cursor.execute(
            """
            SELECT id
            FROM attendance
            WHERE employee_id=%s
            AND attendance_date=%s
            """,
            (employee_id, date.today())
        )

        attendance = cursor.fetchone()

        if attendance:
            raise Exception("Employee already checked in today")

        # Insert attendance
        cursor.execute(
            """
            INSERT INTO attendance
            (
                employee_id,
                attendance_date,
                check_in,
                status
            )
            VALUES (%s,%s,%s,%s)
            """,
            (
                employee_id,
                date.today(),
                datetime.now(),
                "Present"
            )
        )

        conn.commit()

        return {
            "employee_id": employee_id,
            "attendance_date": str(date.today()),
            "message": "Check-in successful"
        }

    finally:
        cursor.close()
        conn.close()
        
        
def check_out(employee_id):
    """
    Employee Check-Out
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Check today's attendance
        cursor.execute(
            """
            SELECT *
            FROM attendance
            WHERE employee_id=%s
            AND attendance_date=%s
            """,
            (
                employee_id,
                date.today()
            )
        )

        attendance = cursor.fetchone()

        if attendance is None:
            raise Exception(
                "Employee has not checked in today"
            )

        if attendance["check_out"] is not None:
            raise Exception(
                "Employee already checked out today"
            )

        cursor.execute(
            """
            UPDATE attendance
            SET check_out=%s
            WHERE id=%s
            """,
            (
                datetime.now(),
                attendance["id"]
            )
        )

        conn.commit()

        return {
            "employee_id": employee_id,
            "attendance_date": str(date.today()),
            "message": "Check-out successful"
        }

    finally:
        cursor.close()
        conn.close()        
        
        
def get_all_attendance():
    """
    Get All Attendance Records
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM attendance
            ORDER BY attendance_date DESC
            """
        )

        rows = cursor.fetchall()

        attendance = [
            Attendance.from_db_row(row).to_dict()
            for row in rows
        ]

        return attendance

    finally:
        cursor.close()
        conn.close()        
        
def get_employee_attendance(employee_id):
    """
    Get Attendance History for an Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM attendance
            WHERE employee_id=%s
            ORDER BY attendance_date DESC
            """,
            (employee_id,)
        )

        rows = cursor.fetchall()

        attendance = [
            Attendance.from_db_row(row).to_dict()
            for row in rows
        ]

        return attendance

    finally:
        cursor.close()
        conn.close()        
        
        
        
def get_today_attendance():
    """
    Get Today's Attendance Records
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM attendance
            WHERE attendance_date=%s
            """,
            (date.today(),)
        )

        rows = cursor.fetchall()

        attendance = [
            Attendance.from_db_row(row).to_dict()
            for row in rows
        ]

        return attendance

    finally:
        cursor.close()
        conn.close()        