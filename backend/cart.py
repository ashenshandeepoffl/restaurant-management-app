from flask import Blueprint, request, jsonify, session
import pymysql

# Define the cart blueprint
cart_bp = Blueprint('cart_bp', __name__)

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "RestaurantAxioraLabs"
}

@cart_bp.route("/save", methods=["POST"])
def save_cart():
    """
    API endpoint to save or update items in the temporary cart table.
    """
    if 'user' not in session or 'customer_id' not in session['user']:
        return jsonify({"error": "User not logged in"}), 401

    user_id = session['user']['customer_id']  # Get customer ID from session
    cart = request.json.get("cart", [])  # Get cart data from request

    if not cart:
        # If the cart is empty, clear the database for the user
        try:
            connection = pymysql.connect(**db_config)
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM temp_cart WHERE user_id = %s", (user_id,))
                connection.commit()
            return jsonify({"message": "Cart cleared successfully!"}), 200
        except Exception as e:
            print("Error clearing cart:", e)
            return jsonify({"error": "A database error occurred."}), 500

    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            # Update or insert items in the cart
            for item in cart:
                if 'id' not in item or 'quantity' not in item or 'price' not in item:
                    return jsonify({"error": f"Invalid item data: {item}"}), 400

                if int(item['quantity']) == 0:
                    # If quantity is 0, remove the item from the cart
                    cursor.execute(
                        """
                        DELETE FROM temp_cart WHERE user_id = %s AND item_id = %s
                        """,
                        (user_id, int(item['id']))
                    )
                else:
                    # Check if the item exists in the cart
                    cursor.execute(
                        """
                        SELECT temp_cart_id FROM temp_cart
                        WHERE user_id = %s AND item_id = %s
                        """,
                        (user_id, int(item['id']))
                    )
                    existing_item = cursor.fetchone()

                    if existing_item:
                        # Update quantity and price if item exists
                        cursor.execute(
                            """
                            UPDATE temp_cart
                            SET quantity = %s, price = %s
                            WHERE temp_cart_id = %s
                            """,
                            (int(item['quantity']), float(item['price']), existing_item[0])
                        )
                    else:
                        # Insert new item into the cart
                        cursor.execute(
                            """
                            INSERT INTO temp_cart (user_id, item_id, quantity, price)
                            VALUES (%s, %s, %s, %s)
                            """,
                            (user_id, int(item['id']), int(item['quantity']), float(item['price']))
                        )

            connection.commit()

        return jsonify({"message": "Cart updated successfully!"}), 200

    except pymysql.MySQLError as db_error:
        print("Database Error:", db_error)
        return jsonify({"error": "A database error occurred. Please try again later."}), 500

    except Exception as e:
        print("Unexpected Error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()


@cart_bp.route("/get", methods=["GET"])
def get_cart():
    """
    API endpoint to fetch the cart items for the logged-in user.
    """
    if 'user' not in session or 'customer_id' not in session['user']:
        return jsonify({"error": "User not logged in"}), 401

    user_id = session['user']['customer_id']  # Get customer ID from session

    try:
        # Connect to the database
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            # Fetch cart items for the user
            cursor.execute(
                """
                SELECT tc.item_id, mi.name, tc.quantity, tc.price, mi.image_url
                FROM temp_cart tc
                JOIN menu_items mi ON tc.item_id = mi.item_id
                WHERE tc.user_id = %s
                """,
                (user_id,)
            )
            cart_items = cursor.fetchall()

            # Transform data into a JSON-friendly format
            cart = [
                {
                    "item_id": item[0],
                    "name": item[1],
                    "quantity": item[2],
                    "price": float(item[3]),
                    "image_url": item[4]
                }
                for item in cart_items
            ]

        return jsonify({"cart": cart}), 200

    except pymysql.MySQLError as db_error:
        print("Database Error:", db_error)  # Debugging
        return jsonify({"error": "A database error occurred. Please try again later."}), 500

    except Exception as e:
        print("Unexpected Error:", e)  # Debugging
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
        
        
@cart_bp.route("/delete/<int:item_id>", methods=["DELETE"])
def delete_cart_item(item_id):
    """
    API endpoint to delete a specific item from the cart.
    """
    if 'user' not in session or 'customer_id' not in session['user']:
        return jsonify({"error": "User not logged in"}), 401

    user_id = session['user']['customer_id']  # Get customer ID from session

    try:
        # Connect to the database
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            # Delete the item for the logged-in user
            cursor.execute(
                "DELETE FROM temp_cart WHERE user_id = %s AND item_id = %s",
                (user_id, item_id)
            )
            connection.commit()

        return jsonify({"message": "Item deleted successfully!"}), 200

    except pymysql.MySQLError as db_error:
        print("Database Error:", db_error)  # Debugging
        return jsonify({"error": "A database error occurred. Please try again later."}), 500

    except Exception as e:
        print("Unexpected Error:", e)  # Debugging
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()
        
@cart_bp.route("/clear", methods=["DELETE"])
def clear_cart():
    """
    API endpoint to clear the cart for the logged-in user.
    """
    if 'user' not in session or 'customer_id' not in session['user']:
        return jsonify({"error": "User not logged in"}), 401

    user_id = session['user']['customer_id']  # Get customer ID from session

    try:
        # Connect to the database
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            # Delete all items from the temp_cart table for this user
            cursor.execute("DELETE FROM temp_cart WHERE user_id = %s", (user_id,))
            connection.commit()

        return jsonify({"message": "Cart cleared successfully!"}), 200

    except pymysql.MySQLError as db_error:
        print("Database Error:", db_error)  # Debugging
        return jsonify({"error": "A database error occurred. Please try again later."}), 500

    except Exception as e:
        print("Unexpected Error:", e)  # Debugging
        return jsonify({"error": str(e)}), 500

    finally:
        connection.close()       
        
