class Comment:
    def __init__(self, id, user_id, video_id, content, created_at=None):
        self.id = id
        self.user_id = user_id
        self.video_id = video_id
        self.content = content
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "video_id": self.video_id,
            "content": self.content,
            "created_at": str(self.created_at) if self.created_at else None
        }
