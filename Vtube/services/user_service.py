import bcrypt
from repositories.user_repository import UserRepository
from utils.auth import generate_token

class UserService:
    @staticmethod
    def register(name, email, password):
        # Check if user exists
        existing_user = UserRepository.get_user_by_email(email)
        if existing_user:
            return False, "User with this email already exists", None

        # Hash password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

        # Insert to DB
        user_id = UserRepository.create_user(name, email, hashed_password)
        if not user_id:
            return False, "Failed to register user", None

        new_user = UserRepository.get_user_by_id(user_id)
        return True, "User registered successfully", new_user.to_dict()

    @staticmethod
    def login(email, password):
        user = UserRepository.get_user_by_email(email)
        if not user:
            return False, "Invalid email or password", None

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return False, "Invalid email or password", None

        # Generate JWT
        token = generate_token(user.id, user.role)
        
        user_data = user.to_dict()
        user_data['token'] = token
        
        return True, "Login successful", user_data

    @staticmethod
    def forgot_password(email):
        user = UserRepository.get_user_by_email(email)
        if not user:
            return False, "User not found", None
        return True, "Password reset instructions sent", None

    @staticmethod
    def verify_email(user_id):
        success = UserRepository.verify_email(user_id)
        if success:
            return True, "Email verified successfully", None
        return False, "Failed to verify email", None

    @staticmethod
    def get_user(user_id):
        user = UserRepository.get_user_by_id(user_id)
        if user:
            return True, "User fetched successfully", user.to_dict()
        return False, "User not found", None

    @staticmethod
    def update_user(user_id, name):
        success = UserRepository.update_user(user_id, name)
        if success:
            user = UserRepository.get_user_by_id(user_id)
            return True, "User updated successfully", user.to_dict()
        return False, "Failed to update user", None
