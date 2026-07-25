import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        employee_id: Number(formData.employee_id),
        username: formData.username.trim(),
        password: formData.password,
        role: "Employee",
      });

      setSuccessMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed. Please check your details.");
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
          <div className="col-lg-5 bg-success bg-gradient text-white p-4 p-md-5 d-flex flex-column justify-content-between position-relative">
            <div>
              <div className="d-flex align-items-center gap-2 mb-4">
                <div
                  className="bg-white text-success rounded-3 p-2 fw-bold fs-4 d-inline-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px" }}
                >
                  HR
                </div>
                <h4 className="fw-bold mb-0 text-white">Workforce Hub</h4>
              </div>

              <h2 className="fw-bold text-white mb-3">
                Join the Team Today
              </h2>
              <p className="text-white-50 small mb-4">
                Set up your official employee account to access attendance portals, leaves, and salary slips.
              </p>
            </div>

            {/* Steps Highlight */}
            <div className="d-flex flex-column gap-3 my-4">
              <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-3">
                <i className="bi bi-person-badge fs-4"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Employee Verification</h6>
                  <small className="text-white-50">Link with your official Employee ID</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-3">
                <i className="bi bi-shield-check fs-4"></i>
                <div>
                  <h6 className="mb-0 fw-semibold">Secure Credentials</h6>
                  <small className="text-white-50">Create your private login details</small>
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
              <h3 className="fw-bold text-dark mb-1">Employee Registration</h3>
              <p className="text-muted small">
                Fill in your details below to create your HR ERP portal account
              </p>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show rounded-3 p-3 mb-3 small" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrorMessage("")}
                ></button>
              </div>
            )}

            {/* Success Notification Alert */}
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show rounded-3 p-3 mb-3 small" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMessage}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">
                  Employee ID
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-badge-ad"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control bg-light border-start-0 ps-0"
                    name="employee_id"
                    placeholder="e.g. 1001"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
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
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-light border border-start-0 text-muted"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-semibold">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-shield-lock"></i>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control bg-light border-start-0 border-end-0 ps-0"
                      name="confirmPassword"
                      placeholder="Confirm"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-light border border-start-0 text-muted"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? "-slash" : ""}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 py-2.5 rounded-3 fw-semibold shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </span>
                ) : (
                  <span>Complete Registration</span>
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted small mb-2">Already have an account?</p>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm px-4 rounded-pill fw-semibold"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;