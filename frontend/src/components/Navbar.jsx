import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <nav className="navbar navbar-dark bg-primary px-4">

            <span className="navbar-brand">
                HR ERP System
            </span>

            <div className="d-flex align-items-center">

                <span className="text-white me-3">
                    Welcome, {user?.username}
                </span>

                <span className="badge bg-light text-dark me-3">
                    {user?.role}
                </span>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;