from flask import Flask, jsonify, session, request
from flask_cors import CORS
from flask_session import Session
from promotions import get_promotions
from user import register_user, login_user
from feedback import submit_feedback  # Import submit_feedback from feedback.py
from reservation import submit_reservation  # Import submit_reservation from reservation.py
from menu import get_menu_items  # Import get_menu_items from menu.py
import pymysql

app = Flask(__name__)

# -----------------------------
# Session Configuration
# -----------------------------
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a secure random key
app.config['SESSION_TYPE'] = 'filesystem'     # Store session data in the filesystem
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax' # 'Lax' for development, 'None' for HTTPS
app.config['SESSION_COOKIE_SECURE'] = False   # Set to True if using HTTPS
Session(app)

# -----------------------------
# CORS Configuration
# -----------------------------
CORS(app, supports_credentials=True)  # Allow cookies and credentials in cross-origin requests

# -----------------------------
# Database Connection Configuration
# -----------------------------
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your actual password
    "database": "RestaurantAxioraLabs"
}

# -----------------------------
# Initialize the Database
# -----------------------------
def initialize_database():
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        with open('database.sql', 'r') as sql_file:
            sql_script = sql_file.read()
            for statement in sql_script.split(';'):
                if statement.strip():
                    cursor.execute(statement)
        connection.commit()
        cursor.close()
        connection.close()
        print("Database initialized successfully.")
    except pymysql.MySQLError as e:
        print(f"Error initializing database: {e}")
    except FileNotFoundError:
        print("Error: database.sql file not found.")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Initialize the database when the app starts
initialize_database()

# -----------------------------
# Routes
# -----------------------------

# Fetch promotions
@app.route("/promotions", methods=["GET"])
def fetch_promotions():
    """Endpoint to fetch promotions."""
    try:
        promotions = get_promotions()
        return jsonify(promotions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Register a new user
@app.route("/register", methods=["POST"])
def register():
    """Endpoint to register a new user."""
    try:
        return register_user()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Log in a user
@app.route("/login", methods=["POST"])
def login():
    """Endpoint to log in a user."""
    try:
        return login_user()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Check user session
@app.route("/api/session", methods=["GET"])
def check_session():
    """Endpoint to check if a user is logged in."""
    if 'user' in session:
        return jsonify({"user": session['user']}), 200
    return jsonify({"error": "Not logged in"}), 401

# Log out a user
@app.route("/api/logout", methods=["POST"])
def logout():
    """Endpoint to log out a user."""
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

# Submit feedback
@app.route("/feedback", methods=["POST"])
def feedback():
    """Endpoint to submit feedback."""
    return submit_feedback()

# Submit reservation
@app.route("/api/reserve", methods=["POST"])
def reserve():
    """Endpoint to submit a reservation."""
    return submit_reservation()

# Fetch menu items
@app.route("/menu/items", methods=["GET"])
def menu_items():
    """Endpoint to fetch all available menu items grouped by category."""
    try:
        return get_menu_items()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Home route
@app.route("/")
def home():
    """Home endpoint."""
    return "Welcome to Restaurant Axiora Labs!"

# -----------------------------
# Run the App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
