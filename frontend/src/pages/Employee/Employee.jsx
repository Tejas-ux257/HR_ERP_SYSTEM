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
      const prefetchedEmployees =
        nextPageResponse?.data?.employees || nextPageResponse?.data || [];

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
    return <LoadingSpinner message="Loading Employees..." />;
  }

  // Calculate current effective UI page number
  const effectivePageNumber = (backendPage - 1) * 2 + bufferPage;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }} className="py-4">
      <div className="container-lg">
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <span
              className="px-2.5 py-1 rounded-pill small fw-semibold"
              style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
            >
              Workforce Management
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
              Employees
            </h2>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-primary shadow-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-2"
              onClick={handleAddEmployee}
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Bar & Search */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Loaded Workforce Records
                </span>
                <h3 className="fw-bold text-dark mb-0">{employees.length}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", backgroundColor: "#eff6ff", color: "#2563eb" }}
              >
                <i className="bi bi-people-fill fs-5"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 h-100 d-flex align-items-center">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder="Search employee by name or ID..."
                  value={searchTerm}
                  onChange={async (e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    await fetchEmployees(1, value);
                  }}
                  style={{ fontSize: "14px" }}
                />
                {searchTerm && (
                  <button
                    className="btn btn-link text-muted border-start-0 text-decoration-none"
                    type="button"
                    onClick={async () => {
                      setSearchTerm("");
                      await fetchEmployees(1, "");
                    }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Employee Table Container */}
        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden mb-4">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="fw-bold text-dark mb-0">Employee Directory</h6>
            <span className="text-muted small">
              Showing {currentEmployees.length} entries on page {effectivePageNumber}
            </span>
          </div>

          <div className="p-0">
            <EmployeeTable
              employees={currentEmployees}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteClick}
            />
          </div>

          {/* Pagination Controls */}
          <div className="p-3 border-top bg-light-subtle d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="text-muted small">
              Page <strong className="text-dark">{effectivePageNumber}</strong>
            </span>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-white border shadow-sm rounded-2 text-dark px-3 fw-medium d-flex align-items-center gap-1"
                disabled={backendPage === 1 && bufferPage === 1}
                onClick={handlePreviousPage}
              >
                <i className="bi bi-chevron-left"></i> Previous
              </button>

              <button
                className="btn btn-sm btn-white border shadow-sm rounded-2 text-dark px-3 fw-medium d-flex align-items-center gap-1"
                disabled={
                  bufferPage === 2
                    ? !hasNextBuffer && nextEmployees.length === 0
                    : employees.length <= PAGE_SIZE && !hasNextBuffer
                }
                onClick={handleNextPage}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        show={showModal}
        onClose={handleCloseModal}
        employee={selectedEmployee}
        refreshEmployees={fetchEmployees}
      />

      {/* Delete Confirmation Modal */}
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