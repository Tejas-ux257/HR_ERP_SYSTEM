import { useCallback, useEffect, useState } from "react";

import DepartmentTable from "../../components/Department/DepartmentTable";
import DepartmentModal from "../../components/Department/DepartmentModal";

import {
    getDepartments,
    deleteDepartment,
} from "../../services/departmentService";

function Department() {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // Fetch Departments
    const fetchDepartments = useCallback(async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data || []);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to load departments"
            );

        }

    }, []);

    // Initial Load
    useEffect(() => {

        const loadDepartments = async () => {

            setLoading(true);

            await fetchDepartments();

            setLoading(false);

        };

        loadDepartments();

    }, [fetchDepartments]);

    // Add Department
    const handleAddDepartment = () => {

        setSelectedDepartment(null);

        setShowModal(true);

    };

    // Edit Department
    const handleEditDepartment = (department) => {

        setSelectedDepartment(department);

        setShowModal(true);

    };

    // Close Modal
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedDepartment(null);

    };
    // Delete Department
    const handleDeleteDepartment = async (department) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${department.department_name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteDepartment(department.department_id);

            await fetchDepartments();

            alert("Department deleted successfully.");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete department."
            );

        }

    };

    // Loading Screen
    if (loading) {

        return (

            <div className="container-fluid mt-4">

                <h4>Loading Departments...</h4>

            </div>

        );

    }

    // UI
    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Department Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={handleAddDepartment}
                >
                    + Add Department
                </button>

            </div>

            <DepartmentTable
                departments={departments}
                onEdit={handleEditDepartment}
                onDelete={handleDeleteDepartment}
            />

            <DepartmentModal
                show={showModal}
                onClose={handleCloseModal}
                department={selectedDepartment}
                refreshDepartments={fetchDepartments}
            />

        </div>

    );

}

export default Department;