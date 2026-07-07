from flask import request

from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required

from app.services.attendance_service import (
    check_in,
    check_out,
    get_all_attendance,
    get_employee_attendance,
    get_today_attendance
    
)

from app.validators.attendance_validator import (
    validate_check_in,
    validate_check_out
)

from app.utils.response import (
    success_response,
    error_response
)


@jwt_required
@roles_required("Admin", "HR", "Employee")
def check_in_controller():
    """
    Employee Check-In
    """

    try:

        data = request.get_json()

        error = validate_check_in(data)

        if error:
            return error_response(error, 400)

        attendance = check_in(
            data["employee_id"]
        )

        return success_response(
            attendance,
            "Check-in successful",
            201
        )

    except Exception as e:
        return error_response(
            str(e),
            400
        )


@jwt_required
@roles_required("Admin", "HR", "Employee")
def check_out_controller():
    """
    Employee Check-Out
    """

    try:

        data = request.get_json()

        error = validate_check_out(data)

        if error:
            return error_response(error, 400)

        attendance = check_out(
            data["employee_id"]
        )

        return success_response(
            attendance,
            "Check-out successful"
        )

    except Exception as e:
        return error_response(
            str(e),
            400
        )


@jwt_required
@roles_required("Admin", "HR")
def get_all_attendance_controller():
    """
    Get All Attendance Records
    """

    try:

        attendance = get_all_attendance()

        return success_response(attendance)

    except Exception as e:
        return error_response(
            str(e),
            400
        )
        
@jwt_required
@roles_required("Admin", "HR", "Employee")
def get_employee_attendance_controller(employee_id):
    """
    Get Employee Attendance History
    """

    try:

        attendance = get_employee_attendance(employee_id)

        return success_response(attendance)

    except Exception as e:
        return error_response(
            str(e),
            400
        )        

@jwt_required
@roles_required("Admin", "HR")
def get_today_attendance_controller():   
    
    """
    Get Today's Attendance Records
    """

    try:

        attendance = get_today_attendance()

        return success_response(attendance)

    except Exception as e:
        return error_response(
            str(e),
            400
        )     
        