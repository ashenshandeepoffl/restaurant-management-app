from flask import request, jsonify, session
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash

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
# Register a New User
# -----------------------------
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

        # Check if email already exists
        check_query = "SELECT email FROM customers WHERE email = %s"
        cursor.execute(check_query, (email,))
        if cursor.fetchone():
            cursor.close()
            connection.close()
            return jsonify({"error": "Email already exists"}), 400

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

# -----------------------------
# Login a User
# -----------------------------
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
        query = "SELECT customer_id, email, password, name FROM customers WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if result:
            customer_id, stored_email, stored_password, stored_name = result
            if check_password_hash(stored_password, password):
                # Set user email, customer_id, and name in the session
                session['user'] = {
                    'email': stored_email,
                    'customer_id': customer_id,  # Ensure customer_id is set in the session
                    'name': stored_name
                }
                return jsonify({"message": "Login successful!"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------------------
# Logout a User
# -----------------------------
def logout_user():
    """Log out the current user."""
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

# -----------------------------
# Check User Session
# -----------------------------
def check_user_session():
    """Check if a user is logged in."""
    if 'user' in session:
        return jsonify({"user": session['user']}), 200
    return jsonify({"error": "Not logged in"}), 401
