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

@menu_bp.route("/popular-dishes", methods=["GET"])
def get_popular_dishes():
    """Fetch popular dishes."""
    connection = None
    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT item_id, name, description, price, image_url
                FROM menu_items
                WHERE is_available = TRUE
                ORDER BY RAND()
                LIMIT 10
            """)
            popular_dishes = cursor.fetchall()

        return jsonify(popular_dishes), 200
    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {e}"}), 500
    finally:
        if connection:
            connection.close()

