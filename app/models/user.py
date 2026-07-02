class User:
    """
    User Model
    Represents one row from the users table.
    """

    def __init__(
        self,
        id,
        employee_id,
        username,
        password,
        role,
        created_at=None
    ):
        self.id = id
        self.employee_id = employee_id
        self.username = username
        self.password = password
        self.role = role
        self.created_at = created_at

    def to_dict(self):
        """
        Convert User object into dictionary.
        Password is excluded for security.
        """

        data = {
            "id": self.id,
            "employee_id": self.employee_id,
            "username": self.username,
            "role": self.role
        }

        if self.created_at:
            data["created_at"] = str(self.created_at)

        return data

    @staticmethod
    def from_db_row(row):
        """
        Convert database row into User object.
        """

        return User(
            id=row["id"],
            employee_id=row["employee_id"],
            username=row["username"],
            password=row["password"],
            role=row["role"],
            created_at=row.get("created_at")
        )