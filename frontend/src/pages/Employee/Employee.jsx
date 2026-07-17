import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeModal from "../../components/Employee/EmployeeModal";
import ConfirmationModal from "../../components/Common/ConfirmationModal";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import {
    getEmployees,
    deleteEmployee,
} from "../../services/employeeService";

function Employee() {

    const PAGE_SIZE = 5;
    const BUFFER_SIZE = 10;

    const [employees, setEmployees] = useState([]);
    const [nextEmployees, setNextEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [backendPage, setBackendPage] = useState(1);
    const [bufferPage, setBufferPage] = useState(1);
    const [hasNextBuffer, setHasNextBuffer] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchEmployees = useCallback(async (page = 1, search = "") => {

        try {
            const response = await getEmployees(page, BUFFER_SIZE, search);
            const employeeList = response?.data?.employees || response?.data || [];
            const hasNext = response?.data?.has_next ?? false;

            setEmployees(employeeList);
            setBackendPage(page);
            setBufferPage(1);
            setHasNextBuffer(hasNext);

            const nextPageResponse = await getEmployees(
                page + 1,
                BUFFER_SIZE,
                search
            );
            const prefetchedEmployees = nextPageResponse?.data?.employees || nextPageResponse?.data || [];

            setNextEmployees(prefetchedEmployees);

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load employees."
            );
        }

    }, []);

    useEffect(() => {

        const loadEmployees = async () => {
            setLoading(true);
            await fetchEmployees(1);
            setLoading(false);
        };

        loadEmployees();

    }, [fetchEmployees]);

    const currentEmployees =
        bufferPage === 1
            ? employees.slice(0, PAGE_SIZE)
            : employees.slice(PAGE_SIZE, PAGE_SIZE * 2);

    const handleNextPage = useCallback(async () => {
        if (bufferPage === 1) {
            setBufferPage(2);
            return;
        }

        if (nextEmployees.length > 0) {
            setEmployees(nextEmployees);
            setBackendPage((prev) => prev + 1);
            setBufferPage(1);
            setNextEmployees([]);
            return;
        }

        if (hasNextBuffer) {
            await fetchEmployees(backendPage + 1);
        }
    }, [backendPage, bufferPage, fetchEmployees, hasNextBuffer, nextEmployees]);

    const handlePreviousPage = useCallback(async () => {
        if (bufferPage === 2) {
            setBufferPage(1);
            return;
        }

        if (backendPage > 1) {
            await fetchEmployees(backendPage - 1);
        }
    }, [backendPage, bufferPage, fetchEmployees]);

    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setShowModal(true);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteEmployee(selectedEmployee.id);

            toast.success("Employee deleted successfully.");

            await fetchEmployees(backendPage);

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

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedEmployee(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };

    if (loading) {
        return (
            <LoadingSpinner
                message="Loading Employees..."
            />
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
                        onChange={async (e) => {

                            const value = e.target.value;

                            setSearchTerm(value);

                            await fetchEmployees(1, value);

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
                    disabled={backendPage === 1 && bufferPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>

                <button
                    className="btn btn-outline-primary"
                    disabled={bufferPage === 2 ? !hasNextBuffer && nextEmployees.length === 0 : employees.length <= PAGE_SIZE && !hasNextBuffer}
                    onClick={handleNextPage}
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