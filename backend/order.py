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
    # Check if the user is logged in
    if 'user' not in session:
        return jsonify({"error": "User not logged in"}), 401

    # Get customer ID from session and cart from the request body
    customer_id = session['user']['customer_id']
    cart = request.json.get("cart", [])

    # Validate that the cart is not empty
    if not cart:
        return jsonify({"error": "Cart is empty"}), 400

    try:
        # Connect to the database
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            # Debugging: Log received cart
            print("Received Cart Data:", cart)

            # Validate that all items in the cart have required keys
            for item in cart:
                if 'id' not in item or 'price' not in item or 'quantity' not in item:
                    print("Invalid item in cart:", item)
                    return jsonify({"error": f"Invalid item data: {item}"}), 400

            # Calculate total amount
            total_amount = sum(float(item['price']) * int(item['quantity']) for item in cart)
            print("Total Amount Calculated:", total_amount)

            # Insert the order into the `orders` table
            cursor.execute(
                "INSERT INTO orders (customer_id, total_amount) VALUES (%s, %s)",
                (customer_id, total_amount)
            )
            order_id = cursor.lastrowid  # Get the generated order ID
            print("Order ID Created:", order_id)

            # Insert each item into the `order_items` table
            for item in cart:
                cursor.execute(
                    """
                    INSERT INTO order_items (order_id, item_id, quantity, price)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (order_id, int(item['id']), int(item['quantity']), float(item['price']))
                )
                print(f"Inserted item {item['id']} into order_items table.")

            # Commit the transaction
            connection.commit()

        return jsonify({"message": "Order placed successfully!", "order_id": order_id}), 200

    except pymysql.MySQLError as db_error:
        print("Database Error:", db_error)
        return jsonify({"error": "A database error occurred. Please try again later."}), 500

    except Exception as e:
        print("Error placing order:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        # Close the database connection
        connection.close()
