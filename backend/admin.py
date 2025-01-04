from flask import Blueprint, request, jsonify
import pymysql
import os
from werkzeug.utils import secure_filename

admin_bp = Blueprint('admin_bp', __name__)

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "restaurantaxioralabs"
}

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@admin_bp.route("/add_menu", methods=["POST"])
def add_menu():
    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")
    category = request.form.get("category")
    is_available = request.form.get("is_available") == "true"
    image = request.files.get("image")

    if not (name and description and price and category and image):
        return jsonify({"error": "All fields are required!"}), 400

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(image_path)

        try:
            connection = pymysql.connect(**db_config)
            cursor = connection.cursor()
            query = """
                INSERT INTO menu_items (name, description, price, category, is_available, image_url)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (name, description, price, category, is_available, image_path))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "Menu item added successfully!"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid image file!"}), 400

@admin_bp.route("/view_menu", methods=["GET"])
def view_menu():
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)  # Fetch as dictionary
        query = """
            SELECT 
                item_id, name, description, price, category, is_available, image_url 
            FROM menu_items
        """  # Fetch all fields including image_url
        cursor.execute(query)
        menu_items = cursor.fetchall()
        connection.close()
        
        # Return the result as JSON
        return jsonify(menu_items), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@admin_bp.route("/delete_menu/<int:item_id>", methods=["DELETE"])
def delete_menu(item_id):
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        # SQL query to delete the item
        query = "DELETE FROM menu_items WHERE item_id = %s"
        cursor.execute(query, (item_id,))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Menu item deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@admin_bp.route("/edit_menu/<int:id>", methods=["PUT"])
def edit_menu(id):
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    category = data.get("category")
    is_available = data.get("is_available")

    if not (name and description and price and category):
        return jsonify({"error": "All fields are required!"}), 400

    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        query = """
            UPDATE menu_items 
            SET name = %s, description = %s, price = %s, category = %s, is_available = %s 
            WHERE item_id = %s
        """
        cursor.execute(
            query, (name, description, price, category, is_available, id)
        )
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Menu item updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# View all customers
@admin_bp.route("/view_customers", methods=["GET"])
def view_customers():
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM customers")
        customers = cursor.fetchall()
        connection.close()
        return jsonify(customers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Add a customer
@admin_bp.route("/add_customer", methods=["POST"])
def add_customer():
    try:
        data = request.json
        name = data["name"]
        email = data["email"]
        phone = data["phone"]
        password = data["password"]  # Ensure you hash passwords in a real app

        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        query = "INSERT INTO customers (name, email, phone, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, email, phone, password))
        connection.commit()
        connection.close()
        return jsonify({"message": "Customer added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Edit a customer
@admin_bp.route("/edit_customer/<int:customer_id>", methods=["PUT"])
def edit_customer(customer_id):
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")  # Ensure you hash passwords in a real app

        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        query = """
            UPDATE customers 
            SET name = %s, email = %s, phone = %s, password = %s
            WHERE customer_id = %s
        """
        cursor.execute(query, (name, email, phone, password, customer_id))
        connection.commit()
        connection.close()
        return jsonify({"message": "Customer updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Delete a customer
@admin_bp.route("/delete_customer/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        query = "DELETE FROM customers WHERE customer_id = %s"
        cursor.execute(query, (customer_id,))
        connection.commit()
        connection.close()
        return jsonify({"message": "Customer deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Add a staff member
@admin_bp.route("/add_staff", methods=["POST"])
def add_staff():
    try:
        data = request.json
        staff_id = data.get("staff_id")
        name = data.get("name")
        role = data.get("role")
        phone = data.get("phone")
        email = data.get("email")

        # Validate input fields
        if not all([staff_id, name, role, phone, email]):
            return jsonify({"error": "All fields are required!"}), 400

        # Insert staff details into the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        query = """
            INSERT INTO staff (staff_id, name, role, phone, email)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (staff_id, name, role, phone, email))
        connection.commit()
        connection.close()

        return jsonify({"message": "Staff added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route("/edit_staff/<int:staff_id>", methods=["PUT"])
def edit_staff(staff_id):
    try:
        data = request.json
        name = data.get("name")
        role = data.get("role")
        email = data.get("email")

        # Ensure you handle any additional fields as necessary, such as password or other staff details.

        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # SQL query to update the staff member
        query = """
            UPDATE staff
            SET name = %s, role = %s, email = %s
            WHERE staff_id = %s
        """
        cursor.execute(query, (name, role, email, staff_id))
        connection.commit()

        # Close the connection
        connection.close()

        return jsonify({"message": "Staff member updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# View all customers
@admin_bp.route("/view_staff", methods=["GET"])
def view_staff():
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM staff")
        staff = cursor.fetchall()
        connection.close()
        return jsonify(staff), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
