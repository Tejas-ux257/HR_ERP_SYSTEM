import { useState } from "react";
import { toast } from "react-toastify";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { applyLeave } from "../Services/employeeLeaveService";

function EmployeeApplyLeave() {
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await applyLeave(formData);

      toast.success("Leave applied successfully");

      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply leave"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4>Apply Leave</h4>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Leave Type</label>

                <select
                  className="form-select"
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleChange}
                  required
                >  
                  <option value="">Select Leave Type</option>
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Earned">Earned</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Start Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>End Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Reason</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply Leave"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeApplyLeave;