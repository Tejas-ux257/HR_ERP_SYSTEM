from datetime import datetime


def validate_leave_application(data):
    """
    Validate Leave Application
    """

    if not data:
        return "Request body is required"

    required_fields = [
        "employee_id",
        "leave_type",
        "start_date",
        "end_date",
        "reason"
    ]

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return f"{field.replace('_', ' ').title()} is required"

    valid_leave_types = [
        "Casual",
        "Sick",
        "Earned"
    ]

    if data["leave_type"] not in valid_leave_types:
        return (
            "Leave type must be Casual, Sick or Earned"
        )

    try:
        start_date = datetime.strptime(
            data["start_date"],
            "%Y-%m-%d"
        ).date()

        end_date = datetime.strptime(
            data["end_date"],
            "%Y-%m-%d"
        ).date()

    except ValueError:
        return "Date format must be YYYY-MM-DD"

    if start_date > end_date:
        return "Start date cannot be after end date"


    return None



def validate_employee_leave_application(data):
    """
    Validate Employee Leave Application
    """

    if not data:
        return "Request body is required"

    required_fields = [
        "leave_type",
        "start_date",
        "end_date",
        "reason"
    ]

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return f"{field.replace('_', ' ').title()} is required"

    valid_leave_types = [
        "Casual",
        "Sick",
        "Earned"
    ]

    if data["leave_type"] not in valid_leave_types:
        return "Leave type must be Casual, Sick or Earned"

    try:
        start_date = datetime.strptime(
            data["start_date"],
            "%Y-%m-%d"
        ).date()

        end_date = datetime.strptime(
            data["end_date"],
            "%Y-%m-%d"
        ).date()

    except ValueError:
        return "Date format must be YYYY-MM-DD"

    if start_date > end_date:
        return "Start date cannot be after end date"

    return None