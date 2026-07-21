import { useEffect, useState, useCallback } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reusable fetcher for manual button clicks or sync actions
  const fetchDashboard = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setLoading(true);
    }
    try {
      console.log("2. Calling API");
      const response = await getDashboardSummary();
      console.log("3. API Response:", response);
      setDashboard(response.data);
    } catch (error) {
      console.log("4. Error:", error);
    } finally {
      console.log("5. Finally");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Direct promise resolution prevents synchronous setState calls inside effect
    getDashboardSummary()
      .then((response) => {
        if (isMounted) {
          console.log("3. API Response:", response);
          setDashboard(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log("4. Error:", error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalEmployees = dashboard?.total_employees || 0;
  const todayAttendance = dashboard?.today_attendance || 0;
  const attendanceRate =
    totalEmployees > 0 ? Math.round((todayAttendance / totalEmployees) * 100) : 0;

  return (
    <div className="container-fluid py-4 px-3 px-md-4 bg-light min-vh-100">
      {/* Top Banner & Control Header */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
        <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h3 className="fw-bold text-dark mb-0">Admin Control Center</h3>
              <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1 small">
                ● Live System
              </span>
            </div>
            <p className="text-muted small mb-0">
              Real-time snapshot of workforce metrics, leave requests, and payroll execution.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light border btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-2xs fw-medium"
              onClick={() => fetchDashboard(true)}
            >
              <i className="bi bi-arrow-clockwise"></i>
              <span>Sync Data</span>
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
              <div className="d-flex align-items-baseline gap-2">
                <h2 className="fw-bold text-dark mb-0">
                  {(dashboard?.today_attendance || 0).toLocaleString()}
                </h2>
                <span className="text-muted small">/ {totalEmployees}</span>
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