import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


class Config:
    """
    Application Configuration
    """

    # --------------------------
    # Database Configuration
    # --------------------------
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = int(os.getenv("DB_PORT", 3306))
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    # --------------------------
    # Flask Configuration
    # --------------------------
    APP_PORT = int(os.getenv("APP_PORT", 8080))

    FLASK_ENV = os.getenv("FLASK_ENV", "development")

    FLASK_DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"