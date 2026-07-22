import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
// Fixed paths: Going up two levels (../../) from src/pages/Leave/ back to src/
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { getLeaves, approveLeave, rejectLeave } from "../../services/leaveService";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Fetch all leave records from backend
  const fetchLeaves = useCallback(async () => {
    try {
      const response = await getLeaves();
      const list = Array.isArray(response)
        ? response
        : response.data || response.leaves || [];
      setLeaves(list);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Failed to load leave records.");
    }
  }, []);

  useEffect(() => {
    const loadLeaves = async () => {
      setLoading(true);
      await fetchLeaves();
      setLoading(false);
    };

    loadLeaves();
  }, [fetchLeaves]);

  // Handle Approve (Accept)
  const handleApprove = async (leaveId) => {
    try {
      setActionLoadingId(leaveId);
      await approveLeave(leaveId);
      toast.success("Leave request accepted successfully!");
      await fetchLeaves();
    } catch (error) {
      console.error("Error approving leave:", error);
      toast.error(
        error.response?.data?.message || "Failed to accept leave request."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Reject
  const handleReject = async (leaveId) => {
    try {
      setActionLoadingId(leaveId);
      await rejectLeave(leaveId);
      toast.success("Leave request rejected successfully!");
      await fetchLeaves();
    } catch (error) {
      console.error("Error rejecting leave:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject leave request."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  // Search filter matching employee name or leave type
  const filteredLeaves = leaves.filter((record) => {
    const name =
      record.employee_name ||
      record.employee?.name ||
      record.name ||
      String(record.employee_id || "");
    const type = record.type || record.leave_type || "";
    const term = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(term) || type.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return <LoadingSpinner message="Loading Leave Requests..." />;
  }

  // Analytics Metrics
  const totalLeaves = leaves.length;
  const pendingCount = leaves.filter(
    (l) => (l.status || "").toLowerCase() === "pending"
  ).length;
  const approvedCount = leaves.filter(
    (l) => (l.status || "").toLowerCase() === "approved"
  ).length;
  const rejectedCount = leaves.filter(
    (l) => (l.status || "").toLowerCase() === "rejected"
  ).length;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }} className="py-4">
      <div className="container-lg">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <span
              className="px-2.5 py-1 rounded-pill small fw-semibold"
              style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
            >
              Time Off & Requests
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
              Leave Management
            </h2>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Total Requests
                </span>
                <h3 className="fw-bold text-dark mb-0 mt-1">{totalLeaves}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "42px", height: "42px", backgroundColor: "#eff6ff", color: "#2563eb" }}
              >
                <i className="bi bi-file-earmark-text-fill fs-5"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Pending Action
                </span>
                <h3 className="fw-bold text-warning mb-0 mt-1">{pendingCount}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "42px", height: "42px", backgroundColor: "#fffbeb", color: "#d97706" }}
              >
                <i className="bi bi-hourglass-split fs-5"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Approved
                </span>
                <h3 className="fw-bold text-success mb-0 mt-1">{approvedCount}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "42px", height: "42px", backgroundColor: "#f0fdf4", color: "#16a34a" }}
              >
                <i className="bi bi-check-circle-fill fs-5"></i>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">
              <div>
                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>
                  Rejected
                </span>
                <h3 className="fw-bold text-danger mb-0 mt-1">{rejectedCount}</h3>
              </div>
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "42px", height: "42px", backgroundColor: "#fef2f2", color: "#dc2626" }}
              >
                <i className="bi bi-x-circle-fill fs-5"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden mb-4">
          <div className="p-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold text-dark mb-1">Leave Applications</h6>
              <p className="text-muted small mb-0">
                Review, accept, or reject incoming leave requests
              </p>
            </div>

            {/* Search Control */}
            <div style={{ maxWidth: "320px", width: "100%" }}>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder="Search employee or leave type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: "14px" }}
                />
                {searchTerm && (
                  <button
                    className="btn btn-link text-muted border-start-0 text-decoration-none"
                    type="button"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="p-0 table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No leave applications found.
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((record) => {
                    const leaveId = record.id || record._id;
                    const empName =
                      record.employee_name ||
                      record.employee?.name ||
                      record.name ||
                      record.employee_id ||
                      "N/A";
                    const status = (record.status || "Pending").toLowerCase();

                    return (
                      <tr key={leaveId}>
                        <td className="ps-4">{leaveId}</td>
                        <td className="fw-semibold text-dark">{empName}</td>
                        <td>{record.type || record.leave_type || "N/A"}</td>
                        <td>{record.start_date || record.startDate || "N/A"}</td>
                        <td>{record.end_date || record.endDate || "N/A"}</td>
                        <td className="text-muted" style={{ maxWidth: "220px" }}>
                          {record.reason || "N/A"}
                        </td>
                        <td>
                          {status === "approved" && (
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1">
                              Approved
                            </span>
                          )}
                          {status === "rejected" && (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2.5 py-1">
                              Rejected
                            </span>
                          )}
                          {status === "pending" && (
                            <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2.5 py-1">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="text-center pe-4">
                          {status === "pending" ? (
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-sm btn-success rounded-2 px-2.5 py-1 d-flex align-items-center gap-1"
                                onClick={() => handleApprove(leaveId)}
                                disabled={actionLoadingId === leaveId}
                              >
                                <i className="bi bi-check-lg"></i>
                                <span>Accept</span>
                              </button>
                              <button
                                className="btn btn-sm btn-danger rounded-2 px-2.5 py-1 d-flex align-items-center gap-1"
                                onClick={() => handleReject(leaveId)}
                                disabled={actionLoadingId === leaveId}
                              >
                                <i className="bi bi-x-lg"></i>
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-muted small">Completed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leave;