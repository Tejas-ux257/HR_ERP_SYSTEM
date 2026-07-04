from functools import wraps
from flask import g
from app.utils.response import error_response

def roles_required(*allowed_roles):
    """
    Role-Based Access Control Decorator
    """

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            current_user = getattr(g, "current_user", None)

            if current_user is None:
                return error_response(
                    "User authentication required",
                    401
                )

            user_role = current_user.get("role")

            if user_role not in allowed_roles:
                return error_response(
                    "Access denied. Insufficient permissions.",
                    403
                )

            return func(*args, **kwargs)

        return wrapper

    return decorator