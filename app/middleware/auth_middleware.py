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

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return error_response(
                "Authorization token is missing",
                401
            )

        if not auth_header.startswith("Bearer "):
            return error_response(
                "Invalid authorization header",
                401
            )

        token = auth_header.split(" ")[1]

        try:
            payload = verify_token(token)
            g.current_user = payload

        except Exception as e:
            return error_response(str(e), 401)

        return func(*args, **kwargs)

    return wrapper