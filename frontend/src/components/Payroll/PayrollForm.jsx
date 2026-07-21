import { useState } from "react";
const PayrollForm = ({
    payroll,
    onSubmit,
    onCancel
}) => {

    const [formData, setFormData] = useState(() => ({
        employee_id: payroll?.employee_id || "",
        month: payroll?.month || "",
        year: payroll?.year || "",
        basic_salary: payroll?.basic_salary || "",
        allowances: payroll?.allowances || "",
        deductions: payroll?.deductions || ""
    }));

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...formData,
            basic_salary: Number(formData.basic_salary),
            allowances: Number(formData.allowances),
            deductions: Number(formData.deductions),
            year: Number(formData.year)
        });

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">
                    Employee ID
                </label>

                <input
                    type="number"
                    name="employee_id"
                    className="form-control"
                    value={formData.employee_id}
                    onChange={handleChange}
                    disabled={!!payroll}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Month
                </label>

                <input
                    type="text"
                    name="month"
                    className="form-control"
                    placeholder="Example: July"
                    value={formData.month}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Year
                </label>

                <input
                    type="number"
                    name="year"
                    className="form-control"
                    value={formData.year}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Basic Salary
                </label>

                <input
                    type="number"
                    name="basic_salary"
                    className="form-control"
                    value={formData.basic_salary}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Allowances
                </label>

                <input
                    type="number"
                    name="allowances"
                    className="form-control"
                    value={formData.allowances}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Deductions
                </label>

                <input
                    type="number"
                    name="deductions"
                    className="form-control"
                    value={formData.deductions}
                    onChange={handleChange}
                />

            </div>

            <div className="d-flex justify-content-end gap-2">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {payroll ? "Update Payroll" : "Generate Payroll"}
                </button>

            </div>

        </form>

    );

};

export default PayrollForm;