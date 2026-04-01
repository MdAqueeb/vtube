class Likes:
    def __init__(self, id, user_id, video_id, type_action):
        self.id = id
        self.user_id = user_id
        self.video_id = video_id
        self.type = type_action

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "video_id": self.video_id,
            "type": self.type
        }
