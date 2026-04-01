from config.db import get_db_connection
from models.video import Video

class VideoRepository:
    @staticmethod
    def create_video(title, description, video_url, poster_url):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO videos (title, description, video_url, poster_url, is_available) VALUES (%s, %s, %s, %s, TRUE)"
                cursor.execute(sql, (title, description, video_url, poster_url))
                return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_video_by_id(video_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, title, description, video_url, poster_url, is_available, created_at FROM videos WHERE id = %s"
                cursor.execute(sql, (video_id,))
                result = cursor.fetchone()
                if result:
                    return Video(**result)
                return None
        finally:
            connection.close()

    @staticmethod
    def get_all_videos():
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, title, description, video_url, poster_url, is_available, created_at FROM videos"
                cursor.execute(sql)
                results = cursor.fetchall()
                return [Video(**res) for res in results]
        finally:
            connection.close()

    @staticmethod
    def update_video(video_id, title=None, description=None, video_url=None, poster_url=None):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                updates = []
                params = []
                if title is not None:
                    updates.append("title = %s")
                    params.append(title)
                if description is not None:
                    updates.append("description = %s")
                    params.append(description)
                if video_url is not None:
                    updates.append("video_url = %s")
                    params.append(video_url)
                if poster_url is not None:
                    updates.append("poster_url = %s")
                    params.append(poster_url)
                
                if not updates:
                    return False
                    
                sql = f"UPDATE videos SET {', '.join(updates)} WHERE id = %s"
                params.append(video_id)
                cursor.execute(sql, tuple(params))
                return True
        finally:
            connection.close()

    @staticmethod
    def patch_title(video_id, title):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "UPDATE videos SET title = %s WHERE id = %s"
                cursor.execute(sql, (title, video_id))
                return True
        finally:
            connection.close()

    @staticmethod
    def patch_availability(video_id, is_available):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "UPDATE videos SET is_available = %s WHERE id = %s"
                cursor.execute(sql, (is_available, video_id))
                return True
        finally:
            connection.close()

    @staticmethod
    def delete_video(video_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "DELETE FROM videos WHERE id = %s"
                cursor.execute(sql, (video_id,))
                return True
        finally:
            connection.close()
