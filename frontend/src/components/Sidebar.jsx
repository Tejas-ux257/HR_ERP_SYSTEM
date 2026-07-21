import { NavLink } from "react-router-dom";

function Sidebar() {
    const linkStyle = ({ isActive }) => ({
        color: "#fff",
        textDecoration: "none",
        padding: "10px 15px",
        display: "block",
        borderRadius: "5px",
        marginBottom: "5px",
        backgroundColor: isActive ? "#0d6efd" : "transparent",
    });

    return (
        <div
            className="bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <h4 className="mb-4">Admin Profile </h4>

            <ul className="nav flex-column">

                <li className="nav-item">
                    <NavLink to="/dashboard" style={linkStyle}>
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/departments" style={linkStyle}>
                        Departments
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/employees" style={linkStyle}>
                        Employees
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/attendance" style={linkStyle}>
                        Attendance
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/leave" style={linkStyle}>
                        Leave
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/payroll" style={linkStyle}>
                        Payroll
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;