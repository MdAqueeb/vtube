class User:
    def __init__(self, id, name, email, password, role, created_at=None):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.role = role
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "created_at": str(self.created_at) if self.created_at else None
        }
