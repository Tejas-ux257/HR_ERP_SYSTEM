import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeModal from "../../components/Employee/EmployeeModal";
import ConfirmationModal from "../../components/Common/ConfirmationModal";

import {
    getEmployees,
    deleteEmployee,
} from "../../services/employeeService";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const filteredEmployees = employees.filter((employee) => {
        const search = searchTerm.toLowerCase();

        return (
            employee.name.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            employee.phone.includes(search) ||
            employee.department_name.toLowerCase().includes(search) ||
            employee.department_code.toLowerCase().includes(search)
        );
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentEmployees = filteredEmployees.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.max(
        1,
        Math.ceil(filteredEmployees.length / recordsPerPage)
    );

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // ==========================
    // Fetch Employees
    // ==========================
    const fetchEmployees = useCallback(async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load employees."
            );

        }

    }, []);

    // ==========================
    // Initial Load
    // ==========================
    useEffect(() => {

        const loadEmployees = async () => {

            setLoading(true);

            await fetchEmployees();

            setLoading(false);

        };

        loadEmployees();

    }, [fetchEmployees]);

    // ==========================
    // Add Employee
    // ==========================
    const handleAddEmployee = () => {

        setSelectedEmployee(null);

        setShowModal(true);

    };

    // ==========================
    // Edit Employee
    // ==========================
    const handleEditEmployee = (employee) => {

        setSelectedEmployee(employee);

        setShowModal(true);

    };

    // ==========================
    // Delete Button Click
    // ==========================
    const handleDeleteClick = (employee) => {

        setSelectedEmployee(employee);

        setShowDeleteModal(true);

    };

    // ==========================
    // Confirm Delete
    // ==========================
    const handleConfirmDelete = async () => {

        try {

            await deleteEmployee(selectedEmployee.id);

            toast.success("Employee deleted successfully.");

            await fetchEmployees();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete employee."
            );

        } finally {

            setShowDeleteModal(false);

            setSelectedEmployee(null);

        }

    };

    // ==========================
    // Cancel Delete
    // ==========================
    const handleCancelDelete = () => {

        setShowDeleteModal(false);

        setSelectedEmployee(null);

    };

    // ==========================
    // Close Add/Edit Modal
    // ==========================
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedEmployee(null);

    };

    // ==========================
    // Loading
    // ==========================
    if (loading) {

        return (

            <div className="container-fluid mt-4">

                <h4>Loading Employees...</h4>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Employee Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={handleAddEmployee}
                >
                    + Add Employee
                </button>

            </div>
              
            <div className="row mb-3">

    <div className="col-md-4">

        <input
            type="text"
            className="form-control"
            placeholder="Search Employee..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage((prev) => prev + 1);
                // setCurrentPage(1);
            }}
        />

    </div>

</div>

            <EmployeeTable
                employees={currentEmployees}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteClick}
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
                onClick={() =>
                    setCurrentPage(index + 1)
                }
            >
                {index + 1}
            </button>

        )
    )}

    <button
        className="btn btn-outline-primary"
        disabled={currentPage === totalPages}
        onClick={() =>
            setCurrentPage(currentPage + 1)
        }
    >
        Next
    </button>

</div>
            <EmployeeModal
                show={showModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
                refreshEmployees={fetchEmployees}
            />

            <ConfirmationModal
                show={showDeleteModal}
                title="Delete Employee"
                message={`Are you sure you want to delete "${selectedEmployee?.name}"?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

        </div>

    );

}

export default Employee;