from flask import Flask
from flask_cors import CORS
from app.routes.auth_routes import auth_bp

from app.routes.department_routes import department_bp
from app.routes.employee_routes import employee_bp
from app.utils.error_handler import register_error_handlers


def create_app():
    app = Flask(__name__)

    CORS(app)

    # Register Blueprint
    app.register_blueprint(department_bp)

    # Register Error Handlers
    register_error_handlers(app)
    
    # register employee blueprint
    app.register_blueprint(employee_bp)
    
    # register auth blueprint
    
    app.register_blueprint(auth_bp)
    

    return app