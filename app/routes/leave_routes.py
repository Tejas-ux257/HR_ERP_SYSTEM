from flask import Blueprint

from app.controllers.leave_controller import (
    apply_leave_controller,
    employee_apply_leave_controller,
    get_all_leaves_controller,
    get_employee_leaves_controller,
    my_leave_history_controller,
    approve_leave_controller,
    reject_leave_controller,
)

leave_bp = Blueprint(
    "leave_bp",
    __name__
)

# =====================================================
# ADMIN / HR ROUTES
# =====================================================

leave_bp.route(
    "/leave/apply",
    methods=["POST"]
)(apply_leave_controller)

leave_bp.route(
    "/leave",
    methods=["GET"]
)(get_all_leaves_controller)

leave_bp.route(
    "/leave/<int:employee_id>",
    methods=["GET"]
)(get_employee_leaves_controller)

leave_bp.route(
    "/leave/<int:leave_id>/approve",
    methods=["PUT"]
)(approve_leave_controller)

leave_bp.route(
    "/leave/<int:leave_id>/reject",
    methods=["PUT"]
)(reject_leave_controller)


# =====================================================
# EMPLOYEE PORTAL ROUTES
# =====================================================

leave_bp.route(
    "/employee/leave",
    methods=["GET"]
)(my_leave_history_controller)

leave_bp.route(
    "/employee/leave",
    methods=["POST"]
)(employee_apply_leave_controller)