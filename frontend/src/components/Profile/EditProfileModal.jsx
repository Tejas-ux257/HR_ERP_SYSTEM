import { useEffect, useState } from "react";

export default function EditProfileModal({ show, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Sync state when modal receives new profile props or opens
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone === "N/A" ? "" : profile.phone || "",
        address: profile.address === "N/A" ? "" : profile.address || "",
        gender: profile.gender === "N/A" ? "" : profile.gender || "",
        dob: profile.dob ? profile.dob.split("T")[0] : "",
      });
    }
  }, [profile]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 border-0 shadow">
          {/* Header */}
          <div className="modal-header border-bottom p-4">
            <h5 className="modal-title fw-bold text-dark">Edit Profile Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={submitting}
            ></button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              className="modal-body p-4"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3 py-2"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3 py-2"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-3 py-2"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Gender
                  </label>
                  <select
                    className="form-select rounded-3 py-2"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control rounded-3 py-2"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">
                    Address
                  </label>
                  <textarea
                    className="form-control rounded-3"
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter residential/office address"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-footer border-top p-3 bg-light rounded-bottom-4">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-3 px-4"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}