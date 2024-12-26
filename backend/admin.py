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
        cursor = connection.cursor(pymysql.cursors.DictCursor)  # Using DictCursor to fetch as dictionary
        query = "SELECT * FROM menu_items WHERE is_available = 1"  # Filter for available items
        cursor.execute(query)
        menu_items = cursor.fetchall()
        connection.close()
        
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
