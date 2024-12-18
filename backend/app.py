from flask import Flask
import pymysql

app = Flask(__name__)

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root" # Type your database password here   
}

def initialize_database():
    try:
        # Connect to MySQL server (not specific database yet)
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

if __name__ == "__main__":
    app.run(debug=True)
