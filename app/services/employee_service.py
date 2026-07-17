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


def get_all_employees(page=1, limit=10, search=""):
    """
    Get All Employees with pagination
    """

    if page < 1:
        page = 1

    if limit < 1:
        limit = 10

    offset = (page - 1) * limit

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    search_pattern = f"%{search}%"

    try:
        query = """
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
        """

        params = []

        if search:
            query += """
                WHERE
                    e.name LIKE %s
                    OR e.email LIKE %s
                    OR e.phone LIKE %s
                    OR d.department_name LIKE %s
                    OR d.department_code LIKE %s
            """
            params.extend([search_pattern] * 5)

        query += """
            ORDER BY e.id
            LIMIT %s OFFSET %s
        """
        params.extend([limit, offset])

        cursor.execute(query, tuple(params))

        rows = cursor.fetchall()

        count_query = """
            SELECT COUNT(*) AS total_count
            FROM employees e
            INNER JOIN departments d
                ON e.department_id = d.department_id
        """

        count_params = []

        if search:
            count_query += """
                WHERE
                    e.name LIKE %s
                    OR e.email LIKE %s
                    OR e.phone LIKE %s
                    OR d.department_name LIKE %s
                    OR d.department_code LIKE %s
            """
            count_params.extend([search_pattern] * 5)

        cursor.execute(count_query, tuple(count_params))

        count_row = cursor.fetchone()
        total_count = count_row["total_count"] if count_row else 0

        has_next = (offset + len(rows)) < total_count

        return {
            "employees": [
                Employee.from_db_row(row).to_dict()
                for row in rows
            ],
            "total_count": total_count,
            "has_next": has_next
        }

    finally:
        cursor.close()
        conn.close()


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