from flask import Flask, jsonify
from flask_cors import CORS

from apis.user_api.routes import user_bp
from apis.video_api.routes import video_bp
from apis.comment_api.routes import comment_bp
from apis.like_api.routes import like_bp

app = Flask(__name__)

# Full CORS Support as requested
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers="*", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])

# Register Blueprints
app.register_blueprint(user_bp, url_prefix='/')
app.register_blueprint(video_bp, url_prefix='/videos')
app.register_blueprint(comment_bp, url_prefix='/videos')
app.register_blueprint(like_bp, url_prefix='/videos')

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"success": True, "message": "Vtube backend is running!"})

@app.errorhandler(404)
def not_found(e):
    return jsonify({"success": False, "message": "Route not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
