import re


def validate_register(data):
    """
    Validate Register Request
    """

    if not data:
        return "Request body is missing"

    # Employee ID
    if not data.get("employee_id"):
        return "Employee ID is required"

    try:
        int(data["employee_id"])
    except (ValueError, TypeError):
        return "Employee ID must be an integer"

    # Username
    username = data.get("username", "").strip()

    if not username:
        return "Username is required"

    if len(username) < 4:
        return "Username must be at least 4 characters"

    # Password
    password = data.get("password", "")

    if not password:
        return "Password is required"

    if len(password) < 8:
        return "Password must be at least 8 characters"

    # At least one uppercase
    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter"

    # At least one lowercase
    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter"

    # At least one digit
    if not re.search(r"\d", password):
        return "Password must contain at least one number"

    # At least one special character
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "Password must contain at least one special character"

    # Role
    role = data.get("role")

    if role not in ["Admin", "HR", "Employee"]:
        return "Invalid role"

    return None


def validate_login(data):
    """
    Validate Login Request
    """

    if not data:
        return "Request body is missing"

    username = data.get("username", "").strip()

    if not username:
        return "Username is required"

    password = data.get("password", "")

    if not password:
        return "Password is required"

    return None


def validate_forgot_password(data):
    """
    Validate Forgot Password Request
    """

    if not data:
        return "Request body is missing"

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username and not email:
        return "Username or email is required"

    if email and not re.match(
        r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        email
    ):
        return "Invalid email format"

    return None


def validate_reset_password(data):
    """
    Validate Reset Password Request
    """

    if not data:
        return "Request body is missing"

    token = data.get("token", "").strip()

    if not token:
        return "Reset token is required"

    password = data.get("password", "")

    if not password:
        return "Password is required"

    if len(password) < 8:
        return "Password must be at least 8 characters"

    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter"

    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter"

    if not re.search(r"\d", password):
        return "Password must contain at least one number"

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "Password must contain at least one special character"

    return None