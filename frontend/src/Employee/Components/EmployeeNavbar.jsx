import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeNavbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || {});
    };

    window.addEventListener("userProfileUpdated", updateUser);

    return () => {
      window.removeEventListener("userProfileUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userName = user.name || user.username || "Employee";
  const role = user.role || "Employee";

  return (
    <nav className="navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        <span className="fs-5 fw-bold text-dark">
          HR ERP System
        </span>

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small">
            Welcome, <strong>{userName}</strong>
          </span>

          <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-3 py-1 fw-semibold">
            {role}
          </span>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm rounded-3 px-3 py-1 fw-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}