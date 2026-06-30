def validate_department(data):
    """
    Validate Department Request Data
    """

    # Check if request body exists
    if not data:
        return "Request body is missing"

    # Validate Department Name
    if not data.get("department_name"):
        return "Department name is required"

    # Validate Department Code
    if not data.get("department_code"):
        return "Department code is required"

    return None