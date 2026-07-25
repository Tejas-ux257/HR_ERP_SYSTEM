import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { getProfile } from "../../Employee/Services/profileService";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErrorMessage("");

    try {
      setLoading(true);

      const response = await loginUser(username.trim(), password);

      const token = response.token;
      const loginUserData = response.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loginUserData));

      // Employee Profile Fetch
      if (loginUserData.role === "Employee") {
        try {
          const profileResponse = await getProfile();
          const profile = profileResponse.data;

          const completeUser = {
            ...loginUserData,
            ...profile,
          };

          localStorage.setItem("user", JSON.stringify(completeUser));
        } catch (err) {
          console.error("Profile Fetch Error:", err);
        }
      }

      window.dispatchEvent(new Event("userProfileUpdated"));

      // Role-based Navigation
      switch (loginUserData.role.toLowerCase()) {
        case "admin":
        case "hr":
          navigate("/dashboard");
          break;

        case "employee":
          navigate("/employee/dashboard");
          break;

        default:
          setErrorMessage("Invalid user role assigned.");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4 px-3">
      <div
        className="card border-0 shadow-lg overflow-hidden rounded-4 w-100"
        style={{ maxWidth: "920px" }}
      >
        <div className="row g-0">
          {/* Left Decorative Branding Panel */}
          <div className="col-lg-5 bg-primary bg-gradient text-white p-4 p-md-5 d-flex flex-column justify-content-between position-relative">
            <div>
              <div className="d-flex align-items-center gap-2 mb-4">
                {/* Dynamically sized badge for full system name */}
                <div
                  className="bg-white text-primary rounded-3 px-3 py-2 fw-bold fs-6 d-inline-flex align-items-center justify-content-center shadow-sm"
                  style={{ letterSpacing: "0.5px" }}
                >
                  HR ERP SYSTEM
                </div>
              </div>

              <h2 className="fw-bold text-white mb-3">
                Streamline Your HR Operations
              </h2>
              <p className="text-white-50 small mb-4">
                Access your personalized portal for attendance tracking, payroll
                management, and leave requests.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="d-flex flex-column gap-3 my-4">
              <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-3">
                <i className="bi bi-clock-history fs-4"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Real-Time Attendance</h6>
                  <small className="text-white-50">
                    Track check-ins effortlessly
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-3">
                <i className="bi bi-wallet2 fs-4"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Payroll & Payslips</h6>
                  <small className="text-white-50">
                    View and download salary slips
                  </small>
                </div>
              </div>
            </div>

            <div className="pt-3 border-top border-white border-opacity-10 text-white-50 small">
              © {new Date().getFullYear()} HR ERP System. All rights reserved.
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="col-lg-7 bg-white p-4 p-md-5 d-flex flex-column justify-content-center">
            <div className="mb-4">
              <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
              <p className="text-muted small">
                Select your account type and log in to continue
              </p>
            </div>

            {/* Role Toggle Switch */}
            <div className="bg-light p-1 rounded-3 d-flex gap-1 mb-4">
              <button
                type="button"
                className={`btn btn-sm w-50 rounded-2 fw-semibold transition-all ${
                  loginType === "employee"
                    ? "btn-white bg-white text-primary shadow-sm"
                    : "btn-light text-muted border-0"
                }`}
                onClick={() => setLoginType("employee")}
              >
                <i className="bi bi-person-fill me-1"></i> Employee
              </button>

              <button
                type="button"
                className={`btn btn-sm w-50 rounded-2 fw-semibold transition-all ${
                  loginType === "admin"
                    ? "btn-white bg-white text-dark shadow-sm"
                    : "btn-light text-muted border-0"
                }`}
                onClick={() => setLoginType("admin")}
              >
                <i className="bi bi-shield-lock-fill me-1"></i> Admin / HR
              </button>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div
                className="alert alert-danger alert-dismissible fade show rounded-3 p-3 mb-3 small"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrorMessage("")}
                ></button>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">
                  Username
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light border-start-0 border-end-0 ps-0"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-light border border-start-0 text-muted"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                    ></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`btn w-100 py-2.5 rounded-3 fw-semibold shadow-sm ${
                  loginType === "employee" ? "btn-primary" : "btn-dark"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Authenticating...
                  </span>
                ) : (
                  <span>
                    Sign In as{" "}
                    {loginType === "employee" ? "Employee" : "Admin / HR"}
                  </span>
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted small mb-2">Don't have an account yet?</p>
              <button
                type="button"
                className="btn btn-outline-success btn-sm px-4 rounded-pill fw-semibold"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;