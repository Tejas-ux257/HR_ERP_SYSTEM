from flask import Blueprint

from app.controllers.payroll_controller import (
    generate_payroll_controller,
    get_all_payroll_controller,
    get_employee_payroll_controller,
    update_payroll_controller
)

payroll_bp = Blueprint(
    "payroll_bp",
    __name__
)

payroll_bp.route(
    "/payroll",
    methods=["POST"]
)(generate_payroll_controller)

payroll_bp.route(
    "/payroll",
    methods=["GET"]
)(get_all_payroll_controller)

payroll_bp.route(
    "/payroll/<int:employee_id>",
    methods=["GET"]
)(get_employee_payroll_controller)

payroll_bp.route(
    "/payroll/<int:payroll_id>",
    methods=["PUT"]
)(update_payroll_controller)