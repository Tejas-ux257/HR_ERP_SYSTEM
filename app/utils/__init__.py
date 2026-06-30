from flask import Flask
from flask_cors import CORS

from app.utils.error_handler import register_error_handlers


def create_app():
    """
    Application Factory
    Creates and configures the Flask application.
    """

    app = Flask(__name__)

    # Enable Cross-Origin Resource Sharing
    CORS(app)

    # Register Blueprints
    # app.register_blueprint(department_bp)
    # app.register_blueprint(employee_bp)

    # Register Global Error Handlers
    register_error_handlers(app)

    return app