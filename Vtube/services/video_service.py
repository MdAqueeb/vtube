from repositories.video_repository import VideoRepository

class VideoService:
    @staticmethod
    def create_video(title, description, video_url, poster_url):
        """
        Logic for creating a video according to the new schema (no uploaded_by).
        """
        video_id = VideoRepository.create_video(title, description, video_url, poster_url)
        if video_id:
            video = VideoRepository.get_video_by_id(video_id)
            return True, "Video created successfully", video.to_dict()
        return False, "Failed to create video", None

    @staticmethod
    def update_video(video_id, title=None, description=None, video_url=None, poster_url=None):
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        success = VideoRepository.update_video(video_id, title, description, video_url, poster_url)
        if success:
            updated_video = VideoRepository.get_video_by_id(video_id)
            return True, "Video updated successfully", updated_video.to_dict()
        return False, "Failed to update video", None

    @staticmethod
    def patch_title(video_id, title):
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        success = VideoRepository.patch_title(video_id, title)
        if success:
            updated_video = VideoRepository.get_video_by_id(video_id)
            return True, "Video title updated successfully", updated_video.to_dict()
        return False, "Failed to update video title", None

    @staticmethod
    def patch_availability(video_id, is_available):
        video = VideoRepository.get_video_by_id(video_id)
        if not video:
            return False, "Video not found", None
            
        success = VideoRepository.patch_availability(video_id, is_available)
        if success:
            updated_video = VideoRepository.get_video_by_id(video_id)
            return True, "Video availability updated successfully", updated_video.to_dict()
        return False, "Failed to update video availability", None

    @staticmethod
    def get_all_videos():
        videos = VideoRepository.get_all_videos()
        return True, "Videos fetched successfully", [video.to_dict() for video in videos]

    @staticmethod
    def get_video_by_id(video_id):
        video = VideoRepository.get_video_by_id(video_id)
        if video:
            return True, "Video fetched successfully", video.to_dict()
        return False, "Video not found", None
