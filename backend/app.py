from flask import Flask
from admin import admin_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Register the admin blueprint
app.register_blueprint(admin_bp)

@app.route("/")
def home():
    return "Welcome to Restaurant Axiora Labs!"

if __name__ == "__main__":
    app.run(debug=True)
