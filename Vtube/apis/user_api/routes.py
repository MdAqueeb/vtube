from flask import Blueprint, request, g
from services.user_service import UserService
from utils.response import success_response, error_response
from utils.auth import login_required

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    """
    POST /register
    Create a new user account.
    """
    data = request.json
    required_fields = ['name', 'email', 'password']
    if not all(field in data for field in required_fields):
        return error_response("Missing required fields", 409)

    success, message, result = UserService.register(data['name'], data['email'], data['password'])
    if success:
        return success_response(result, message, 201)
    return error_response(message, 409)

@user_bp.route('/login', methods=['POST'])
def login():
    """
    POST /login
    Authenticate user and return JWT.
    """
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return error_response("Missing email or password", 400)

    # UserService.login handles token generation consistently
    success, message, user_data = UserService.login(data['email'], data['password'])
    
    if success:
        return success_response(user_data, message, 200)
    return error_response(message, 401)

@user_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    POST /forgot-password
    Placeholder for reset instructions.
    """
    data = request.json
    if not data or 'email' not in data:
        return error_response("Missing email", 400)

    success, message, _ = UserService.forgot_password(data['email'])
    if success:
        return success_response(None, message, 200)
    return error_response(message, 404)

@user_bp.route('/user', methods=['GET'])
@login_required
def get_user():
    """
    GET /user
    Fetch current user profile using g.user_id.
    """
    success, message, result = UserService.get_user(g.user_id)
    if success:
        return success_response(result, message, 200)
    return error_response(message, 404)

@user_bp.route('/user', methods=['PUT'])
@login_required
def update_user():
    """
    PUT /user
    Update user profile name using g.user_id.
    """
    data = request.json
    if not data or 'name' not in data:
        return error_response("Missing name field", 400)

    success, message, result = UserService.update_user(g.user_id, data['name'])
    if success:
        return success_response(result, message, 200)
    return error_response(message, 400)
