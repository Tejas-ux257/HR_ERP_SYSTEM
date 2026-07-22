from flask import Blueprint

from app.controllers.profile_controller import ProfileController
from app.middleware.auth_middleware import jwt_required

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/profile", methods=["GET"])
@jwt_required
def get_profile():
    return ProfileController.get_profile()


@profile_bp.route("/profile", methods=["PUT"])
@jwt_required
def update_profile():
    return ProfileController.update_profile()


@profile_bp.route("/profile/password", methods=["PUT"])
@jwt_required
def change_password():
    return ProfileController.change_password()