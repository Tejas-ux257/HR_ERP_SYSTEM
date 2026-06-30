from flask import Blueprint

from app.controllers.employee_controller import (
    create_employee_controller,
    get_all_employees_controller,
    get_employee_controller,
    update_employee_controller,
    delete_employee_controller
)

# Employee Blueprint
employee_bp = Blueprint(
    "employee_bp",
    __name__
)

# Create Employee
employee_bp.route(
    "/employees",
    methods=["POST"]
)(create_employee_controller)

# Get All Employees
employee_bp.route(
    "/employees",
    methods=["GET"]
)(get_all_employees_controller)

# Get Employee By ID
employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["GET"]
)(get_employee_controller)

# Update Employee
employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["PUT"]
)(update_employee_controller)

# Delete Employee
employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["DELETE"]
)(delete_employee_controller)