import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { getMyAttendance } from "../services/employeeAttendanceService";

const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const data = await getMyAttendance();
      // Handle nested response structures gracefully if needed
      const records = Array.isArray(data) ? data : data?.data || data?.attendance || [];
      setAttendance(records);
    } catch (error) {
      console.error("Attendance fetch error:", error);
      toast.error(error.message || "Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h6 className="fw-semibold text-muted">Loading attendance records...</h6>
      </div>
    );
  }

  // Calculate quick overview metrics
  const totalDays = attendance.length;
  const presentDays = attendance.filter(
    (item) => item.status && item.status.toLowerCase() === "present"
  ).length;

  return (
    <div className="container-fluid px-0">
      {/* Header Title */}
      <div className="mb-4">
        <span
          className="px-2.5 py-1 rounded-pill small fw-semibold"
          style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
        >
          Time & Attendance
        </span>
        <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
          My Attendance Logs
        </h2>
      </div>

      {/* Summary Stats Grid */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Total Days Recorded</span>
                <h3 className="fw-bold text-dark mt-2 mb-0">{totalDays}</h3>
              </div>
              <div className="bg-primary-subtle text-primary p-3 rounded-circle">
                <FaCalendarAlt className="fs-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Days Present</span>
                <h3 className="fw-bold text-success mt-2 mb-0">{presentDays}</h3>
              </div>
              <div className="bg-success-subtle text-success p-3 rounded-circle">
                <FaCheckCircle className="fs-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History Table Card */}
      <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            <FaClock className="text-primary" /> Recent Logs
          </h5>
          <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
            {attendance.length} Total Entries
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="fw-semibold text-muted small text-uppercase py-3">Date</th>
                <th className="fw-semibold text-muted small text-uppercase py-3">Check In</th>
                <th className="fw-semibold text-muted small text-uppercase py-3">Check Out</th>
                <th className="fw-semibold text-muted small text-uppercase py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((item, index) => {
                  const rawStatus = (item.status || "Absent").toLowerCase();
                  const isPresent = rawStatus === "present";

                  return (
                    <tr key={item.id || item._id || index}>
                      <td className="fw-medium text-dark py-3">
                        {item.attendance_date ? String(item.attendance_date).split("T")[0] : "N/A"}
                      </td>
                      <td className="text-secondary">{item.check_in || "--:--"}</td>
                      <td className="text-secondary">{item.check_out || "--:--"}</td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-1.5 fw-semibold ${
                            isPresent
                              ? "bg-success-subtle text-success border border-success-subtle"
                              : "bg-danger-subtle text-danger border border-danger-subtle"
                          }`}
                        >
                          {item.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    <FaExclamationCircle className="fs-3 mb-2 d-block mx-auto text-secondary" />
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;