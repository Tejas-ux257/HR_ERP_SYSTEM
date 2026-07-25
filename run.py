from app import create_app
from app.config import Config
import traceback

print("Step 1: Import successful")

try:
    app = create_app()
    print("Step 2: App created successfully")

    if __name__ == "__main__":
        print(f"Step 3: Starting Flask on port {Config.APP_PORT}")

        app.run(
            host="0.0.0.0",
            port=Config.APP_PORT,
            debug=True,
            use_reloader=True
        )

except Exception:
    print("An exception occurred:")
    traceback.print_exc()