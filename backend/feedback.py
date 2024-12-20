from flask import request, jsonify, session
import pymysql

# Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your actual password
    "database": "RestaurantAxioraLabs"
}

def submit_feedback():
    """Submit feedback and save to the database."""
    try:
        # Check if user is logged in
        if 'user' not in session:
            return jsonify({"error": "You must be logged in to submit feedback."}), 401

        # Extract customer ID from session
        customer_email = session['user']['email']
        
        # Connect to the database to get customer_id
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("SELECT customer_id FROM customers WHERE email = %s", (customer_email,))
        customer = cursor.fetchone()

        if not customer:
            return jsonify({"error": "Customer not found."}), 404

        customer_id = customer[0]

        # Get feedback data from the request
        data = request.json
        rating = data.get("rating")
        comment = data.get("comment")

        # Validate inputs
        if not rating or not comment:
            return jsonify({"error": "Rating and comment are required."}), 400

        # Insert feedback into the database
        query = """
            INSERT INTO feedback (customer_id, rating, comment)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (customer_id, rating, comment))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Feedback submitted successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
