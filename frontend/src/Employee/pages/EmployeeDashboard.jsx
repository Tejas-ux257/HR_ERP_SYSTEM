import { useEffect, useState } from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { getProfile } from "../Services/profileService";
import { FaClock, FaCalendarCheck, FaClipboardList, FaFileInvoiceDollar, FaUserCheck } from "react-icons/fa";

export default function EmployeeDashboard() {
  const [user, setUser] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

 const loadUserData = async () => {
  try {
    const response = await getProfile();

    const profile = response?.data ?? response;

    if (!profile) return;

    setUser(profile);

    localStorage.setItem(
      "user",
      JSON.stringify(profile)
    );

    // Notify navbar/profile listeners
    window.dispatchEvent(new Event("userProfileUpdated"));

  } catch (error) {
    console.error("Failed to load profile:", error);
  }
};

  useEffect(() => {
    loadUserData();

    // Live Clock interval
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Listen for custom profile update events
    window.addEventListener("userProfileUpdated", loadUserData);

    return () => {
      clearInterval(timer);
      window.removeEventListener("userProfileUpdated", loadUserData);
    };
  }, []);

  const userName = user.name || user.fullName || user.full_name || "Employee";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">
        {/* Live Welcome Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-sm border">
          <div>
            <h2 className="fw-bold text-dark mb-1">Welcome back, {userName}! 👋</h2>
            <p className="text-muted mb-0">Here is your live daily status and attendance activity log.</p>
          </div>
          <div className="text-end">
            <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2">
              <FaClock /> {currentTime.toLocaleTimeString()}
            </span>
            <div className="text-muted small mt-1">
              {currentTime.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* Live Overview Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small d-block mb-1">Today's Status</span>
                  <h5 className="fw-bold text-success mb-0">Present</h5>
                </div>
                <div className="p-3 bg-success-subtle text-success rounded-circle">
                  <FaCalendarCheck className="fs-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small d-block mb-1">Leave Balance</span>
                  <h5 className="fw-bold text-primary mb-0">12 Days</h5>
                </div>
                <div className="p-3 bg-primary-subtle text-primary rounded-circle">
                  <FaClipboardList className="fs-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small d-block mb-1">Shift Hours</span>
                  <h5 className="fw-bold text-dark mb-0">09:00 - 18:00</h5>
                </div>
                <div className="p-3 bg-warning-subtle text-warning rounded-circle">
                  <FaClock className="fs-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small d-block mb-1">Latest Slip</span>
                  <h5 className="fw-bold text-info mb-0">Generated</h5>
                </div>
                <div className="p-3 bg-info-subtle text-info rounded-circle">
                  <FaFileInvoiceDollar className="fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-4 shadow-sm p-4 border">
          <h5 className="fw-bold text-dark mb-3">Live Status & Activity Log</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-primary-subtle text-primary rounded-circle">
                  <FaUserCheck />
                </div>
                <div>
                  <span className="fw-semibold text-dark d-block">Profile Synchronized</span>
                  <p className="text-muted small mb-0">Verified identity details for employee: <strong>{userName}</strong></p>
                </div>
              </div>
              <span className="badge bg-light text-dark border">Live</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-success-subtle text-success rounded-circle">
                  <FaCalendarCheck />
                </div>
                <div>
                  <span className="fw-semibold text-dark d-block">System Clock-In</span>
                  <p className="text-muted small mb-0">Authenticated and logged in to employee portal</p>
                </div>
              </div>
              <span className="badge bg-light text-dark border">Today</span>
            </li>
          </ul>
        </div>
      </div>
    </EmployeeLayout>
  );
}