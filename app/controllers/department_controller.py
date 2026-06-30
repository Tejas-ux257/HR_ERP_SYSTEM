from flask import request

from app.services.department_service import (
    create_department,
    get_all_departments,
    get_department_by_id,
    update_department,
    delete_department
)

from app.validators.department_validator import validate_department

from app.utils.response import (
    success_response,
    error_response
)


def create_department_controller():
    """
    Create Department
    """

    try:

        data = request.get_json()

        error = validate_department(data)

        if error:
            return error_response(error, 400)

        department = create_department(
            data["department_name"],
            data["department_code"]
        )

        return success_response(
            department,
            "Department created successfully",
            201
        )

    except Exception as e:
        return error_response(str(e), 409)


def get_all_departments_controller():
    """
    Get All Departments
    """

    departments = get_all_departments()

    return success_response(departments)


def get_department_controller(department_id):
    """
    Get Department By ID
    """

    department = get_department_by_id(department_id)

    if not department:
        return error_response(
            "Department not found",
            404
        )

    return success_response(department)


def update_department_controller(department_id):
    """
    Update Department
    """

    try:

        data = request.get_json()

        error = validate_department(data)

        if error:
            return error_response(error, 400)

        department = update_department(
            department_id,
            data["department_name"],
            data["department_code"]
        )

        return success_response(
            department,
            "Department updated successfully"
        )

    except Exception as e:
        return error_response(str(e), 409)


def delete_department_controller(department_id):
    """
    Delete Department
    """

    result = delete_department(department_id)

    return success_response(
        result,
        "Department deleted successfully"
    )