from flask import request

from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required
from app.services.leave_service import get_employee_leaves

from app.services.leave_service import (
    apply_leave,
    approve_leave,
    reject_leave,
    get_all_leaves,
    get_employee_leaves
)
from app.validators.leave_validator import (
    validate_leave_application
)

from app.utils.response import (
    success_response,
    error_response
)
@jwt_required
@roles_required("Admin", "HR")
def reject_leave_controller(leave_id):
    """
    Reject Leave Request
    """

    try:

        leave = reject_leave(leave_id)

        return success_response(
            leave,
            "Leave rejected successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)

@jwt_required
@roles_required("Admin", "HR", "Employee")
def apply_leave_controller():
    """
    Apply Leave
    """

    try:

        data = request.get_json()

        error = validate_leave_application(data)

        if error:
            return error_response(error, 400)

        leave = apply_leave(
            employee_id=data["employee_id"],
            leave_type=data["leave_type"],
            start_date=data["start_date"],
            end_date=data["end_date"],
            reason=data["reason"]
        )

        return success_response(
            leave,
            "Leave applied successfully",
            201
        )

    except Exception as e:
        return error_response(str(e), 400)


@jwt_required
@roles_required("Admin", "HR")
def get_all_leaves_controller():
    """
    Get All Leave Requests
    """

    try:

        leaves = get_all_leaves()

        return success_response(leaves)

    except Exception as e:
        return error_response(str(e), 400)


@jwt_required
@roles_required("Admin", "HR", "Employee")
def get_employee_leaves_controller(employee_id):
    """
    Get Employee Leave History
    """

    try:

        leaves = get_employee_leaves(employee_id)

        return success_response(leaves)

    except Exception as e:
        return error_response(str(e), 400)
    
@jwt_required
@roles_required("Admin", "HR")
def approve_leave_controller(leave_id):
    """
    Approve Leave Request
    """

    try:

        leave = approve_leave(leave_id)

        return success_response(
            leave,
            "Leave approved successfully"
        )

    except Exception as e:
        return error_response(str(e), 400)    
    
    