from flask import request, g
from mysql.connector import IntegrityError
from app.services.profile_service import ProfileService
from app.validators.profile_validator import (
    validate_profile_update,
    validate_change_password,
)
from app.utils.response import success_response, error_response

class ProfileController:

    @staticmethod
    def get_profile():
        """Get logged-in employee profile."""
        try:
            employee_id = g.current_user["employee_id"]
            profile = ProfileService.get_profile(employee_id)

            if not profile:
                return error_response("Employee not found", 404)

            return success_response(
                "Profile fetched successfully",
                profile
            )
        except Exception as e:
            return error_response(str(e), 500)

    @staticmethod
    def update_profile():
        """Update logged-in employee profile."""
        try:
            employee_id = g.current_user["employee_id"]
            data = request.get_json()

            validation = validate_profile_update(data)
            if validation:
                return validation

            updated_profile = ProfileService.update_profile(employee_id, data)

            return success_response(
                "Profile updated successfully",
                updated_profile
            )
        except ValueError as e:
            return error_response(str(e), 400)
        except IntegrityError as e:
            if "email" in str(e).lower():
                return error_response("Email address is already registered.", 400)
            return error_response("Database constraint error.", 400)
        except Exception as e:
            return error_response("An unexpected error occurred while updating profile.", 500)

    @staticmethod
    def change_password():
        """Change logged-in employee password."""
        try:
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
        except Exception as e:
            return error_response(str(e), 500)