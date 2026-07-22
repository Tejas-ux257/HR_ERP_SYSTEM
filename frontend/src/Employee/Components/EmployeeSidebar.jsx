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
    {
      path: "/employee/dashboard",
      name: "Dashboard",
      icon: <FaThLarge />,
    },
    {
      path: "/employee/profile",
      name: "My Profile",
      icon: <FaUser />,
    },
    {
      path: "/employee/attendance",
      name: "My Attendance",
      icon: <FaCalendarCheck />,
    },
    {
      path: "/employee/apply-leave",
      name: "Apply Leave",
      icon: <FaCalendarPlus />,
    },
    {
      path: "/employee/my-leaves",
      name: "My Leaves",
      icon: <FaListAlt />,
    },
    {
      path: "/employee/my-payroll",
      name: "My Payroll",
      icon: <FaMoneyCheckAlt />,
    },
  ];

  return (
    <div
      className="d-flex flex-column bg-dark text-white min-vh-100 p-3"
      style={{ width: "250px", flexShrink: 0 }}
    >
      {/* Logo / Title */}
      <div className="text-center mb-4">
        <h4 className="fw-bold text-white">Employee Portal</h4>
        <small className="text-secondary">
          HR ERP Management System
        </small>
      </div>

      <hr className="text-secondary" />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-white-50"
                }`
              }
            >
              <span style={{ fontSize: "18px" }}>
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <hr className="text-secondary" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}