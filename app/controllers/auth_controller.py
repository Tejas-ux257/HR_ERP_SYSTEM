from flask import request
from app.services.auth_service import (
    register_user,
    login_user,
   
)

from app.validators.auth_validator import (
    validate_register,
    validate_login,
)

from app.utils.response import (
    success_response,
    error_response
)


def register_controller():
    """
    Register User
    """

    try:

        data = request.get_json()

        error = validate_register(data)

        if error:
            return error_response(error, 400)

        user = register_user(
            employee_id=data["employee_id"],
            username=data["username"],
            password=data["password"],
            role=data["role"]
        )

        return success_response(
            user,
            "User registered successfully",
            201
        )

    except Exception as e:
        return error_response(str(e), 409)


def login_controller():
    """
    Login User
    """

    try:

        data = request.get_json()

        error = validate_login(data)

        if error:
            return error_response(error, 400)

        result = login_user(
            username=data["username"],
            password=data["password"]
        )

        return success_response(
            result,
            "Login successful"
        )

    except Exception as e:
        return error_response(str(e), 401)


