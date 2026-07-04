import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = int(os.getenv("DB_PORT", 3306))
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    APP_PORT = int(os.getenv("APP_PORT", 8080))
    DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "HrErpJwtSecretKey@2026"
    )

    JWT_ALGORITHM = os.getenv(
        "JWT_ALGORITHM",
        "HS256"
    )

    JWT_EXPIRE_MINUTES = int(
        os.getenv(
            "JWT_EXPIRE_MINUTES",
            60
        )
    )

    # Email Configuration
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER",
        MAIL_USERNAME
    )

    FRONTEND_RESET_URL = os.getenv(
        "FRONTEND_RESET_URL",
        "http://localhost:3000/reset-password"
    )

    RESET_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("RESET_TOKEN_EXPIRE_MINUTES", 30)
    )