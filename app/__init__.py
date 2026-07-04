from flask import Flask
from flask_cors import CORS

from app.routes.department_routes import department_bp
from app.routes.employee_routes import employee_bp
from app.routes.auth_routes import auth_bp

from app.utils.error_handler import register_error_handlers


def create_app():
    app = Flask(__name__)

    CORS(app)

    # Register Blueprints
    app.register_blueprint(department_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(auth_bp)

    # Register Error Handlers
    register_error_handlers(app)

    return app