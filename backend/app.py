from flask import Flask
import pymysql

app = Flask(__name__)

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "RestaurantAxioraLabs"
}

def initialize_database():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    with open('init_db.sql', 'r') as sql_file:
        sql_script = sql_file.read()
    cursor.execute(sql_script)
    connection.commit()
    cursor.close()
    connection.close()
    print("Database initialized successfully.")

# Initialize the database when the app starts
initialize_database()

if __name__ == "__main__":
    app.run(debug=True)
