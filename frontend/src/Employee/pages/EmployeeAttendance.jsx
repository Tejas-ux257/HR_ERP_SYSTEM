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
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  getMyAttendance,
  checkIn,
  checkOut,
} from "../Services/employeeAttendanceService";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState(null);

  // Helper to format Date objects to YYYY-MM-DD local time string
  const getLocalDateString = (d = new Date()) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAttendance = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);

      const data = await getMyAttendance();
      const records = Array.isArray(data)
        ? data
        : data?.data || data?.attendance || [];

      setAttendance(records);

      // Get today's date string in local timezone format (YYYY-MM-DD)
      const todayStr = getLocalDateString(new Date());

      const todayEntry = records.find((item) => {
        const itemDateRaw = item.attendance_date || item.date;
        if (!itemDateRaw) return false;

        // Clean ISO strings or standard date strings
        const cleanItemDate = String(itemDateRaw).split("T")[0];
        return cleanItemDate === todayStr;
      });

      setTodayRecord(todayEntry || null);
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

  // Handle Check-In
  const handleCheckIn = async () => {
    setActionLoading(true);
    try {
      const res = await checkIn();
      toast.success(res?.message || "Successfully checked in!");
      await fetchAttendance(true);
    } catch (error) {
      console.error("Check-in error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to check in"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Check-Out
  const handleCheckOut = async () => {
    setActionLoading(true);
    try {
      const res = await checkOut();
      toast.success(res?.message || "Successfully checked out!");
      await fetchAttendance(true);
    } catch (error) {
      console.error("Check-out error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to check out"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const cleanStr = String(dateStr).split("T")[0];
    const [year, month, day] = cleanStr.split("-");

    // Construct local Date object to avoid UTC offset shifts
    const dateObj = new Date(year, month - 1, day);
    if (isNaN(dateObj.getTime())) return cleanStr;

    return dateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (statusStr) => {
    const status = (statusStr || "Absent").trim().toLowerCase();

    if (status === "present" || status === "checked out") {
      return (
        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold text-capitalize">
          {statusStr}
        </span>
      );
    }
    if (status === "checked in" || status === "half day" || status === "late") {
      return (
        <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3 py-2 fw-semibold text-capitalize">
          {statusStr}
        </span>
      );
    }
    return (
      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2 fw-semibold text-capitalize">
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
  const presentDays = attendance.filter((item) => {
    const st = (item.status || "").toLowerCase();
    return st === "present" || st === "checked in" || st === "checked out";
  }).length;
  const absentDays = Math.max(0, totalDays - presentDays);

  // Check-In and Check-Out field resolvers (handles both check_in and check_in_time)
  const checkInVal = todayRecord?.check_in_time || todayRecord?.check_in;
  const checkOutVal = todayRecord?.check_out_time || todayRecord?.check_out;

  const isCheckedIn =
    Boolean(checkInVal) && checkInVal !== "--:--" && checkInVal !== "-";
  const isCheckedOut =
    Boolean(checkOutVal) && checkOutVal !== "--:--" && checkOutVal !== "-";

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

        {/* Action Box */}
        <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h5 className="fw-bold text-dark mb-1">Pledge Today's Attendance</h5>
              <p className="text-muted small mb-0">
                {!isCheckedIn
                  ? "You have not checked in for today yet."
                  : isCheckedOut
                  ? "You have completed your shift for today."
                  : `Checked in at: ${checkInVal}`}
              </p>
            </div>

            <div>
              {!isCheckedIn ? (
                <button
                  onClick={handleCheckIn}
                  disabled={actionLoading}
                  className="btn btn-success px-4 py-2 rounded-3 d-flex align-items-center gap-2 fw-semibold shadow-sm"
                >
                  <FaSignInAlt />
                  <span>{actionLoading ? "Pledging Check-In..." : "Check In Now"}</span>
                </button>
              ) : !isCheckedOut ? (
                <button
                  onClick={handleCheckOut}
                  disabled={actionLoading}
                  className="btn btn-danger px-4 py-2 rounded-3 d-flex align-items-center gap-2 fw-semibold shadow-sm"
                >
                  <FaSignOutAlt />
                  <span>{actionLoading ? "Pledging Check-Out..." : "Check Out Now"}</span>
                </button>
              ) : (
                <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2 border border-success-subtle">
                  <FaCheckCircle /> Today's Shift Completed
                </span>
              )}
            </div>
          </div>
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
                        {formatDate(item.attendance_date || item.date)}
                      </td>

                      <td className="text-secondary fw-normal">
                        {item.check_in_time || item.check_in || "--:--"}
                      </td>

                      <td className="text-secondary fw-normal">
                        {item.check_out_time || item.check_out || "--:--"}
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