import mysql.connector

from app.database import get_db_connection
from app.models.employee import Employee


def create_employee(department_id, name, phone, email):
    """
    Create Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Check Department Exists
        cursor.execute(
            """
            SELECT department_id
            FROM departments
            WHERE department_id=%s
            """,
            (department_id,)
        )

        if cursor.fetchone() is None:
            raise Exception("Department does not exist")

        # Insert Employee
        cursor.execute(
            """
            INSERT INTO employees
            (department_id, name, phone, email)
            VALUES (%s, %s, %s, %s)
            """,
            (
                department_id,
                name,
                phone,
                email
            )
        )

        conn.commit()

        employee_id = cursor.lastrowid

        return get_employee_by_id(employee_id)

    except mysql.connector.IntegrityError:

        raise Exception("Email already exists")

    finally:

        cursor.close()
        conn.close()


def get_all_employees():
    """
    Get All Employees
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            e.id,
            e.department_id,
            e.name,
            e.phone,
            e.email,
            d.department_name,
            d.department_code
        FROM employees e
        INNER JOIN departments d
            ON e.department_id = d.department_id
        ORDER BY e.id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        Employee.from_db_row(row).to_dict()
        for row in rows
    ]


def get_employee_by_id(employee_id):
    """
    Get Employee By ID
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            e.id,
            e.department_id,
            e.name,
            e.phone,
            e.email,
            d.department_name,
            d.department_code
        FROM employees e
        INNER JOIN departments d
            ON e.department_id = d.department_id
        WHERE e.id=%s
        """,
        (employee_id,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if row:
        return Employee.from_db_row(row).to_dict()

    return None


def update_employee(
        employee_id,
        department_id,
        name,
        phone,
        email
):
    """
    Update Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Check Department Exists
        cursor.execute(
            """
            SELECT department_id
            FROM departments
            WHERE department_id=%s
            """,
            (department_id,)
        )

        if cursor.fetchone() is None:
            raise Exception("Department does not exist")

        cursor.execute(
            """
            UPDATE employees
            SET
                department_id=%s,
                name=%s,
                phone=%s,
                email=%s
            WHERE id=%s
            """,
            (
                department_id,
                name,
                phone,
                email,
                employee_id
            )
        )

        conn.commit()

        return get_employee_by_id(employee_id)

    except mysql.connector.IntegrityError:

        raise Exception("Email already exists")

    finally:

        cursor.close()
        conn.close()


def delete_employee(employee_id):
    """
    Delete Employee
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM employees
        WHERE id=%s
        """,
        (employee_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "deleted_employee_id": employee_id
    }