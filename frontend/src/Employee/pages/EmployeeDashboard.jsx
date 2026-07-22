import { useEffect, useState } from "react";
import EmployeeLayout from "../layouts/EmployeeLayout";
import { FaCalendarCheck, FaHourglassHalf, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

export default function EmployeeDashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);
  }, []);

  const userName = user.name || user.username || "Employee";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">
        {/* Welcome Banner */}
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
          <h3 className="fw-bold text-dark mb-1">Welcome back, {userName}! 👋</h3>
          <p className="text-muted mb-0">Here is an overview of your workspace and self-service metrics.</p>
        </div>

        {/* Metrics Overview Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">Present Days</span>
                  <h3 className="fw-bold text-dark mt-2 mb-0">--</h3>
                </div>
                <div className="bg-primary-subtle text-primary p-3 rounded-circle">
                  <FaCalendarCheck className="fs-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">Pending Leaves</span>
                  <h3 className="fw-bold text-warning mt-2 mb-0">--</h3>
                </div>
                <div className="bg-warning-subtle text-warning p-3 rounded-circle">
                  <FaHourglassHalf className="fs-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">Approved Leaves</span>
                  <h3 className="fw-bold text-success mt-2 mb-0">--</h3>
                </div>
                <div className="bg-success-subtle text-success p-3 rounded-circle">
                  <FaCheckCircle className="fs-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-semibold text-uppercase">Net Salary</span>
                  <h3 className="fw-bold text-info mt-2 mb-0">--</h3>
                </div>
                <div className="bg-info-subtle text-info p-3 rounded-circle">
                  <FaMoneyBillWave className="fs-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Box */}
        <div className="bg-white p-4 rounded-4 shadow-sm border-0">
          <h5 className="fw-bold text-dark mb-2">Quick Navigation</h5>
          <p className="text-muted mb-0">
            Use the sidebar options to manage your personal profile, attendance history, leave applications, and payroll slips.
          </p>
        </div>
      </div>
    </EmployeeLayout>
  );
}