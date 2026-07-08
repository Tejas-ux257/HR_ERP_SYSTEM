from datetime import date

from app.database import get_db_connection


def get_dashboard_summary():
    """
    Get Dashboard Summary
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Total Employees
        cursor.execute(
            "SELECT COUNT(*) AS total FROM employees"
        )
        total_employees = cursor.fetchone()["total"]

        # Total Departments
        cursor.execute(
            "SELECT COUNT(*) AS total FROM departments"
        )
        total_departments = cursor.fetchone()["total"]

        # Today's Attendance
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM attendance
            WHERE attendance_date=%s
            """,
            (date.today(),)
        )
        today_attendance = cursor.fetchone()["total"]

        # Pending Leaves
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM leaves
            WHERE status='Pending'
            """
        )
        pending_leaves = cursor.fetchone()["total"]

        # Approved Leaves
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM leaves
            WHERE status='Approved'
            """
        )
        approved_leaves = cursor.fetchone()["total"]

        # Total Payroll Records
        cursor.execute(
            "SELECT COUNT(*) AS total FROM payroll"
        )
        total_payroll_records = cursor.fetchone()["total"]

        return {
            "total_employees": total_employees,
            "total_departments": total_departments,
            "today_attendance": today_attendance,
            "pending_leaves": pending_leaves,
            "approved_leaves": approved_leaves,
            "total_payroll_records": total_payroll_records
        }

    finally:
        cursor.close()
        conn.close()