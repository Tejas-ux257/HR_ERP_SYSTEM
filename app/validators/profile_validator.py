from app.utils.response import error_response


def validate_profile_update(data):
    """
    Validate employee profile update request.
    """

    required_fields = [
        "name",
        "phone",
        "email",
        "address",
        "gender",
        "dob"
    ]

    for field in required_fields:
        if field not in data or str(data[field]).strip() == "":
            return error_response(f"{field} is required", 400)

    if data["gender"] not in ["Male", "Female", "Other"]:
        return error_response(
            "Gender must be Male, Female or Other",
            400
        )

    return None


def validate_change_password(data):
    """
    Validate password change request.
    """

    required_fields = [
        "current_password",
        "new_password"
    ]

    for field in required_fields:
        if field not in data or str(data[field]).strip() == "":
            return error_response(f"{field} is required", 400)

    if len(data["new_password"]) < 6:
        return error_response(
            "Password must contain at least 6 characters",
            400
        )

    return None