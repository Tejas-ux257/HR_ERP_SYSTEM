import { useCallback, useEffect, useState } from "react";

import DepartmentTable from "../../components/Department/DepartmentTable";
import DepartmentModal from "../../components/Department/DepartmentModal";
import { toast } from "react-toastify";

import {
    getDepartments,
    deleteDepartment,
} from "../../services/departmentService";

function Department() {

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    // Fetch Departments
    const fetchDepartments = useCallback(async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error(
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

    // Search Filter
    const filteredDepartments = departments.filter((department) => {

        return (

            department.department_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            department.department_code
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        );

    });

   
    // Pagination
    const indexOfLastRecord = currentPage * recordsPerPage;

    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentDepartments = filteredDepartments.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / recordsPerPage));

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

        if (!confirmed) return;

        try {

            await deleteDepartment(department.department_id);

            await fetchDepartments();

            toast.success("Department deleted successfully.");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete department."
            );

        }

    };

    // Loading
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

            {/* Search */}
            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Department..."
                        value={searchTerm}
                        onChange={(e) => {

                            setSearchTerm(e.target.value);

                            // Reset to first page while searching
                            setCurrentPage(1);

                        }}
                    />

                </div>

            </div>

            {/* Table */}
            <DepartmentTable
                departments={currentDepartments}
                onEdit={handleEditDepartment}
                onDelete={handleDeleteDepartment}
            />
               

               <div className="d-flex justify-content-center mt-4">

    <button
        className="btn btn-outline-primary me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
    >
        Previous
    </button>

    {Array.from(
        { length: totalPages },
        (_, index) => (

            <button
                key={index}
                className={`btn me-2 ${
                    currentPage === index + 1
                        ? "btn-primary"
                        : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </button>

        )
    )}

    <button
        className="btn btn-outline-primary"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
    >
        Next
    </button>

</div>

            {/* Add/Edit Modal */}
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