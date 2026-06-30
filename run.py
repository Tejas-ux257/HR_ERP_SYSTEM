from app import create_app
from app.config import Config

app = create_app()

print(app.url_map)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=Config.APP_PORT,
        debug=Config.FLASK_DEBUG
    )