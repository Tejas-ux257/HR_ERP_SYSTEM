from flask import Blueprint

from app.controllers.department_controller import (
    create_department_controller,
    get_all_departments_controller,
    get_department_controller,
    update_department_controller,
    delete_department_controller
)

# Blueprint
department_bp = Blueprint(
    "department_bp",
    __name__
)

# Create Department
department_bp.route(
    "/departments",
    methods=["POST"]
)(create_department_controller)

# Get All Departments
department_bp.route(
    "/departments",
    methods=["GET"]
)(get_all_departments_controller)

# Get Department By ID
department_bp.route(
    "/departments/<int:department_id>",
    methods=["GET"]
)(get_department_controller)

# Update Department
department_bp.route(
    "/departments/<int:department_id>",
    methods=["PUT"]
)(update_department_controller)

# Delete Department
department_bp.route(
    "/departments/<int:department_id>",
    methods=["DELETE"]
)(delete_department_controller)