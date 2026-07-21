import { useCallback, useEffect, useState } from "react";
import DepartmentTable from "../../components/Department/DepartmentTable";
import DepartmentModal from "../../components/Department/DepartmentModal";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import ConfirmationModal from "../../components/Common/ConfirmationModal";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      department.department_code
        ?.toLowerCase()
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / recordsPerPage)
  );

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
  const handleDeleteDepartment = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDepartment(selectedDepartment.department_id);
      await fetchDepartments();
      toast.success("Department deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete department."
      );
    } finally {
      setShowDeleteModal(false);
      setSelectedDepartment(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedDepartment(null);
  };

  if (loading) {
    return <LoadingSpinner message="Loading Departments..." />;
  }

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
              Organization Management
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
              Departments
            </h2>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-primary shadow-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-2"
              onClick={handleAddDepartment}
            >
              <i className="bi bi-plus-lg"></i>
              <span>Add Department</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Bar & Search */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Total Departments
                </span>
                <h3 className="fw-bold text-dark mb-0">{departments.length}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", backgroundColor: "#ecfdf5", color: "#059669" }}
              >
                <i className="bi bi-building fs-5"></i>
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
                  placeholder="Search by department name or code..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ fontSize: "14px" }}
                />
                {searchTerm && (
                  <button
                    className="btn btn-link text-muted border-start-0 text-decoration-none"
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Department Table Container */}
        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden mb-4">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="fw-bold text-dark mb-0">Department Directory</h6>
            <span className="text-muted small">
              Showing {filteredDepartments.length === 0 ? 0 : indexOfFirstRecord + 1}-
              {Math.min(indexOfLastRecord, filteredDepartments.length)} of {filteredDepartments.length}
            </span>
          </div>

          <div className="p-0">
            <DepartmentTable
              departments={currentDepartments}
              onEdit={handleEditDepartment}
              onDelete={handleDeleteDepartment}
            />
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="p-3 border-top bg-light-subtle d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="text-muted small">
                Page {currentPage} of {totalPages}
              </span>

              <div className="d-flex align-items-center gap-1">
                <button
                  className="btn btn-sm btn-white border shadow-sm rounded-2 text-dark px-3"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="bi bi-chevron-left me-1"></i> Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm rounded-2 px-3 fw-medium ${
                      currentPage === index + 1
                        ? "btn-primary"
                        : "btn-white border text-dark shadow-sm"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="btn btn-sm btn-white border shadow-sm rounded-2 text-dark px-3"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next <i className="bi bi-chevron-right ms-1"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <DepartmentModal
        show={showModal}
        onClose={handleCloseModal}
        department={selectedDepartment}
        refreshDepartments={fetchDepartments}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Department"
        message={`Are you sure you want to delete "${selectedDepartment?.department_name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Department;