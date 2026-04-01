from repositories.comment_repository import CommentRepository
from repositories.video_repository import VideoRepository

class CommentService:
    @staticmethod
    def add_comment(user_id, video_id, content):
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        comment_id = CommentRepository.create_comment(user_id, video_id, content)
        if comment_id:
            return True, "Comment created successfully", {"id": comment_id, "user_id": user_id, "video_id": video_id, "content": content}
        return False, "Failed to add comment", None

    @staticmethod
    def get_comments_for_video(video_id):
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        comments = CommentRepository.get_comments_by_video(video_id)
        return True, "Comments fetched successfully", [comment.to_dict() for comment in comments]
