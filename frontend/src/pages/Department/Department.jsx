import { useEffect, useState } from "react";
import DepartmentTable from "../../components/Department/DepartmentTable";
import { getDepartments } from "../../services/departmentService";

function Department() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const response = await getDepartments();

                console.log("Department API Response:", response);

                // Backend returns:
                // {
                //   status: "success",
                //   message: "Success",
                //   data: [...]
                // }

                setDepartments(response.data || []);
            } catch (error) {
                console.error("Department Error:", error);

                alert(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load departments"
                );
            } finally {
                setLoading(false);
            }
        };

        loadDepartments();
    }, []);

    if (loading) {
        return (
            <div className="container-fluid mt-4">
                <h4>Loading Departments...</h4>
            </div>
        );
    }

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Department Management</h2>

                <button className="btn btn-primary">
                    + Add Department
                </button>
            </div>

            {departments.length === 0 ? (
                <div className="alert alert-info">
                    No Departments Found.
                </div>
            ) : (
                <DepartmentTable departments={departments} />
            )}

        </div>
    );
}

export default Department;