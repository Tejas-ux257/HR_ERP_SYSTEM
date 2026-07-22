import { NavLink, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaUser,
  FaCalendarCheck,
  FaCalendarPlus,
  FaListAlt,
  FaMoneyCheckAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function EmployeeSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { path: "/employee/dashboard", name: "Dashboard", icon: <FaThLarge /> },
    { path: "/employee/profile", name: "My Profile", icon: <FaUser /> },
    { path: "/employee/attendance", name: "Attendance", icon: <FaCalendarCheck /> },
    { path: "/employee/apply-leave", name: "Apply Leave", icon: <FaCalendarPlus /> },
    { path: "/employee/my-leaves", name: "My Leaves", icon: <FaListAlt /> },
    { path: "/employee/my-payroll", name: "My Payroll", icon: <FaMoneyCheckAlt /> },
  ];

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3 min-vh-100"
      style={{ width: "250px", flexShrink: 0 }}
    >
      {/* Portal Branding */}
      <div className="d-flex align-items-center mb-4 px-2 pt-2">
        <h5 className="fw-bold mb-0 text-white" style={{ letterSpacing: "0.5px" }}>
          Employee Portal
        </h5>
      </div>

      <hr className="text-secondary mt-0 mb-3" />

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto gap-1">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium text-white-50 ${
                  isActive ? "bg-primary text-white active fw-semibold" : "hover-bg-secondary"
                }`
              }
            >
              <span className="fs-5">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <hr className="text-secondary my-3" />

      {/* Logout Action */}
      <button
        onClick={handleLogout}
        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 fw-semibold"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
}