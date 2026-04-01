import jwt
import os
import datetime
from functools import wraps
from flask import request, g
from utils.response import error_response

# Standard JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-vtube-key")
ALGORITHM = "HS256"

def generate_token(user_id, role):
    """
    Generate a standardized JWT token.
    Payload strictly contains: sub (user_id), role, exp, and iat.
    """
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'role': role.upper()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)

def login_required(f):
    """
    Middleware to verify JWT and populate flask.g with user context.
    Sets g.user_id and g.role.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return error_response("Missing or invalid token", 401)

        try:
            token = auth_header.split(" ")[1]
            decoded = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])

            # Standardized payload access
            g.user_id = decoded.get("sub")
            g.role = decoded.get("role", "").upper()

            if not g.user_id or not g.role:
                return error_response("Malformed token payload", 401)

        except jwt.ExpiredSignatureError:
            return error_response("Token has expired", 401)
        except jwt.InvalidTokenError:
            return error_response("Invalid token", 401)
        except Exception:
            return error_response("Authentication failed", 401)

        return f(*args, **kwargs)

    return decorated

def admin_required(f):
    """
    Middleware that builds on top of login_required.
    Verifies the user has an 'admin' role.
    """
    @wraps(f)
    @login_required # Ensures login_required runs first to populate g.role
    def decorated(*args, **kwargs):
        # Strictly check for 'admin' (lowercase based on new schema/user rules)
        if getattr(g, 'role', None) != 'ADMIN':
            return error_response("Admin privileges required", 403)
        return f(*args, **kwargs)

    return decorated
