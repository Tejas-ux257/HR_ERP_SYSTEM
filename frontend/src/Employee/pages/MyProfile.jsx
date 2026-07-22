import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import EmployeeLayout from "../layouts/EmployeeLayout";
import { getProfile } from "../../services/profileService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractProfileData = (res) => {
    if (!res) return null;
    if (res.data && res.data.data) return res.data.data;
    if (res.data && res.data.user) return res.data.user;
    if (res.data && res.data.profile) return res.data.profile;
    if (res.data) return res.data;
    return res;
  };

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      const data = extractProfileData(response);

      if (data) {
        setProfile(data);
        // Sync fresh user data back into localStorage
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Failed to fetch employee profile:", error);
      toast.error("Could not load fresh profile details.");
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
        <LoadingSpinner message="Loading your profile..." />
      </EmployeeLayout>
    );
  }

  // Use state fetched from backend API first; fallback to current session if necessary
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userData = profile || storedUser;

  const activeName =
    userData?.name ||
    userData?.fullName ||
    userData?.full_name ||
    userData?.username ||
    "N/A";

  const activeEmail =
    userData?.email ||
    userData?.emailAddress ||
    userData?.email_address ||
    "N/A";

  const activePhone =
    userData?.phone ||
    userData?.phone_number ||
    userData?.phoneNumber ||
    userData?.mobile ||
    "N/A";

  const activeRole =
    userData?.role ||
    userData?.designation ||
    "Employee";

  const activeDept =
    userData?.department?.name ||
    userData?.department_name ||
    userData?.department ||
    "N/A";

  const activeAddress = userData?.address || "N/A";
  const activeGender = userData?.gender || "N/A";

  const rawDob =
    userData?.dob || userData?.date_of_birth || userData?.dateOfBirth;
  const activeDob = rawDob ? String(rawDob).split("T")[0] : "N/A";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">
        <div className="mb-4">
          <span
            className="px-2.5 py-1 rounded-pill small fw-semibold"
            style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
          >
            Employee Self-Service
          </span>
          <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
            My Profile
          </h2>
        </div>

        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden p-4 mb-4">
          <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3 text-uppercase"
                style={{ width: "64px", height: "64px" }}
              >
                {activeName.charAt(0)}
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-1 text-capitalize">{activeName}</h4>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill">
                    {activeRole}
                  </span>
                  <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill">
                    {activeDept}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Full Name
              </label>
              <p className="fw-medium text-dark mb-0">{activeName}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Email Address
              </label>
              <p className="fw-medium text-dark mb-0">{activeEmail}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Phone Number
              </label>
              <p className="fw-medium text-dark mb-0">{activePhone}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Assigned Department
              </label>
              <p className="fw-medium text-dark mb-0">{activeDept}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Role / Designation
              </label>
              <p className="fw-medium text-dark mb-0">{activeRole}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Gender
              </label>
              <p className="fw-medium text-dark mb-0">{activeGender}</p>
            </div>

            <div className="col-md-6">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Date of Birth
              </label>
              <p className="fw-medium text-dark mb-0">{activeDob}</p>
            </div>

            <div className="col-12">
              <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                Address
              </label>
              <p className="fw-medium text-dark mb-0">{activeAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}