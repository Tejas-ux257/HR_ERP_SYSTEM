import mysql.connector

from app.database import get_db_connection
from app.models.payroll import Payroll


def generate_payroll(
    employee_id,
    month,
    year,
    basic_salary,
    allowances,
    deductions
):
    """
    Generate Payroll
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

        # Calculate Net Salary
        net_salary = (
            basic_salary +
            allowances -
            deductions
        )

        # Insert Payroll
        cursor.execute(
            """
            INSERT INTO payroll
            (
                employee_id,
                month,
                year,
                basic_salary,
                allowances,
                deductions,
                net_salary
            )
            VALUES (%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                employee_id,
                month,
                year,
                basic_salary,
                allowances,
                deductions,
                net_salary
            )
        )

        conn.commit()

        payroll_id = cursor.lastrowid

        cursor.execute(
            """
            SELECT *
            FROM payroll
            WHERE id=%s
            """,
            (payroll_id,)
        )

        row = cursor.fetchone()

        return Payroll.from_db_row(row).to_dict()

    except mysql.connector.Error as e:
        raise Exception(str(e))

    finally:
        cursor.close()
        conn.close()
        
        
def get_all_payroll():
    """
    Get All Payroll Records
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM payroll
            ORDER BY generated_at DESC
            """
        )

        rows = cursor.fetchall()

        payroll = [
            Payroll.from_db_row(row).to_dict()
            for row in rows
        ]

        return payroll

    finally:
        cursor.close()
        conn.close()        
        
def get_employee_payroll(employee_id):
    """
    Get Payroll History for an Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM payroll
            WHERE employee_id=%s
            ORDER BY generated_at DESC
            """,
            (employee_id,)
        )

        rows = cursor.fetchall()

        payroll = [
            Payroll.from_db_row(row).to_dict()
            for row in rows
        ]

        return payroll

    finally:
        cursor.close()
        conn.close()  
        
        
def update_payroll(
    payroll_id,
    basic_salary,
    allowances,
    deductions
):
    """
    Update Payroll
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM payroll
            WHERE id=%s
            """,
            (payroll_id,)
        )

        payroll = cursor.fetchone()

        if payroll is None:
            raise Exception("Payroll record not found")

        net_salary = (
            basic_salary +
            allowances -
            deductions
        )

        cursor.execute(
            """
            UPDATE payroll
            SET
                basic_salary=%s,
                allowances=%s,
                deductions=%s,
                net_salary=%s
            WHERE id=%s
            """,
            (
                basic_salary,
                allowances,
                deductions,
                net_salary,
                payroll_id
            )
        )

        conn.commit()

        cursor.execute(
            """
            SELECT *
            FROM payroll
            WHERE id=%s
            """,
            (payroll_id,)
        )

        row = cursor.fetchone()

        return Payroll.from_db_row(row).to_dict()

    finally:
        cursor.close()
        conn.close()        