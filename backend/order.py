from flask import Blueprint, request, jsonify, session
import pymysql

# Define the order blueprint
order_bp = Blueprint('order_bp', __name__)

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "RestaurantAxioraLabs"
}

@order_bp.route("/place", methods=["POST"])
def place_order():
    """
    API endpoint to place an order.
    """
    if 'user' not in session:
        return jsonify({"error": "User not logged in"}), 401

    customer_id = session['user']['customer_id']
    cart = request.json.get("cart", [])

    if not cart:
        return jsonify({"error": "Cart is empty"}), 400

    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            total_amount = sum(float(item['price']) * int(item['quantity']) for item in cart)

            cursor.execute(
                "INSERT INTO orders (customer_id, total_amount) VALUES (%s, %s)",
                (customer_id, total_amount)
            )
            order_id = cursor.lastrowid

            for item in cart:
                cursor.execute(
                    """
                    INSERT INTO order_items (order_id, item_id, quantity, price)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (order_id, int(item['id']), int(item['quantity']), float(item['price']))
                )
            connection.commit()

        return jsonify({"message": "Order placed successfully!", "order_id": order_id}), 200

    except pymysql.MySQLError as db_error:
        return jsonify({"error": "Database error"}), 500
    finally:
        connection.close()

@order_bp.route("/<int:order_id>", methods=["GET"])
def get_order(order_id):
    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM orders WHERE order_id = %s", (order_id,))
            order = cursor.fetchone()

            if not order:
                return jsonify({"error": "Order not found"}), 404

            cursor.execute("""
                SELECT oi.item_id, oi.quantity, oi.price, mi.name
                FROM order_items oi
                JOIN menu_items mi ON oi.item_id = mi.item_id
                WHERE oi.order_id = %s
            """, (order_id,))
            items = cursor.fetchall()

        return jsonify({"order_id": order_id, "total_amount": order["total_amount"], "items": items}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

