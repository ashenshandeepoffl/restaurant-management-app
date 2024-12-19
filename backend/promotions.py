

import pymysql

# Database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "RestaurantAxioraLabs",
    "cursorclass": pymysql.cursors.DictCursor
}

def get_promotions():
    """Fetch promotions from the database."""
    try:
        connection = pymysql.connect(**db_config)
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM promotions")
            promotions = cursor.fetchall()
        return promotions
    except Exception as e:
        return {"error": str(e)}
    finally:
        connection.close()


