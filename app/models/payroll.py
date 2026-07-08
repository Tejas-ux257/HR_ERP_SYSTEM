class Payroll:
    """
    Payroll Model
    """

    def __init__(
        self,
        id,
        employee_id,
        month,
        year,
        basic_salary,
        allowances,
        deductions,
        net_salary,
        generated_at
    ):
        self.id = id
        self.employee_id = employee_id
        self.month = month
        self.year = year
        self.basic_salary = basic_salary
        self.allowances = allowances
        self.deductions = deductions
        self.net_salary = net_salary
        self.generated_at = generated_at

    @classmethod
    def from_db_row(cls, row):
        return cls(
            id=row["id"],
            employee_id=row["employee_id"],
            month=row["month"],
            year=row["year"],
            basic_salary=float(row["basic_salary"]),
            allowances=float(row["allowances"]),
            deductions=float(row["deductions"]),
            net_salary=float(row["net_salary"]),
            generated_at=row["generated_at"]
        )

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "month": self.month,
            "year": self.year,
            "basic_salary": self.basic_salary,
            "allowances": self.allowances,
            "deductions": self.deductions,
            "net_salary": self.net_salary,
            "generated_at": str(self.generated_at)
            if self.generated_at else None
        }