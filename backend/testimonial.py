from flask import Blueprint, jsonify
import pymysql

# Create the Blueprint for testimonials
testimonial_bp = Blueprint("testimonial", __name__)

# Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your database password
    "database": "RestaurantAxioraLabs"
}

@testimonial_bp.route("/testimonials", methods=["GET"])
def get_testimonials():
    """
    Fetch testimonials from the database.
    """
    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            query = """
                SELECT f.feedback_id, c.name AS customer_name, f.rating, f.comment
                FROM feedback f
                INNER JOIN customers c ON f.customer_id = c.customer_id
                ORDER BY f.feedback_date DESC
            """
            cursor.execute(query)
            testimonials = cursor.fetchall()
        return jsonify(testimonials), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()
