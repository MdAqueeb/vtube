from flask import Blueprint, request, g
from services.video_service import VideoService
from utils.response import success_response, error_response
from utils.auth import login_required, admin_required

video_bp = Blueprint('video_bp', __name__)

@video_bp.route('/', methods=['POST'])
@admin_required
def create_video():
    """
    POST /videos
    Admin only: Upload a new video URL.
    """
    data = request.json
    required_fields = ['title', 'description', 'video_url', 'poster_url']
    if not data or not all(field in data for field in required_fields):
        return error_response("Missing required fields", 409)

    # Correct logic for new schema: uploaded_by is NOT used in videos table.
    # However, for consistency with project, we call the service.
    success, message, result = VideoService.create_video(
        data['title'], data['description'], data['video_url'], data['poster_url']
    )
    if success:
        return success_response(result, message, 201)
    return error_response(message, 409)

@video_bp.route('/<int:id>', methods=['PUT'])
@admin_required
def update_video(id):
    """
    PUT /videos/<id>
    Admin only: Update video details.
    """
    data = request.json
    success, message, result = VideoService.update_video(
        id, data.get('title'), data.get('description'), data.get('video_url'), data.get('poster_url')
    )
    if success:
        return success_response(result, message, 200)
    return error_response(message, 409)

@video_bp.route('/<int:id>/title', methods=['PATCH'])
@admin_required
def update_video_title(id):
    """
    PATCH /videos/<id>/title
    Admin only: Partial update of video title.
    """
    data = request.json
    if not data or 'title' not in data:
        return error_response("Missing title field", 409)
        
    success, message, result = VideoService.patch_title(id, data['title'])
    if success:
        return success_response(result, message, 200)
    return error_response(message, 409)

@video_bp.route('/<int:id>/availability', methods=['PATCH'])
@admin_required
def update_video_availability(id):
    """
    PATCH /videos/<id>/availability
    Admin only: Partial update of video visibility.
    """
    data = request.json
    if not data or 'is_available' not in data:
        return error_response("Missing is_available field", 409)
        
    success, message, result = VideoService.patch_availability(id, data['is_available'])
    if success:
        return success_response(result, message, 200)
    return error_response(message, 409)

@video_bp.route('/', methods=['GET'])
def get_videos():
    """
    GET /videos
    Public: List all videos.
    """
    success, message, result = VideoService.get_all_videos()
    if success:
        return success_response(result, message, 200)
    return error_response(message, 400)

@video_bp.route('/<int:id>', methods=['GET'])
def get_video(id):
    """
    GET /videos/<id>
    Public: Fetch single video details.
    """
    success, message, result = VideoService.get_video_by_id(id)
    if success:
        return success_response(result, message, 200)
    return error_response(message, 404)
