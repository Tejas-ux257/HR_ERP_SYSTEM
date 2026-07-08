from flask import request

from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required

from app.services.payroll_service import (
    generate_payroll,
    get_all_payroll,
    get_employee_payroll,
    update_payroll
)

from app.validators.payroll_validator import (
    validate_payroll
)

from app.utils.response import (
    success_response,
    error_response
)

@jwt_required
@roles_required("Admin", "HR")
def generate_payroll_controller():
    """
    Generate Payroll
    """

    try:

        data = request.get_json()

        error = validate_payroll(data)

        if error:
            return error_response(error, 400)

        payroll = generate_payroll(
            employee_id=data["employee_id"],
            month=data["month"],
            year=data["year"],
            basic_salary=data["basic_salary"],
            allowances=data.get("allowances", 0),
            deductions=data.get("deductions", 0)
        )

        return success_response(
            payroll,
            "Payroll generated successfully",
            201
        )

    except Exception as e:
        return error_response(str(e), 400)
    
@jwt_required
@roles_required("Admin", "HR")
def get_all_payroll_controller():
    """
    Get All Payroll Records
    """

    try:

        payroll = get_all_payroll()

        return success_response(payroll)

    except Exception as e:
        return error_response(str(e), 400)


@jwt_required
@roles_required("Admin", "HR", "Employee")
def get_employee_payroll_controller(employee_id):
    """
    Get Employee Payroll
    """

    try:

        payroll = get_employee_payroll(employee_id)

        return success_response(payroll)

    except Exception as e:
        return error_response(str(e), 400)
    
@jwt_required
@roles_required("Admin", "HR")
def update_payroll_controller(payroll_id):
    """
    Update Payroll
    """

    try:

        data = request.get_json()

        error = validate_payroll(data)

        if error:
            return error_response(error, 400)

        payroll = update_payroll(
            payroll_id=payroll_id,
            basic_salary=data["basic_salary"],
            allowances=data.get("allowances", 0),
            deductions=data.get("deductions", 0)
        )

        return success_response(
            payroll,
            "Payroll updated successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)            