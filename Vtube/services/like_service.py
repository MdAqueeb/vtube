from repositories.like_repository import LikeRepository
from repositories.video_repository import VideoRepository

class LikeService:
    @staticmethod
    def react_to_video(user_id, video_id, type_action):
        if type_action not in ['LIKE', 'DISLIKE']:
            return False, "Invalid action type", None
            
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        like_id = LikeRepository.add_or_update_like(user_id, video_id, type_action)
        if like_id:
            return True, "Reaction recorded successfully", {"id": like_id, "user_id": user_id, "video_id": video_id, "type": type_action}
        return False, "Failed to record reaction", None
