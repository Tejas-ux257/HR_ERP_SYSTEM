import uuid

import jwt

from datetime import datetime, timedelta

from app.config import Config


def generate_token(user):
    """
    Generate JWT Token
    """

    expires_at = datetime.utcnow() + timedelta(
        minutes=Config.JWT_EXPIRE_MINUTES
    )

    payload = {
        "user_id": user["id"],
        "employee_id": user["employee_id"],
        "username": user["username"],
        "role": user["role"],
        "jti": str(uuid.uuid4()),
        "exp": expires_at
    }

    token = jwt.encode(
        payload,
        Config.JWT_SECRET_KEY,
        algorithm=Config.JWT_ALGORITHM
    )

    return token


def verify_token(token):
    """
    Verify JWT Token
    """

    try:

        payload = jwt.decode(
            token,
            Config.JWT_SECRET_KEY,
            algorithms=[Config.JWT_ALGORITHM]
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")

    except jwt.InvalidTokenError:
        raise Exception("Invalid token")