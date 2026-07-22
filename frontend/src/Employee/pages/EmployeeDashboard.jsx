import { useEffect, useState, useCallback } from "react";
import EmployeeLayout from "../layouts/EmployeeLayout";
import api from "../../api/axios"; // Adjust path to axios instance if needed
import LoadingSpinner from "../../components/Common/LoadingSpinner";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    // Read from localStorage inside callback to avoid ESLint dependency warnings
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userId = storedUser.employee_id || storedUser.id;

    if (!userId) {
      setProfile(storedUser);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Try fetching specific employee profile endpoint
      let response;
      try {
        response = await api.get(`/employees/${userId}`);
      } catch {
        // Fallback endpoint if /employees/:id isn't available
        response = await api.get(`/profile`);
      }

      const data = response.data?.data || response.data || {};

      // Merge backend data with stored user info as fallback
      setProfile({ ...storedUser, ...data });
    } catch (error) {
      console.error("Error fetching employee profile:", error);
      // Fall back to localStorage data on network error
      setProfile(storedUser);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <EmployeeLayout>
        <LoadingSpinner message="Fetching profile details..." />
      </EmployeeLayout>
    );
  }

  // Safe fallback values from localStorage if state is missing
  const localUser = JSON.parse(localStorage.getItem("user")) || {};

  // Extract properties with flexible fallback options matching common backend structures
  const fullName = profile?.name || profile?.full_name || localUser.name || "N/A";
  const email = profile?.email || localUser.email || "N/A";
  const phone = profile?.phone || profile?.phone_number || profile?.mobile || "N/A";
  const department =
    profile?.department_name ||
    profile?.department?.name ||
    profile?.department ||
    "N/A";
  const role = profile?.designation || profile?.role || localUser.role || "Employee";
  const gender = profile?.gender || "N/A";
  const dob = profile?.dob || profile?.date_of_birth || "N/A";
  const address = profile?.address || "N/A";

  const firstInitial = fullName !== "N/A" ? fullName.charAt(0).toUpperCase() : "U";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span
              className="px-2.5 py-1 rounded-pill small fw-semibold"
              style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
            >
              Employee Self-Service
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-0">My Profile</h2>
          </div>
          <button className="btn btn-primary rounded-3 px-3 py-2 fw-semibold d-flex align-items-center gap-2">
            <i className="bi bi-pencil-square"></i> Edit Profile
          </button>
        </div>

        {/* Profile Details Box */}
        <div className="bg-white rounded-4 p-4 shadow-sm border-0 mb-4">
          {/* Avatar and Main Header Info */}
          <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-2"
              style={{ width: "72px", height: "72px", minWidth: "72px" }}
            >
              {firstInitial}
            </div>
            <div>
              <h3 className="fw-bold text-dark mb-1">{fullName}</h3>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1">
                  {role}
                </span>
                <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-2.5 py-1">
                  {department}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Information Fields */}
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                FULL NAME
              </label>
              <p className="fw-medium text-dark mb-0">{fullName}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                EMAIL ADDRESS
              </label>
              <p className="fw-medium text-dark mb-0">{email}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                PHONE NUMBER
              </label>
              <p className="fw-medium text-dark mb-0">{phone}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                ASSIGNED DEPARTMENT
              </label>
              <p className="fw-medium text-dark mb-0">{department}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                ROLE / DESIGNATION
              </label>
              <p className="fw-medium text-dark mb-0">{role}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                GENDER
              </label>
              <p className="fw-medium text-dark mb-0">{gender}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                DATE OF BIRTH
              </label>
              <p className="fw-medium text-dark mb-0">{dob}</p>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-muted small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "11px" }}>
                ADDRESS
              </label>
              <p className="fw-medium text-dark mb-0">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}