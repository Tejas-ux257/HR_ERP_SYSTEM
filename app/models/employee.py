class Employee:
    """
    Employee Model
    Represents one row from the employees table.
    """

    def __init__(
        self,
        id,
        department_id,
        name,
        phone,
        email,
        department_name=None,
        department_code=None
    ):
        self.id = id
        self.department_id = department_id
        self.name = name
        self.phone = phone
        self.email = email
        self.department_name = department_name
        self.department_code = department_code

    def to_dict(self):
        """
        Convert Employee object into dictionary.
        """

        data = {
            "id": self.id,
            "department_id": self.department_id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email
        }

        # Include department details if available
        if self.department_name is not None:
            data["department_name"] = self.department_name

        if self.department_code is not None:
            data["department_code"] = self.department_code

        return data

    @staticmethod
    def from_db_row(row):
        """
        Convert database row into Employee object.
        """

        return Employee(
            id=row["id"],
            department_id=row["department_id"],
            name=row["name"],
            phone=row["phone"],
            email=row["email"],
            department_name=row.get("department_name"),
            department_code=row.get("department_code")
        )