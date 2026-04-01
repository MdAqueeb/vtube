from config.db import get_db_connection
from models.Likes import Likes

class LikeRepository:
    @staticmethod
    def add_or_update_like(user_id, video_id, type_action):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                # Check if interaction exists
                sql_check = "SELECT id FROM likes WHERE user_id = %s AND video_id = %s"
                cursor.execute(sql_check, (user_id, video_id))
                existing = cursor.fetchone()
                
                if existing:
                    sql = "UPDATE likes SET type = %s WHERE id = %s"
                    cursor.execute(sql, (type_action, existing['id']))
                    return existing['id']
                else:
                    sql = "INSERT INTO likes (user_id, video_id, type) VALUES (%s, %s, %s)"
                    cursor.execute(sql, (user_id, video_id, type_action))
                    return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_likes_by_video(video_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, user_id, video_id, type FROM likes WHERE video_id = %s"
                cursor.execute(sql, (video_id,))
                results = cursor.fetchall()

                mapped = []
                for res in results:
                    mapped.append(
                        Likes(
                            id=res['id'],
                            user_id=res['user_id'],
                            video_id=res['video_id'],
                            type_action=res['type']   # map DB → model
                        )
                    )
                return mapped
        finally:
            connection.close()
