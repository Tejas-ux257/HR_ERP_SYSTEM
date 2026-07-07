class Attendance:
    """
    Attendance Model
    """

    def __init__(
        self,
        id,
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status,
        created_at
    ):
        self.id = id
        self.employee_id = employee_id
        self.attendance_date = attendance_date
        self.check_in = check_in
        self.check_out = check_out
        self.status = status
        self.created_at = created_at

    @staticmethod
    def from_db_row(row):
        """
        Convert database row into Attendance object
        """

        return Attendance(
            id=row["id"],
            employee_id=row["employee_id"],
            attendance_date=row["attendance_date"],
            check_in=row["check_in"],
            check_out=row["check_out"],
            status=row["status"],
            created_at=row["created_at"]
        )

    def to_dict(self):
        """
        Convert Attendance object into dictionary
        """

        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "attendance_date": str(self.attendance_date),
            "check_in": str(self.check_in) if self.check_in else None,
            "check_out": str(self.check_out) if self.check_out else None,
            "status": self.status,
            "created_at": str(self.created_at)
        }