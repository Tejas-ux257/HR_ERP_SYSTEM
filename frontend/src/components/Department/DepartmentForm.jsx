import { useState } from "react";

import {
    addDepartment,
    updateDepartment,
} from "../../services/departmentService";

function DepartmentForm({
    department,
    onClose,
    refreshDepartments,
}) {

    const [formData, setFormData] = useState(() => ({
        department_name: department?.department_name || "",
        department_code: department?.department_code || "",
    }));

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (department) {

                await updateDepartment(
                    department.department_id,
                    formData
                );

                alert("Department Updated Successfully");

            } else {

                await addDepartment(formData);

                alert("Department Added Successfully");

            }

            refreshDepartments();

            onClose();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Operation Failed"
            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">
                    Department Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="department_name"
                    value={formData.department_name}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Department Code
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="department_code"
                    value={formData.department_code}
                    onChange={handleChange}
                    required
                />

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
                    {department ? "Update" : "Save"}
                </button>

            </div>

        </form>

    );

}

export default DepartmentForm;