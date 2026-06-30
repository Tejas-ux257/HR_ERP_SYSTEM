import re


def validate_employee(data):
    """
    Validate Employee Request Data
    """

    # Check if request body exists
    if not data:
        return "Request body is missing"

    # Department ID
    if not data.get("department_id"):
        return "Department ID is required"

    # Employee Name
    if not data.get("name"):
        return "Employee name is required"

    # Phone Number
    if not data.get("phone"):
        return "Phone number is required"

    # Email
    if not data.get("email"):
        return "Email is required"

    # Department ID must be integer
    try:
        int(data["department_id"])
    except (ValueError, TypeError):
        return "Department ID must be a valid integer"

    # Name Length
    if len(data["name"].strip()) < 3:
        return "Employee name must contain at least 3 characters"

    # Phone Validation
    phone = str(data["phone"]).strip()

    if not phone.isdigit():
        return "Phone number must contain only digits"

    if len(phone) != 10:
        return "Phone number must be exactly 10 digits"

    # Email Validation
    email_pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if not re.match(email_pattern, data["email"]):
        return "Invalid email address"

    return None