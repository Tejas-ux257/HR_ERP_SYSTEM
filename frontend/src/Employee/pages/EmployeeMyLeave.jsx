import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { getMyLeaves } from "../Services/employeeLeaveService";

function EmployeeMyLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMyLeaves();

      const records = Array.isArray(response)
        ? response
        : response?.data || response?.leaves || [];

      setLeaves(records);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to load leave history"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const getBadge = (statusStr) => {
    const status = (statusStr || "Pending").toLowerCase().trim();

    switch (status) {
      case "approved":
        return "badge bg-success px-3 py-2 text-capitalize";
      case "rejected":
        return "badge bg-danger px-3 py-2 text-capitalize";
      default:
        return "badge bg-warning text-dark px-3 py-2 text-capitalize";
    }
  };

  return (
    <EmployeeLayout>
      <div className="container py-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-primary text-white py-3 rounded-top-4 d-flex justify-content-between align-items-center">
            <h3 className="mb-0 fw-bold fs-4">My Leave History</h3>
            <span className="badge bg-light text-primary fw-semibold rounded-pill px-3 py-2">
              {leaves.length} Applications
            </span>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-2" role="status"></div>
                <p className="text-muted fw-semibold mb-0">Loading leave history...</p>
              </div>
            ) : leaves.length === 0 ? (
              <div className="alert alert-info text-center py-4 rounded-3 border-0 shadow-sm mb-0">
                No leave applications found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="py-3">#</th>
                      <th className="py-3">Leave Type</th>
                      <th className="py-3">Start Date</th>
                      <th className="py-3">End Date</th>
                      <th className="py-3">Reason</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Applied On</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((leave, index) => (
                      <tr key={leave.id || leave._id || index}>
                        <td className="fw-semibold">{leave.id || index + 1}</td>
                        <td className="fw-medium">{leave.leave_type}</td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td
                          className="text-muted text-truncate"
                          style={{ maxWidth: "200px" }}
                          title={leave.reason}
                        >
                          {leave.reason}
                        </td>
                        <td>
                          <span className={getBadge(leave.status)}>
                            {leave.status || "Pending"}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {leave.applied_at || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeMyLeave;