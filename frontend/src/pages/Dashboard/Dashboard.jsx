import { useEffect, useState, useCallback } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetcher supporting silent background live updates and manual sync
  const fetchDashboard = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    try {
      const response = await getDashboardSummary();
      setDashboard(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load and live polling every 10 seconds
  useEffect(() => {
    fetchDashboard();

    // Auto-refresh interval for live data updates
    const pollInterval = setInterval(() => {
      fetchDashboard(false);
    }, 10000); // 10 seconds

    return () => clearInterval(pollInterval);
  }, [fetchDashboard]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalEmployees = dashboard?.total_employees || 0;
  const todayAttendance = dashboard?.today_attendance || 0;
  const attendanceRate =
    totalEmployees > 0 ? Math.round((todayAttendance / totalEmployees) * 100) : 0;

  return (
    <div className="container-fluid py-4 px-3 px-md-4 bg-light min-vh-100">
      {/* Top Banner & Live Control Header */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
        <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h3 className="fw-bold text-dark mb-0">Admin Control Center</h3>
              <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 small d-inline-flex align-items-center gap-1">
                <span
                  className="spinner-grow spinner-grow-sm text-success"
                  style={{ width: "0.5rem", height: "0.5rem" }}
                  role="status"
                ></span>
                Live Updates Active
              </span>
            </div>
            <p className="text-muted small mb-0">
              Real-time snapshot of workforce metrics, leave requests, and payroll execution.
            </p>
          </div>

          <div className="d-flex align-items-center gap-3">
            {lastUpdated && (
              <span className="text-muted small">
                Updated: <strong>{lastUpdated}</strong>
              </span>
            )}
            <button
              className="btn btn-primary border-0 btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm fw-medium"
              onClick={() => fetchDashboard(true)}
              disabled={isRefreshing}
            >
              <i className={`bi bi-arrow-clockwise ${isRefreshing ? "spin-icon" : ""}`}></i>
              <span>{isRefreshing ? "Syncing..." : "Sync Data"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="row g-4 mb-4">
        {/* Total Employees */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 p-3 bg-primary-subtle text-primary">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
                <span className="badge bg-light text-secondary border rounded-pill">Active</span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Total Employees
              </p>
              <h2 className="fw-bold text-dark mb-0">
                {totalEmployees.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Departments */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div
                  className="rounded-3 p-3"
                  style={{ backgroundColor: "#e0e7ff", color: "#4f46e5" }}
                >
                  <i className="bi bi-diagram-3-fill fs-4"></i>
                </div>
                <span className="badge bg-light text-secondary border rounded-pill">
                  Organization
                </span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Total Departments
              </p>
              <h2 className="fw-bold text-dark mb-0">
                {(dashboard?.total_departments || 0).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 p-3 bg-success-subtle text-success">
                  <i className="bi bi-calendar-check-fill fs-4"></i>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill fw-semibold">
                  {attendanceRate}% Present
                </span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Today's Attendance
              </p>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <h2 className="fw-bold text-dark mb-0">
                  {todayAttendance.toLocaleString()}
                </h2>
                <span className="text-muted small">/ {totalEmployees}</span>
              </div>
              {/* Visual Progress Bar */}
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Leaves */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 p-3 bg-danger-subtle text-danger">
                  <i className="bi bi-hourglass-split fs-4"></i>
                </div>
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill">
                  Action Required
                </span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Pending Leaves
              </p>
              <h2 className="fw-bold text-dark mb-0">
                {(dashboard?.pending_leaves || 0).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Approved Leaves */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 p-3 bg-info-subtle text-info">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <span className="badge bg-light text-secondary border rounded-pill">
                  Processed
                </span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Approved Leaves
              </p>
              <h2 className="fw-bold text-dark mb-0">
                {(dashboard?.approved_leaves || 0).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Payroll Records */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 p-3 bg-dark-subtle text-dark">
                  <i className="bi bi-wallet2 fs-4"></i>
                </div>
                <span className="badge bg-light text-secondary border rounded-pill">
                  Finance
                </span>
              </div>
              <p className="text-muted small fw-semibold text-uppercase tracking-wider mb-1">
                Payroll Records
              </p>
              <h2 className="fw-bold text-dark mb-0">
                {(dashboard?.total_payroll_records || 0).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;