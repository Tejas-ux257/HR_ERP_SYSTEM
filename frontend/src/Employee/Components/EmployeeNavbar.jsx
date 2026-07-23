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
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 py-3">
      <div className="container-fluid">

        <h4 className="fw-bold mb-0 text-primary">
          HR ERP System
        </h4>

        <div className="ms-auto d-flex align-items-center gap-3">

          <span className="text-muted">
            Welcome, <strong>{userName}</strong>
          </span>

          <span className="badge bg-primary">
            {role}
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}