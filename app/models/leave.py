class Leave:
    """
    Leave Model
    """

    def __init__(
        self,
        id,
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status,
        applied_at
    ):
        self.id = id
        self.employee_id = employee_id
        self.leave_type = leave_type
        self.start_date = start_date
        self.end_date = end_date
        self.reason = reason
        self.status = status
        self.applied_at = applied_at

    @classmethod
    def from_db_row(cls, row):
        """
        Create Leave object from database row
        """

        return cls(
            id=row["id"],
            employee_id=row["employee_id"],
            leave_type=row["leave_type"],
            start_date=row["start_date"],
            end_date=row["end_date"],
            reason=row["reason"],
            status=row["status"],
            applied_at=row["applied_at"]
        )

    def to_dict(self):
        """
        Convert Leave object to dictionary
        """

        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "leave_type": self.leave_type,
            "start_date": str(self.start_date),
            "end_date": str(self.end_date),
            "reason": self.reason,
            "status": self.status,
            "applied_at": str(self.applied_at)
        }