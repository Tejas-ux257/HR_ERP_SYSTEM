from flask import Blueprint

from app.controllers.attendance_controller import (
    check_in_controller,
    check_out_controller,
    get_all_attendance_controller,
    get_employee_attendance_controller,
    get_today_attendance_controller,
    my_attendance_controller
)

attendance_bp = Blueprint(
    "attendance_bp",
    __name__
)


# ==========================================================
# Check In
# ==========================================================
attendance_bp.route(
    "/attendance/check-in",
    methods=["POST"]
)(check_in_controller)


# ==========================================================
# Check Out
# ==========================================================
attendance_bp.route(
    "/attendance/check-out",
    methods=["PUT"]
)(check_out_controller)


# ==========================================================
# Get All Attendance (Admin/HR)
# ==========================================================
attendance_bp.route(
    "/attendance",
    methods=["GET"]
)(get_all_attendance_controller)


# ==========================================================
# Get Particular Employee Attendance (Admin/HR)
# ==========================================================
attendance_bp.route(
    "/attendance/<int:employee_id>",
    methods=["GET"]
)(get_employee_attendance_controller)


# ==========================================================
# Get Logged-in Employee Attendance
# ==========================================================
attendance_bp.route(
    "/employee/attendance",
    methods=["GET"]
)(my_attendance_controller)


# ==========================================================
# Get Today's Attendance (Admin/HR)
# ==========================================================
attendance_bp.route(
    "/attendance/today",
    methods=["GET"]
)(get_today_attendance_controller)