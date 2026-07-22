import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import EmployeeLayout from "../layouts/EmployeeLayout";
import { getProfile, updateProfile } from "../../services/profileService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  // Comprehensive extraction helper to handle any backend data structure
  const extractProfileData = (res) => {
    if (!res) return null;
    let data = res;
    if (res.data) data = res.data;
    if (data.data) data = data.data;
    if (data.user) data = data.user;
    if (data.profile) data = data.profile;
    if (data.employee) data = data.employee;

    if (typeof data !== "object") return null;

    // Standardize object keys so active fields never return N/A
    return {
      ...data,
      name: data.name || data.fullName || data.full_name || data.username || "",
      email: data.email || data.emailAddress || data.email_address || "",
      phone: data.phone || data.phone_number || data.phoneNumber || data.mobile || "",
      address: data.address || "",
      gender: data.gender || "",
      dob: data.dob || data.date_of_birth || data.dateOfBirth || "",
      role: data.role || data.designation || "Employee",
      department: data.department?.name || data.department_name || data.department || "",
    };
  };

  const populateFormData = (data) => {
    if (!data) return;
    const rawDob = data?.dob || data?.date_of_birth || data?.dateOfBirth;
    setEditFormData({
      name: data?.name || data?.fullName || data?.full_name || "",
      email: data?.email || data?.emailAddress || data?.email_address || "",
      phone:
        data?.phone ||
        data?.phone_number ||
        data?.phoneNumber ||
        data?.mobile ||
        "",
      address: data?.address || "",
      gender: data?.gender || "",
      dob: rawDob ? String(rawDob).split("T")[0] : "",
    });
  };

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      const extracted = extractProfileData(response);

      if (extracted && (extracted.name || extracted.email)) {
        setProfile(extracted);
        populateFormData(extracted);
        localStorage.setItem("user", JSON.stringify(extracted));
      }
    } catch (error) {
      console.error("Failed to fetch employee profile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const currentUserData = profile || storedUser;

    // Create immediate updated state from form inputs
    const updatedState = {
      ...currentUserData,
      name: editFormData.name,
      full_name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
      phone_number: editFormData.phone,
      address: editFormData.address,
      gender: editFormData.gender,
      dob: editFormData.dob,
      date_of_birth: editFormData.dob,
    };

    try {
      const payload = {
        name: editFormData.name,
        full_name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        phone_number: editFormData.phone,
        address: editFormData.address,
        gender: editFormData.gender,
        dob: editFormData.dob,
        date_of_birth: editFormData.dob,
      };

      // 1. Send update request
      const res = await updateProfile(payload);
      const serverData = extractProfileData(res);

      // 2. Merge server response with updated form data
      const finalData = {
        ...updatedState,
        ...(serverData && (serverData.name || serverData.email) ? serverData : {}),
      };

      // 3. Persist to State and localStorage immediately
      setProfile(finalData);
      populateFormData(finalData);
      localStorage.setItem("user", JSON.stringify(finalData));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save profile changes."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    populateFormData(profile || storedUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <LoadingSpinner message="Loading your profile..." />
      </EmployeeLayout>
    );
  }

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
    (typeof userData?.department === "string" ? userData?.department : "N/A");

  const activeAddress = userData?.address || "N/A";
  const activeGender = userData?.gender || "N/A";

  const rawDob =
    userData?.dob || userData?.date_of_birth || userData?.dateOfBirth;
  const activeDob = rawDob ? String(rawDob).split("T")[0] : "N/A";

  return (
    <EmployeeLayout>
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
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

          {!isEditing ? (
            <button
              onClick={() => {
                populateFormData(userData);
                setIsEditing(true);
              }}
              className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
            >
              <FaEdit />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="btn btn-success d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
              >
                <FaSave />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden p-4 mb-4">
          <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3 text-uppercase"
                style={{ width: "64px", height: "64px" }}
              >
                {activeName !== "N/A" ? activeName.charAt(0) : "E"}
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

          <form onSubmit={handleSave}>
            <div className="row g-4">
              {/* Full Name */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                ) : (
                  <p className="fw-medium text-dark mb-0">{activeName}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                ) : (
                  <p className="fw-medium text-dark mb-0">{activeEmail}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="fw-medium text-dark mb-0">{activePhone}</p>
                )}
              </div>

              {/* Assigned Department */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Assigned Department
                </label>
                <p className="fw-medium text-dark mb-0">{activeDept}</p>
              </div>

              {/* Role / Designation */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Role / Designation
                </label>
                <p className="fw-medium text-dark mb-0">{activeRole}</p>
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    className="form-select"
                    value={editFormData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="fw-medium text-dark mb-0">{activeGender}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="col-md-6">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={editFormData.dob}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="fw-medium text-dark mb-0">{activeDob}</p>
                )}
              </div>

              {/* Address */}
              <div className="col-12">
                <label className="text-muted small fw-semibold text-uppercase d-block mb-1">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={editFormData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="fw-medium text-dark mb-0">{activeAddress}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </EmployeeLayout>
  );
}