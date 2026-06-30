from flask import Flask
from flask_cors import CORS

from app.routes.department_routes import department_bp
from app.utils.error_handler import register_error_handlers


def create_app():
    app = Flask(__name__)

    CORS(app)

    # Register Blueprint
    app.register_blueprint(department_bp)

    # Register Error Handlers
    register_error_handlers(app)

    return app