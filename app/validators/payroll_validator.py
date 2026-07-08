def validate_payroll(data):
    """
    Validate Payroll Request
    """

    if not data:
        return "Request body is required"

    if "employee_id" not in data:
        return "Employee ID is required"

    if "month" not in data:
        return "Month is required"

    if "year" not in data:
        return "Year is required"

    if "basic_salary" not in data:
        return "Basic salary is required"

    if data["basic_salary"] <= 0:
        return "Basic salary must be greater than 0"

    if "allowances" in data and data["allowances"] < 0:
        return "Allowances cannot be negative"

    if "deductions" in data and data["deductions"] < 0:
        return "Deductions cannot be negative"

    return None