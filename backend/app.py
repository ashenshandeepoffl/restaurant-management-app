from flask import Flask
from admin import admin_bp

app = Flask(__name__)

# Register the admin blueprint
app.register_blueprint(admin_bp)

if __name__ == "__main__":
    app.run(debug=True)
