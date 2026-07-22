import { useNavigate } from "react-router-dom";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.name || user.username || "Employee";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        {/* Title / Brand */}
        <span className="fs-5 fw-bold text-dark mb-0">HR ERP System</span>

        {/* User Info & Actions */}
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small">
            Welcome, <strong className="text-dark">{userName}</strong>
          </span>
          <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-3 py-1 fw-semibold">
            Employee
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