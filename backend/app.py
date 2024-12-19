from flask import Flask, jsonify
from flask_cors import CORS
from promotions import get_promotions
from user import register_user, login_user  # Import both register and login functions
import pymysql

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your actual password
    "database": "RestaurantAxioraLabs"  # Specify the target database
}

def initialize_database():
    try:
        # Connect to MySQL server (with specific database)
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Read and execute SQL script
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

@app.route("/promotions", methods=["GET"])
def fetch_promotions():
    """Endpoint to get promotions."""
    promotions = get_promotions()
    return jsonify(promotions)

@app.route("/register", methods=["POST"])
def register():
    """Endpoint to register a new user."""
    return register_user()

@app.route("/login", methods=["POST"])
def login():
    """Endpoint to log in a user."""
    return login_user()

@app.route("/")
def home():
    return "Welcome to Restaurant Axiora Labs!"

if __name__ == "__main__":
    app.run(debug=True)
