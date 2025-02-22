from flask import Blueprint, jsonify, request
import pymysql

# Create a blueprint for the admin routes
admin_bp = Blueprint('admin', __name__)

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "As+s01galaxysa",
    "database": "RestaurantAxioraLabs"
}

# Utility function to execute queries
def execute_query(query, args=None, fetch=False):
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute(query, args)
        if fetch:
            result = cursor.fetchall()
            connection.close()
            return result
        connection.commit()
        connection.close()
    except Exception as e:
        return {"error": str(e)}

# Admin routes

@admin_bp.route("/admin/menu-items", methods=["GET"])
def get_menu_items():
    query = "SELECT * FROM menu_items"
    items = execute_query(query, fetch=True)
    return jsonify(items)

@admin_bp.route("/admin/menu-items", methods=["POST"])
def add_menu_item():
    data = request.json
    query = """
        INSERT INTO menu_items (name, description, price, category, is_available, image_url)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    execute_query(query, (data['name'], data['description'], data['price'], data['category'], data['is_available'], data['image_url']))
    return jsonify({"message": "Menu item added successfully!"})

@admin_bp.route("/admin/orders", methods=["GET"])
def get_orders():
    query = "SELECT * FROM orders"
    orders = execute_query(query, fetch=True)
    return jsonify(orders)
