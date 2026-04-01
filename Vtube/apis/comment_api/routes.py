from flask import Blueprint, request, g
from services.comment_service import CommentService
from utils.response import success_response, error_response
from utils.auth import login_required

comment_bp = Blueprint('comment_bp', __name__)

@comment_bp.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment(id):
    data = request.json
    if not data or 'content' not in data:
        return error_response("Missing content field", 409)

    # Use g.user_id instead of request.user_id
    success, message, result = CommentService.add_comment(g.user_id, id, data['content'])
    if success:
        return success_response(result, message, 201)
    return error_response(message, 409)

@comment_bp.route('/<int:id>/comments', methods=['GET'])
def get_comments(id):
    success, message, result = CommentService.get_comments_for_video(id)
    if success:
        return success_response(result, message, 200)
    return error_response(message, 404)
