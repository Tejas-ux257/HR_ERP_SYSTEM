from flask import Blueprint

from app.controllers.auth_controller import (
    register_controller,
    login_controller
)

# Authentication Blueprint
auth_bp = Blueprint(
    "auth_bp",
    __name__
)

# Register User
auth_bp.route(
    "/register",
    methods=["POST"]
)(register_controller)

# Login User
auth_bp.route(
    "/login",
    methods=["POST"]
)(login_controller)