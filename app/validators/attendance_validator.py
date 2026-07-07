def validate_check_in(data):
    """
    Validate Check-In Request
    """

    if not data:
        return "Request body is required"

    if "employee_id" not in data:
        return "Employee ID is required"

    return None


def validate_check_out(data):
    """
    Validate Check-Out Request
    """

    if not data:
        return "Request body is required"

    if "employee_id" not in data:
        return "Employee ID is required"

    return None