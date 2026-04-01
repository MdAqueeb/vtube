from flask import Blueprint, request, g
from services.like_service import LikeService
from utils.response import success_response, error_response
from utils.auth import login_required

like_bp = Blueprint('like_bp', __name__)

@like_bp.route('/<int:id>/react', methods=['POST'])
@login_required
def react_to_video(id):
    data = request.json
    if not data or 'type' not in data:
        return error_response("Missing type field (LIKE/DISLIKE)", 409)

    # Use g.user_id instead of request.user_id
    success, message, result = LikeService.react_to_video(g.user_id, id, data['type'])
    if success:
        return success_response(result, message, 201)
    return error_response(message, 409)
