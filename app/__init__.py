from flask import Flask
from flask_cors import CORS

from app.routes.department_routes import department_bp
from app.routes.employee_routes import employee_bp
from app.routes.auth_routes import auth_bp
from app.routes.attendance_routes import attendance_bp

from app.utils.error_handler import register_error_handlers

from app.routes.leave_routes import leave_bp
from app.routes.payroll_routes import payroll_bp
from app.routes.dashboard_routes import dashboard_bp
from app.routes.profile_routes import profile_bp



def create_app():
    app = Flask(__name__)

    CORS(app)

    # Register Blueprints
    app.register_blueprint(department_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(attendance_bp)
    # Register Error Handlers
    register_error_handlers(app)
    app.register_blueprint(leave_bp)
    app.register_blueprint(payroll_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(profile_bp)
    

    return app