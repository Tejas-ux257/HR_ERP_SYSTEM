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
        error.response?.data?.message ||
          error.message ||
          "Failed to load leave history"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const getBadge = (status) => {
    switch (status) {
      case "Approved":
        return "badge bg-success";

      case "Rejected":
        return "badge bg-danger";

      default:
        return "badge bg-warning text-dark";
    }
  };

  return (
    <EmployeeLayout>
      <div className="container py-4">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">My Leave History</h3>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>

                <p className="mt-3">Loading leave history...</p>
              </div>
            ) : leaves.length === 0 ? (
              <div className="alert alert-info">
                No leave applications found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Leave Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Applied On</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>
                        <td>{leave.leave_type}</td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <span className={getBadge(leave.status)}>
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          {leave.applied_at
                            ? new Date(
                                leave.applied_at
                              ).toLocaleDateString()
                            : "-"}
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