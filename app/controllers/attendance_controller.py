from flask import request, g

from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required

from app.services.attendance_service import (
    check_in,
    check_out,
    get_all_attendance,
    get_employee_attendance,
    get_today_attendance
)

from app.utils.response import (
    success_response,
    error_response
)


# ==========================================================
# Check In
# ==========================================================
@jwt_required
@roles_required("Admin", "HR", "Employee")
def check_in_controller():
    """
    Admin/HR:
        POST /attendance/check-in
        {
            "employee_id": 5
        }

    Employee:
        POST /employee/attendance/check-in
        (No body required)
    """

    try:
        data = request.get_json(silent=True) or {}

        if "employee_id" in data:
            employee_id = data["employee_id"]
        else:
            employee_id = g.current_user["employee_id"]

        attendance = check_in(employee_id)

        return success_response(
            attendance,
            "Check-in successful",
            201
        )

    except Exception as e:
        return error_response(str(e), 400)


# ==========================================================
# Check Out
# ==========================================================
@jwt_required
@roles_required("Admin", "HR", "Employee")
def check_out_controller():
    """
    Admin/HR:
        PUT /attendance/check-out
        {
            "employee_id": 5
        }

    Employee:
        POST /employee/attendance/check-out
        (No body required)
    """

    try:
        data = request.get_json(silent=True) or {}

        if "employee_id" in data:
            employee_id = data["employee_id"]
        else:
            employee_id = g.current_user["employee_id"]

        attendance = check_out(employee_id)

        return success_response(
            attendance,
            "Check-out successful"
        )

    except Exception as e:
        return error_response(str(e), 400)


# ==========================================================
# Admin/HR - Get All Attendance
# ==========================================================
@jwt_required
@roles_required("Admin", "HR")
def get_all_attendance_controller():

    try:

        attendance = get_all_attendance()

        return success_response(
            attendance,
            "Attendance fetched successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)


# ==========================================================
# Admin/HR - Particular Employee Attendance
# ==========================================================
@jwt_required
@roles_required("Admin", "HR")
def get_employee_attendance_controller(employee_id):

    try:

        attendance = get_employee_attendance(employee_id)

        return success_response(
            attendance,
            "Attendance fetched successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)


# ==========================================================
# Employee - My Attendance
# ==========================================================
@jwt_required
@roles_required("Employee")
def my_attendance_controller():

    try:

        employee_id = g.current_user["employee_id"]

        attendance = get_employee_attendance(employee_id)

        return success_response(
            attendance,
            "Attendance fetched successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)


# ==========================================================
# Admin/HR - Today's Attendance
# ==========================================================
@jwt_required
@roles_required("Admin", "HR")
def get_today_attendance_controller():

    try:

        attendance = get_today_attendance()

        return success_response(
            attendance,
            "Today's attendance fetched successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)