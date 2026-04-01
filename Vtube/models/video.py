class Video:
    def __init__(self, id, title, description, video_url, poster_url, is_available, created_at=None):
        self.id = id
        self.title = title
        self.description = description
        self.video_url = video_url
        self.poster_url = poster_url
        self.is_available = is_available
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "video_url": self.video_url,
            "poster_url": self.poster_url,
            "is_available": bool(self.is_available),
            "created_at": str(self.created_at) if self.created_at else None
        }
