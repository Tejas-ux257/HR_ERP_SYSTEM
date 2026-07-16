import mysql.connector

from app.database import get_db_connection
from app.models.department import Department


def create_department(department_name, department_code):
    """
    Create a new department.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO departments (department_name, department_code)
            VALUES (%s, %s)
            """,
            (department_name, department_code)
        )

        conn.commit()

        department_id = cursor.lastrowid

        return Department(
            department_id,
            department_name,
            department_code
        ).to_dict()

    except mysql.connector.IntegrityError as e:
        conn.rollback()

        if "department_name" in str(e):
            raise Exception("Department name already exists")

        if "department_code" in str(e):
            raise Exception("Department code already exists")

        raise

    finally:
        cursor.close()
        conn.close()


def get_all_departments():
    """
    Fetch all departments.
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT department_id, department_name, department_code
            FROM departments
            ORDER BY department_id
            """
        )

        rows = cursor.fetchall()

        return [Department.from_db_row(row).to_dict() for row in rows]

    finally:
        cursor.close()
        conn.close()


def get_department_by_id(department_id):
    """
    Fetch one department by ID.
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT department_id, department_name, department_code
            FROM departments
            WHERE department_id = %s
            """,
            (department_id,)
        )

        row = cursor.fetchone()

        if row:
            return Department.from_db_row(row).to_dict()

        return None

    finally:
        cursor.close()
        conn.close()


def update_department(department_id, department_name, department_code):
    """
    Update an existing department.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            UPDATE departments
            SET department_name = %s,
                department_code = %s
            WHERE department_id = %s
            """,
            (department_name, department_code, department_id)
        )

        conn.commit()

        return Department(
            department_id,
            department_name,
            department_code
        ).to_dict()

    except mysql.connector.IntegrityError as e:
        conn.rollback()

        if "department_name" in str(e):
            raise Exception("Department name already exists")

        if "department_code" in str(e):
            raise Exception("Department code already exists")

        raise

    finally:
        cursor.close()
        conn.close()


def delete_department(department_id):
    """
    Delete a department if it has no assigned employees.
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT department_id
            FROM departments
            WHERE department_id = %s
            """,
            (department_id,)
        )

        department = cursor.fetchone()

        if not department:
            raise Exception("Department not found")

        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM employees
            WHERE department_id = %s
            """,
            (department_id,)
        )

        result = cursor.fetchone()

        if result["total"] > 0:
            raise Exception(
                "Cannot delete department because employees are assigned to it."
            )

        cursor.execute(
            """
            DELETE FROM departments
            WHERE department_id = %s
            """,
            (department_id,)
        )

        conn.commit()

        return {
            "deleted_department_id": department_id
        }

    except mysql.connector.Error:
        conn.rollback()
        raise

    finally:
        cursor.close()
        conn.close()
