import { useCallback, useEffect, useState } from "react";

import DepartmentTable from "../../components/Department/DepartmentTable";
import DepartmentModal from "../../components/Department/DepartmentModal";

import { getDepartments } from "../../services/departmentService";

function Department() {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

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

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        const loadInitialDepartments = async () => {

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

            } finally {

                setLoading(false);

            }

        };

        loadInitialDepartments();

    }, []);

    const handleAddDepartment = () => {

        setSelectedDepartment(null);

        setShowModal(true);

    };

    const handleEditDepartment = (department) => {

        setSelectedDepartment(department);

        setShowModal(true);

    };

    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedDepartment(null);

    };

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