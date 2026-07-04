
import mysql.connector
from app.database import get_db_connection
from app.models.user import User
from app.utils.password import hash_password, verify_password
from app.utils.jwt_helper import generate_token


def register_user(employee_id, username, password, role):
    """
    Register New User
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        # Check Employee Exists
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
            raise Exception("Employee does not exist")

        # Check Employee Already Registered
        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE employee_id=%s
            """,
            (employee_id,)
        )

        if cursor.fetchone():
            raise Exception("Employee already has an account")

        # Check Username Exists
        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE username=%s
            """,
            (username,)
        )

        if cursor.fetchone():
            raise Exception("Username already exists")

        # Hash Password
        hashed_password = hash_password(password)

        # Insert User
        cursor.execute(
            """
            INSERT INTO users
            (
                employee_id,
                username,
                password,
                role
            )
            VALUES (%s,%s,%s,%s)
            """,
            (
                employee_id,
                username,
                hashed_password,
                role
            )
        )

        conn.commit()

        user_id = cursor.lastrowid

        return {
            "id": user_id,
            "employee_id": employee_id,
            "username": username,
            "role": role
        }

    except mysql.connector.IntegrityError:
        raise Exception("Unable to register user")

    finally:
        cursor.close()
        conn.close()


def login_user(username, password):
    """
    Login User
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username=%s
        """,
        (username,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if row is None:
        raise Exception("Invalid username or password")

    user = User.from_db_row(row)

    if not verify_password(password, user.password):
        raise Exception("Invalid username or password")

    token = generate_token(
        {
            "id": user.id,
            "employee_id": user.employee_id,
            "username": user.username,
            "role": user.role
        }
    )

    return {
        "user": user.to_dict(),
        "token": token
    }


