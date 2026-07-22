import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profileService";

import LoadingSpinner from "../../components/Common/LoadingSpinner";
import EditProfileModal from "../../components/Profile/EditProfileModal";
import ChangePasswordModal from "../../components/Profile/ChangePasswordModal";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Helper to extract nested response data
  const extractProfileData = (res) => {
    if (!res) return null;
    if (res.data && res.data.data) return res.data.data;
    if (res.data && res.data.user) return res.data.user;
    if (res.data && res.data.profile) return res.data.profile;
    if (res.data) return res.data;
    return res;
  };

  const loadProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      const data = extractProfileData(response);
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Could not load latest profile details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleUpdateProfile = async (formData) => {
    try {
      // 1. Send dual-mapped keys to accommodate whatever format the backend expects
      const payload = {
        ...formData,
        phone: formData.phone,
        phone_number: formData.phone,
        mobile: formData.phone,
        dob: formData.dob,
        date_of_birth: formData.dob,
        dateOfBirth: formData.dob,
      };

      const response = await updateProfile(payload);
      const updatedBackendData = extractProfileData(response);

      toast.success("Profile updated successfully!");

      const currentUser = JSON.parse(localStorage.getItem("user")) || {};

      // 2. Build complete merged profile object
      const mergedProfile = {
        ...currentUser,
        ...profile,
        ...(updatedBackendData || {}),
        name: formData.name || profile?.name || currentUser?.name,
        email: formData.email || profile?.email || currentUser?.email,
        phone: formData.phone || profile?.phone || profile?.phone_number || currentUser?.phone,
        phone_number: formData.phone,
        address: formData.address || profile?.address || currentUser?.address,
        gender: formData.gender || profile?.gender || currentUser?.gender,
        dob: formData.dob || profile?.dob || profile?.date_of_birth || currentUser?.dob,
        date_of_birth: formData.dob,
      };

      // 3. Save merged data to localStorage
      localStorage.setItem("user", JSON.stringify(mergedProfile));

      // 4. Update React state immediately
      setProfile(mergedProfile);

      setShowEditModal(false);

      // 5. Re-fetch from server to ensure state alignment
      await loadProfile();
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile."
      );
    }
  };

  const handleChangePassword = async (data) => {
    try {
      await changePassword(data);
      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Change password error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading profile settings..." />;
  }

  // Robust field extraction supporting all camelCase and snake_case backend variants
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const activeName =
    profile?.name ||
    profile?.username ||
    profile?.fullName ||
    storedUser?.name ||
    "Tejas Kumar D";

  const activeEmail =
    profile?.email ||
    profile?.user?.email ||
    storedUser?.email ||
    "N/A";

  const activePhone =
    profile?.phone ||
    profile?.phone_number ||
    profile?.phoneNumber ||
    profile?.mobile ||
    storedUser?.phone ||
    storedUser?.phone_number ||
    "N/A";

  const activeRole =
    profile?.role ||
    profile?.designation ||
    storedUser?.role ||
    "Admin";

  const activeDept =
    profile?.department?.name ||
    profile?.department ||
    profile?.dept ||
    storedUser?.department ||
    "Administration";

  const activeAddress =
    profile?.address ||
    storedUser?.address ||
    "N/A";

  const activeGender =
    profile?.gender ||
    storedUser?.gender ||
    "N/A";

  const rawDob =
    profile?.dob ||
    profile?.date_of_birth ||
    profile?.dateOfBirth ||
    storedUser?.dob ||
    storedUser?.date_of_birth;

  const activeDob = rawDob ? String(rawDob).split("T")[0] : "N/A";

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100%" }}>
      <div className="container-fluid px-0">
        {/* Header Title */}
        <div className="mb-4">
          <span
            className="px-2.5 py-1 rounded-pill small fw-semibold"
            style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}
          >
            Account & Self-Service Settings
          </span>
          <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
            Admin Profile
          </h2>
        </div>

        {/* Profile Card Container */}
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

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary rounded-3 px-3 py-2 fw-medium btn-sm"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
              <button
                className="btn btn-primary rounded-3 px-3 py-2 fw-medium btn-sm"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details Display Grid */}
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={{
            name: activeName,
            email: activeEmail === "N/A" ? "" : activeEmail,
            phone: activePhone === "N/A" ? "" : activePhone,
            address: activeAddress === "N/A" ? "" : activeAddress,
            gender: activeGender === "N/A" ? "" : activeGender,
            dob: activeDob === "N/A" ? "" : activeDob,
          }}
          onSave={handleUpdateProfile}
        />
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          show={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSave={handleChangePassword}
        />
      )}
    </div>
  );
}