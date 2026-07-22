import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaRedoAlt,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { getMyAttendance } from "../Services/employeeAttendanceService";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAttendance = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);

      const data = await getMyAttendance();
      const records = Array.isArray(data)
        ? data
        : data?.data || data?.attendance || [];

      setAttendance(records);
    } catch (error) {
      console.error("Attendance fetch error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch attendance records"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const cleanStr = String(dateStr).split("T")[0];
    const dateObj = new Date(cleanStr);
    if (isNaN(dateObj.getTime())) return cleanStr;
    return dateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (statusStr) => {
    const status = (statusStr || "Absent").trim().toLowerCase();

    if (status === "present") {
      return (
        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold">
          Present
        </span>
      );
    }
    if (status === "half day" || status === "late") {
      return (
        <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3 py-2 fw-semibold text-capitalize">
          {statusStr}
        </span>
      );
    }
    return (
      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2 fw-semibold">
        {statusStr || "Absent"}
      </span>
    );
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="container-fluid py-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <h6 className="fw-semibold text-muted">Loading attendance records...</h6>
        </div>
      </EmployeeLayout>
    );
  }

  const totalDays = attendance.length;
  const presentDays = attendance.filter(
    (item) => (item.status || "").toLowerCase() === "present"
  ).length;
  const absentDays = totalDays - presentDays;

  return (
    <EmployeeLayout>
      <div className="container-fluid px-3 py-3">
        {/* Header Bar */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "40px", height: "40px" }}
              title="Go Back"
            >
              <FaArrowLeft />
            </button>
            <div>
              <span
                className="px-2.5 py-1 rounded-pill small fw-semibold"
                style={{
                  backgroundColor: "#e2e8f0",
                  color: "#475569",
                  fontSize: "12px",
                }}
              >
                Time & Attendance
              </span>
              <h2
                className="fw-bold text-dark mt-1 mb-0"
                style={{ letterSpacing: "-0.5px" }}
              >
                My Attendance Logs
              </h2>
            </div>
          </div>

          <button
            onClick={() => fetchAttendance(true)}
            disabled={refreshing}
            className="btn btn-light bg-white border shadow-sm rounded-3 d-flex align-items-center gap-2 px-3 py-2 fw-semibold text-secondary"
          >
            <FaRedoAlt className={refreshing ? "spin-icon" : ""} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">
                    Total Logged
                  </span>
                  <h3 className="fw-bold text-dark mt-1 mb-0">{totalDays} Days</h3>
                </div>
                <div
                  className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <FaCalendarAlt size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">
                    Days Present
                  </span>
                  <h3 className="fw-bold text-success mt-1 mb-0">
                    {presentDays} Days
                  </h3>
                </div>
                <div
                  className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <FaCheckCircle size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">
                    Absent / Leaves
                  </span>
                  <h3 className="fw-bold text-danger mt-1 mb-0">
                    {absentDays} Days
                  </h3>
                </div>
                <div
                  className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <FaTimesCircle size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <FaClock className="text-primary" />
              Recent Logs
            </h5>

            <span className="badge bg-light text-secondary border rounded-pill px-3 py-2 fw-medium">
              {attendance.length} Total Records
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="fw-semibold text-muted small text-uppercase py-3">
                    Date
                  </th>
                  <th className="fw-semibold text-muted small text-uppercase py-3">
                    Check In
                  </th>
                  <th className="fw-semibold text-muted small text-uppercase py-3">
                    Check Out
                  </th>
                  <th className="fw-semibold text-muted small text-uppercase py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item, index) => (
                    <tr key={item.id || item._id || index}>
                      <td className="fw-medium text-dark py-3">
                        {formatDate(item.attendance_date)}
                      </td>

                      <td className="text-secondary fw-normal">
                        {item.check_in || "--:--"}
                      </td>

                      <td className="text-secondary fw-normal">
                        {item.check_out || "--:--"}
                      </td>

                      <td>{getStatusBadge(item.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <FaExclamationCircle
                        size={32}
                        className="text-secondary opacity-50 mb-2"
                      />
                      <p className="text-muted fw-medium mb-0">
                        No attendance records found.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeAttendance;