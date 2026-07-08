from flask import Blueprint

from app.controllers.dashboard_controller import (
    get_dashboard_summary_controller
)

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)

dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)(get_dashboard_summary_controller)