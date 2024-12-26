from flask import Blueprint, jsonify
import pymysql

# Create a Blueprint for menu routes
menu_bp = Blueprint("menu", __name__)

# Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Replace with your database password
    "database": "RestaurantAxioraLabs"
}

# Get all menu items
@menu_bp.route("/menu/items", methods=["GET"])
def get_menu_items():
    """
    Fetch all menu items from the database.
    """
    connection = pymysql.connect(**db_config)
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM menu_items")  # Ensure no condition excludes items
            results = cursor.fetchall()  # Fetch all results as a list of dictionaries
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()