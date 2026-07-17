from flask import request

from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required   
from app.services.employee_service import (
    create_employee,
    get_all_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)

from app.validators.employee_validator import validate_employee

from app.utils.response import (
    success_response,
    error_response
)


@jwt_required
@roles_required("Admin", "HR")
def create_employee_controller():
    """
    Create Employee
    """

    try:

        data = request.get_json()

        error = validate_employee(data)

        if error:
            return error_response(error, 400)

        employee = create_employee(
            data["department_id"],
            data["name"],
            data["phone"],
            data["email"]
        )

        return success_response(
            employee,
            "Employee created successfully",
            201
        )

    except Exception as e:
        return error_response(str(e), 409)


@jwt_required
@roles_required("Admin", "HR")
def get_all_employees_controller():
    """
    Get All Employees
    """

    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    search = request.args.get("search", "")

    employees = get_all_employees(page, limit, search)

    return success_response(employees)


@jwt_required
@roles_required("Admin", "HR", "Employee")
def get_employee_controller(employee_id):
    """
    Get Employee By ID
    """

    employee = get_employee_by_id(employee_id)

    if employee is None:
        return error_response(
            "Employee not found",
            404
        )

    return success_response(employee)


@jwt_required
@roles_required("Admin", "HR")
def update_employee_controller(employee_id):
    """
    Update Employee
    """

    try:

        data = request.get_json()

        error = validate_employee(data)

        if error:
            return error_response(error, 400)

        employee = update_employee(
            employee_id,
            data["department_id"],
            data["name"],
            data["phone"],
            data["email"]
        )

        if employee is None:
            return error_response(
                "Employee not found",
                404
            )

        return success_response(
            employee,
            "Employee updated successfully"
        )

    except Exception as e:
        return error_response(str(e), 409)


@jwt_required
@roles_required("Admin", "HR")
def delete_employee_controller(employee_id):
    """
    Delete Employee
    """

    employee = get_employee_by_id(employee_id)

    if employee is None:
        return error_response(
            "Employee not found",
            404
        )

    result = delete_employee(employee_id)

    return success_response(
        result,
        "Employee deleted successfully"
    )