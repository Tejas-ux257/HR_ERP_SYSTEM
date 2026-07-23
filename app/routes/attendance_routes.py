from flask import Blueprint

from app.controllers.attendance_controller import (
    check_in_controller,
    check_out_controller,
    get_all_attendance_controller,
    get_employee_attendance_controller,
    get_today_attendance_controller,
    my_attendance_controller,
)

attendance_bp = Blueprint(
    "attendance_bp",
    __name__
)

# ==========================================================
# Admin Check In
# ==========================================================
attendance_bp.route(
    "/attendance/check-in",
    methods=["POST"]
)(check_in_controller)

# ==========================================================
# Employee Check In
# ==========================================================
attendance_bp.route(
    "/employee/attendance/check-in",
    methods=["POST"]
)(check_in_controller)

# ==========================================================
# Admin Check Out
# ==========================================================
attendance_bp.route(
    "/attendance/check-out",
    methods=["PUT"]
)(check_out_controller)

# ==========================================================
# Employee Check Out
# ==========================================================
attendance_bp.route(
    "/employee/attendance/check-out",
    methods=["POST"]
)(check_out_controller)

# ==========================================================
# Admin Attendance List
# ==========================================================
attendance_bp.route(
    "/attendance",
    methods=["GET"]
)(get_all_attendance_controller)

# ==========================================================
# Employee Attendance History
# ==========================================================
attendance_bp.route(
    "/employee/attendance",
    methods=["GET"]
)(my_attendance_controller)

# ==========================================================
# Admin Employee Attendance
# ==========================================================
attendance_bp.route(
    "/attendance/<int:employee_id>",
    methods=["GET"]
)(get_employee_attendance_controller)

# ==========================================================
# Admin Today Attendance
# ==========================================================
attendance_bp.route(
    "/attendance/today",
    methods=["GET"]
)(get_today_attendance_controller)