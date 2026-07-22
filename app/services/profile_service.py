from app.database import get_db_connection
from app.models.employee import Employee
from app.utils.password import verify_password, hash_password


class ProfileService:

    @staticmethod
    def get_profile(employee_id):
        """
        Get logged-in employee profile.
        """

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
        SELECT
        e.*,
        d.department_name,
        d.department_code
        FROM employees e
        INNER JOIN departments d
        ON e.department_id = d.department_id
       WHERE e.id = %s
       """, (employee_id,))

        row = cursor.fetchone()

        cursor.close()
        connection.close()

        if not row:
            return None

        return Employee.from_db_row(row).to_dict()

    @staticmethod
    def update_profile(employee_id, data):
        """
        Update employee profile.
        """

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("""
            UPDATE employees
            SET
                name=%s,
                phone=%s,
                email=%s,
                address=%s,
                gender=%s,
                dob=%s
            WHERE id=%s
        """, (
            data["name"],
            data["phone"],
            data["email"],
            data["address"],
            data["gender"],
            data["dob"],
            employee_id
        ))

        connection.commit()

        cursor.close()
        connection.close()

        return True

    @staticmethod
    def change_password(employee_id, current_password, new_password):
        """
        Change employee password.
        """

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT password
            FROM users
            WHERE employee_id=%s
        """, (employee_id,))

        user = cursor.fetchone()

        if not user:
            cursor.close()
            connection.close()
            return False, "User not found"

        if not verify_password(current_password, user["password"]):
            cursor.close()
            connection.close()
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

        cursor.close()
        connection.close()

        return True, "Password changed successfully"