from flask_cors import CORS
from app import create_app
from app.config import Config

app = create_app()
CORS(app)  # Enables CORS for all routes and origins by default

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=Config.APP_PORT,
        debug=Config.DEBUG
    )