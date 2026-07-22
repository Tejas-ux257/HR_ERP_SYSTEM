import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(username.trim(), password);

      // Handle different potential response payloads gracefully
      const token = response?.token || response?.data?.token;
      const user = response?.user || response?.data?.user || response?.data;

      if (!token || !user) {
        throw new Error("Invalid response structure from server");
      }

      // Save credentials locally
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful");

      // Normalize role string for safe routing
      const userRole = (user.role || "").toString().toLowerCase();

      if (userRole === "admin" || userRole === "hr") {
        navigate("/dashboard");
      } else if (userRole === "employee") {
        navigate("/employee/dashboard");
      } else {
        alert(`Unknown user role: ${user.role || "None"}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Invalid Credentials";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
              <h4 className="fw-bold mb-0">HR ERP Login</h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    className="form-control py-2 rounded-3"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-2 rounded-3"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;