import mysql.connector

from app.database import get_db_connection
from app.models.department import Department


def create_department(department_name, department_code):
    """
    Create a new department
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO departments
            (department_name, department_code)
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
    Fetch all departments
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            department_id,
            department_name,
            department_code
        FROM departments
        ORDER BY department_id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        Department.from_db_row(row).to_dict()
        for row in rows
    ]


def get_department_by_id(department_id):
    """
    Fetch one department
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            department_id,
            department_name,
            department_code
        FROM departments
        WHERE department_id=%s
        """,
        (department_id,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if row:
        return Department.from_db_row(row).to_dict()

    return None


def update_department(
        department_id,
        department_name,
        department_code
):
    """
    Update Department
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            UPDATE departments
            SET department_name=%s,
                department_code=%s
            WHERE department_id=%s
            """,
            (
                department_name,
                department_code,
                department_id
            )
        )

        conn.commit()

        return Department(
            department_id,
            department_name,
            department_code
        ).to_dict()

    except mysql.connector.IntegrityError as e:

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
    Delete Department
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM departments
        WHERE department_id=%s
        """,
        (department_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "deleted_department_id": department_id
    }