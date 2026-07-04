from functools import wraps

from flask import request, g

from app.utils.jwt_helper import verify_token
from app.utils.response import error_response


def jwt_required(func):
    """
    Decorator to protect routes using JWT authentication.
    """

    @wraps(func)
    def wrapper(*args, **kwargs):

        # Get Authorization header
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return error_response(
                "Authorization token is missing",
                401
            )

        # Check header format
        if not auth_header.startswith("Bearer "):
            return error_response(
                "Invalid authorization header",
                401
            )

        # Extract JWT token
        token = auth_header.split(" ")[1]

        try:
            # Verify JWT
            payload = verify_token(token)

            # Store logged-in user
            g.current_user = payload

        except Exception as e:
            return error_response(
                str(e),
                401
            )

        return func(*args, **kwargs)

    return wrapper