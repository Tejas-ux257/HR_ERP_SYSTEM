function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <h4 className="mb-4">Menu</h4>

            <ul className="nav flex-column">

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Dashboard
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Departments
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Employees
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Attendance
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Leave
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link text-white">
                        Payroll
                    </a>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;