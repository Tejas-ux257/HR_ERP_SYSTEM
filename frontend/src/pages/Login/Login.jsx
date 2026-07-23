import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { getProfile } from "../../Employee/Services/profileService";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] =useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await loginUser(
        username.trim(),
        password
      );

      const token =
        response?.token ||
        response?.data?.token;

      const loginUserData =
        response?.user ||
        response?.data?.user;

      if (!token || !loginUserData) {
        throw new Error("Invalid login response");
      }

      // Save Token
      localStorage.setItem("token", token);

      // Fetch latest profile
      const profileResponse = await getProfile();

      const profile =
        profileResponse?.data ||
        profileResponse;

      const completeUser = {
        ...profile,
        username: loginUserData.username,
        role: loginUserData.role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(completeUser)
      );

      window.dispatchEvent(
        new Event("userProfileUpdated")
      );

      alert("Login Successful");

      const role = completeUser.role.toLowerCase();

      if (role === "admin" || role === "hr") {

        navigate("/dashboard");

      } else if (role === "employee") {

        navigate("/employee/dashboard");

      } else {

        alert("Unknown role");

      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );

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
              <h4 className="fw-bold mb-0">
                HR ERP Login
              </h4>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleLogin}>

                <div className="mb-3">

                  <label className="form-label fw-semibold small text-muted">
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control py-2 rounded-3"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
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
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />

                </div>

                <button
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