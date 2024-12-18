from app import app
from flask import jsonify
import pymysql

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "RestaurantAxioraLabs"  # Specify the database name here
}

@app.route('/promotions', methods=['GET'])
def get_promotions():
    try:
        # Connect to the MySQL database
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # Execute the query to fetch promotions data
        cursor.execute("""
            SELECT title, description, discount_percentage, start_date, end_date
            FROM promotions
        """)
        result = cursor.fetchall()
        cursor.close()
        connection.close()

        # Format the results into a list of dictionaries
        promotions = [
            {
                'title': row[0],
                'description': row[1],
                'discount_percentage': float(row[2]),
                'start_date': row[3].strftime('%Y-%m-%d'),
                'end_date': row[4].strftime('%Y-%m-%d')
            }
            for row in result
        ]

        return jsonify(promotions)

    except pymysql.MySQLError as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 500
