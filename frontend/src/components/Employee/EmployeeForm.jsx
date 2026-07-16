import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    addEmployee,
    updateEmployee,
} from "../../services/employeeService";

import {
    getDepartments,
} from "../../services/departmentService";

function EmployeeForm({
    employee,
    onClose,
    refreshEmployees,
}) {

    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        name: employee?.name || "",
        email: employee?.email || "",
        phone: employee?.phone || "",
        department_id: employee?.department_id || "",
    });

    // ==========================
    // Load Departments
    // ==========================
    useEffect(() => {

        const loadDepartments = async () => {

            try {

                const response = await getDepartments();

                setDepartments(response.data || []);

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load departments."
                );

            }

        };

        loadDepartments();

    }, []);

    // ==========================
    // Handle Input Change
    // ==========================
    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    // ==========================
    // Submit Form
    // ==========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (employee) {

                await updateEmployee(
                    employee.id,
                    formData
                );

                toast.success(
                    "Employee updated successfully."
                );

            } else {

                await addEmployee(formData);

                toast.success(
                    "Employee added successfully."
                );

            }

            await refreshEmployees();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Operation failed."
            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">
                    Employee Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Phone
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Department
                </label>

                <select
                    className="form-select"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map((department) => (

                        <option
                            key={department.department_id}
                            value={department.department_id}
                        >
                            {department.department_name}
                        </option>

                    ))}

                </select>

            </div>

            <div className="d-flex justify-content-end">

                <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {employee ? "Update" : "Save"}
                </button>

            </div>

        </form>

    );

}

export default EmployeeForm;