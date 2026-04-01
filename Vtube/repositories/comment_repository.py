from config.db import get_db_connection
from models.comment import Comment

class CommentRepository:
    @staticmethod
    def create_comment(user_id, video_id, content):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO comments (user_id, video_id, content) VALUES (%s, %s, %s)"
                cursor.execute(sql, (user_id, video_id, content))
                return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_comments_by_video(video_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, user_id, video_id, content, created_at FROM comments WHERE video_id = %s ORDER BY created_at DESC"
                cursor.execute(sql, (video_id,))
                results = cursor.fetchall()
                return [Comment(**res) for res in results]
        finally:
            connection.close()
