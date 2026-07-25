import { useEffect, useState } from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { getProfile } from "../Services/profileService";
import {
  FaClock,
  FaCalendarCheck,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaUserCheck,
} from "react-icons/fa";

export default function EmployeeDashboard() {
  // Load from localStorage first
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch latest profile from backend
  const loadUserData = async () => {
    try {
      const response = await getProfile();

      const profile = response?.data ?? response;

      if (!profile) return;

      const existingUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...existingUser,
        ...profile,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(() => {
    // Show stored data immediately
    const storedUser =
      JSON.parse(localStorage.getItem("user")) || {};

    setUser(storedUser);

    // Fetch latest profile
    loadUserData();

    // Live Clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Listen for profile updates
    const handleProfileUpdate = () => {
      loadUserData();
    };

    window.addEventListener(
      "userProfileUpdated",
      handleProfileUpdate
    );

    return () => {
      clearInterval(timer);

      window.removeEventListener(
        "userProfileUpdated",
        handleProfileUpdate
      );
    };
  }, []);

  const userName =
    user.name ||
    user.fullName ||
    user.full_name ||
    user.username ||
    "Employee";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-sm border">
          <div>
            <h2 className="fw-bold text-dark">
              Welcome back, {userName}! 👋
            </h2>

            <p className="text-muted mb-0">
              Here is your live daily status and attendance activity log.
            </p>
          </div>

          <div className="text-end">
            <span className="badge bg-primary fs-6">
              <FaClock className="me-2" />
              {currentTime.toLocaleTimeString()}
            </span>

            <div className="small text-muted mt-2">
              {currentTime.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-3">

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    Today's Status
                  </small>

                  <h5 className="fw-bold text-success">
                    Present
                  </h5>
                </div>

                <FaCalendarCheck
                  className="text-success"
                  size={30}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    Leave Balance
                  </small>

                  <h5 className="fw-bold">
                    12 Days
                  </h5>
                </div>

                <FaClipboardList
                  className="text-primary"
                  size={30}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    Shift Hours
                  </small>

                  <h5 className="fw-bold">
                    09:00 - 18:00
                  </h5>
                </div>

                <FaClock
                  className="text-warning"
                  size={30}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    Latest Slip
                  </small>

                  <h5 className="fw-bold">
                    Generated
                  </h5>
                </div>

                <FaFileInvoiceDollar
                  className="text-info"
                  size={30}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Activity */}
        <div className="card shadow-sm rounded-4 mt-4 border-0">
          <div className="card-body">

            <h5 className="fw-bold mb-3">
              Live Activity
            </h5>

            <div className="d-flex align-items-center mb-3">
              <FaUserCheck
                className="text-success me-3"
              />

              <div>
                <strong>
                  Profile Synchronised
                </strong>

                <div className="text-muted">
                  Employee : {userName}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaCalendarCheck
                className="text-primary me-3"
              />

              <div>
                <strong>
                  Login Activity
                </strong>

                <div className="text-muted">
                  Successfully authenticated.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </EmployeeLayout>
  );
}