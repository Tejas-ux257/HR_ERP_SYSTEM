class Department:
    """
    Department Model
    Represents one row from the departments table.
    """

    def __init__(self, department_id, department_name, department_code):
        self.department_id = department_id
        self.department_name = department_name
        self.department_code = department_code

    def to_dict(self):
        return {
            "department_id": self.department_id,
            "department_name": self.department_name,
            "department_code": self.department_code
        }

    @staticmethod
    def from_db_row(row):
        return Department(
            row["department_id"],
            row["department_name"],
            row["department_code"]
        )