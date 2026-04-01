# from config.db import get_db_connection
# from models.reaction import Reaction

# class ReactionRepository:
#     @staticmethod
#     def add_or_update_reaction(user_id, video_id, reaction_type):
#         connection = get_db_connection()
#         try:
#             with connection.cursor() as cursor:
#                 # Check if interaction exists
#                 sql_check = "SELECT id FROM reactions WHERE user_id = %s AND video_id = %s"
#                 cursor.execute(sql_check, (user_id, video_id))
#                 existing = cursor.fetchone()
                
#                 if existing:
#                     sql = "UPDATE reactions SET type = %s WHERE id = %s"
#                     cursor.execute(sql, (reaction_type, existing['id']))
#                     return existing['id']
#                 else:
#                     sql = "INSERT INTO reactions (user_id, video_id, type) VALUES (%s, %s, %s)"
#                     cursor.execute(sql, (user_id, video_id, reaction_type))
#                     return cursor.lastrowid
#         finally:
#             connection.close()

#     @staticmethod
#     def get_reactions_by_video(video_id):
#         connection = get_db_connection()
#         try:
#             with connection.cursor() as cursor:
#                 sql = "SELECT id, user_id, video_id, type AS reaction_type FROM reactions WHERE video_id = %s"
#                 cursor.execute(sql, (video_id,))
#                 results = cursor.fetchall()
#                 return [Reaction(**res) for res in results]
#         finally:
#             connection.close()

#     @staticmethod
#     def delete_reaction(user_id, video_id):
#         connection = get_db_connection()
#         try:
#             with connection.cursor() as cursor:
#                 sql = "DELETE FROM reactions WHERE user_id = %s AND video_id = %s"
#                 cursor.execute(sql, (user_id, video_id))
#                 return True
#         finally:
#             connection.close()
