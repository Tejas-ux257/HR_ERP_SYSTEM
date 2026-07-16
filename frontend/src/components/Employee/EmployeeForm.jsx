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

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        department_id: "",
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

    const validateForm = () => {

    const newErrors = {
        name: "",
        email: "",
        phone: "",
        department_id: "",
    };

    // Name
    if (!formData.name.trim()) {

        newErrors.name = "Employee name is required.";

    } else if (formData.name.trim().length < 3) {

        newErrors.name =
            "Employee name must be at least 3 characters.";

    } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {

        newErrors.name =
            "Employee name can contain only letters and spaces.";

    }

    // Email
    if (!formData.email.trim()) {

        newErrors.email = "Email is required.";

    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {

        newErrors.email = "Enter a valid email address.";

    }

    // Phone
    if (!/^\d{10}$/.test(formData.phone.trim())) {

        newErrors.phone =
            "Phone number must contain exactly 10 digits.";

    }

    // Department
    if (!formData.department_id) {

        newErrors.department_id =
            "Please select a department.";

    }

    setErrors(newErrors);

    return Object.values(newErrors).every(
        (error) => error === ""
    );

};

    // ==========================
    // Submit Form
    // ==========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
                {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}

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