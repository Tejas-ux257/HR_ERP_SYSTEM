from flask import request, g

from app.services.profile_service import ProfileService
from app.validators.profile_validator import (
    validate_profile_update,
    validate_change_password,
)
from app.utils.response import success_response, error_response


class ProfileController:

    @staticmethod
    def get_profile():
        """
        Get logged-in employee profile.
        """
        employee_id = g.current_user["employee_id"]

        profile = ProfileService.get_profile(employee_id)

        if not profile:
            return error_response("Employee not found", 404)

        return success_response(
            "Profile fetched successfully",
            profile
        )

    @staticmethod
    def update_profile():
        """
        Update logged-in employee profile.
        """
        employee_id = g.current_user["employee_id"]

        data = request.get_json()

        validation = validate_profile_update(data)

        if validation:
            return validation

        ProfileService.update_profile(employee_id, data)

        return success_response(
            "Profile updated successfully"
        )

    @staticmethod
    def change_password():
        """
        Change logged-in employee password.
        """
        employee_id = g.current_user["employee_id"]

        data = request.get_json()

        validation = validate_change_password(data)

        if validation:
            return validation

        success, message = ProfileService.change_password(
            employee_id,
            data["current_password"],
            data["new_password"]
        )

        if not success:
            return error_response(message, 400)

        return success_response(message)