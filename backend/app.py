from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Type your database password here
    "database": "restaurantaxioralabs"
}

# Database initialization
def initialize_database():
    try:
        # Connect to MySQL server
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Read and execute SQL script
        with open('database.sql', 'r') as sql_file:
            sql_script = sql_file.read()
            for statement in sql_script.split(';'):
                if statement.strip():
                    cursor.execute(statement)

        connection.commit()
        cursor.close()
        connection.close()
        print("Database initialized successfully.")

    except Exception as e:
        print(f"Error initializing database: {e}")

# Initialize the database when the app starts
initialize_database()

@app.route("/")
def home():
    return "Welcome to Restaurant Axiora Labs!"

@app.route("/add_menu", methods=["POST"])
def add_menu():
    # Retrieve data from request
    data = request.json
    item_id = data.get("item_id")
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    category = data.get("category")
    is_available = data.get("is_available", True)  # Default to True if not provided
    image_url = data.get("image_url")

    # Validate input data
    if not (item_id and name and description and price and category and image_url):
        return jsonify({"error": "All fields are required!"}), 400

    try:
        # Connect to the database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Insert data into the menu table
        query = """
            INSERT INTO menu_items (item_id, name, description, price, category, is_available, image_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (item_id, name, description, price, category, is_available, image_url))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Menu item added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
