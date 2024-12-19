from flask import request, jsonify
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your actual password
    "database": "RestaurantAxioraLabs"
}

def register_user():
    """Register a new user and save to the database."""
    try:
        # Get user data from the request
        data = request.json
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")

        # Validate inputs
        if not name or not email or not phone or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Hash the password before storing it
        hashed_password = generate_password_hash(password)

        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Insert user into the database
        query = """
            INSERT INTO customers (name, email, phone, password)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (name, email, phone, hashed_password))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "User registered successfully!"}), 201

    except pymysql.IntegrityError:
        return jsonify({"error": "Email already exists"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def login_user():
    """Authenticate a user and check credentials."""
    try:
        # Get user data from the request
        data = request.json
        email = data.get("email")
        password = data.get("password")

        # Validate inputs
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Fetch user by email
        query = "SELECT email, password FROM customers WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if result:
            stored_email, stored_password = result
            if check_password_hash(stored_password, password):
                return jsonify({"message": "Login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
