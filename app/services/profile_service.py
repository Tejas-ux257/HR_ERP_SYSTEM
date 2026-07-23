from app.database import get_db_connection
from app.models.employee import Employee
from app.utils.password import verify_password, hash_password


class ProfileService:

    @staticmethod
    def get_profile(employee_id):
        """Get logged-in employee profile."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            cursor.execute("""
                SELECT
                    e.*,
                    d.department_name,
                    d.department_code
                FROM employees e
                LEFT JOIN departments d
                    ON e.department_id = d.department_id
                WHERE e.id = %s
            """, (employee_id,))

            row = cursor.fetchone()

            if not row:
                return None

            return Employee.from_db_row(row).to_dict()

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def update_profile(employee_id, data):
        """Update logged-in employee profile."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            email = data.get("email")

            if email:
                cursor.execute("""
                    SELECT id
                    FROM employees
                    WHERE email=%s
                    AND id!=%s
                """, (email, employee_id))

                if cursor.fetchone():
                    raise ValueError(
                        "This email address is already in use by another employee."
                    )

            cursor.execute("""
                UPDATE employees
                SET
                    name=%s,
                    email=%s,
                    phone=%s,
                    address=%s,
                    gender=%s,
                    dob=%s
                WHERE id=%s
            """, (
                data.get("name"),
                data.get("email"),
                data.get("phone"),
                data.get("address"),
                data.get("gender"),
                data.get("dob"),
                employee_id
            ))

            connection.commit()

            return ProfileService.get_profile(employee_id)

        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def change_password(employee_id, current_password, new_password):
        """Change employee password."""
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            cursor.execute("""
                SELECT password
                FROM users
                WHERE employee_id=%s
            """, (employee_id,))

            user = cursor.fetchone()

            if not user:
                return False, "User not found"

            if not verify_password(current_password, user["password"]):
                return False, "Current password is incorrect"

            hashed_password = hash_password(new_password)

            cursor.execute("""
                UPDATE users
                SET password=%s
                WHERE employee_id=%s
            """, (
                hashed_password,
                employee_id
            ))

            connection.commit()

            return True, "Password changed successfully"

        finally:
            cursor.close()
            connection.close()