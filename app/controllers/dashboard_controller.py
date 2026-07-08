from app.middleware.auth_middleware import jwt_required
from app.middleware.role_middleware import roles_required

from app.services.dashboard_service import (
    get_dashboard_summary
)

from app.utils.response import (
    success_response,
    error_response
)


@jwt_required
@roles_required("Admin", "HR")
def get_dashboard_summary_controller():
    """
    Get Dashboard Summary
    """

    try:

        summary = get_dashboard_summary()

        return success_response(summary)

    except Exception as e:
        return error_response(str(e), 400)