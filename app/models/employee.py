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
        address=None,
        gender=None,
        dob=None,
        profile_image=None,
        created_at=None,
        updated_at=None,
        department_name=None,
        department_code=None
    ):
        self.id = id
        self.department_id = department_id
        self.name = name
        self.phone = phone
        self.email = email

        # Profile Information
        self.address = address
        self.gender = gender
        self.dob = dob
        self.profile_image = profile_image

        # Audit Fields
        self.created_at = created_at
        self.updated_at = updated_at

        # Department Information
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
            "email": self.email,
            "address": self.address,
            "gender": self.gender,
            "dob": self.dob,
            "profile_image": self.profile_image,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

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
            address=row.get("address"),
            gender=row.get("gender"),
            dob=row.get("dob"),
            profile_image=row.get("profile_image"),
            created_at=row.get("created_at"),
            updated_at=row.get("updated_at"),
            department_name=row.get("department_name"),
            department_code=row.get("department_code"),
        )