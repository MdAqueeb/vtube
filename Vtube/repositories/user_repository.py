from config.db import get_db_connection
from models.user import User

class UserRepository:
    @staticmethod
    def create_user(name, email, password, role="user"):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (name, email, password, role))
                user_id = cursor.lastrowid
                return user_id
        finally:
            connection.close()

    @staticmethod
    def get_user_by_email(email):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, name, email, password, role, created_at FROM users WHERE email = %s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                if result:
                    return User(**result)
                return None
        finally:
            connection.close()

    @staticmethod
    def get_user_by_id(user_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, name, email, password, role, created_at FROM users WHERE id = %s"
                cursor.execute(sql, (user_id,))
                result = cursor.fetchone()
                if result:
                    return User(**result)
                return None
        finally:
            connection.close()
            
    @staticmethod
    def update_user(user_id, name):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "UPDATE users SET name = %s WHERE id = %s"
                cursor.execute(sql, (name, user_id))
                return True
        finally:
            connection.close()

    @staticmethod
    def update_password(user_id, hashed_password):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "UPDATE users SET password = %s WHERE id = %s"
                cursor.execute(sql, (hashed_password, user_id))
                return True
        finally:
            connection.close()
