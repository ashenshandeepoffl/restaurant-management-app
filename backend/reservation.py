from flask import request, jsonify, session
import pymysql
from datetime import datetime

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
# Submit a New Reservation
# -----------------------------
def submit_reservation():
    """Submit a new reservation and save to the database."""
    try:
        # Check if the user is logged in and get customer_id from the session
        if 'user' not in session or 'customer_id' not in session['user']:
            return jsonify({"error": "You must be logged in to make a reservation."}), 401

        customer_id = session['user']['customer_id']

        # Get reservation data from the request
        data = request.json
        date = data.get("date")
        time = data.get("time")
        guests = data.get("guests")

        # Validate inputs
        if not date or not time or not guests:
            return jsonify({"error": "All fields are required (date, time, number of guests)."}), 400

        # Combine date and time into a single datetime object
        reservation_date = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")

        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Insert reservation into the database
        query = """
            INSERT INTO reservations (customer_id, reservation_date, number_of_guests)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (customer_id, reservation_date, guests))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Reservation submitted successfully!"}), 201

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {e}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
