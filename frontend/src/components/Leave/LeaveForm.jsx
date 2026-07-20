import { useState } from "react";
import { toast } from "react-toastify";
import { applyLeave } from "../../services/leaveService";

const LeaveForm = ({ onSaved, onClose }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        employee_id: user?.employee_id || "",
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
    });
const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await applyLeave(formData);

        toast.success("Leave applied successfully.");

        onSaved();

        onClose();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Failed to apply leave."
        );
    }
};
return (
    <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <label className="form-label">
                Leave Type
            </label>

            <select
                className="form-select"
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
                required
            >
                <option value="">
                    Select Leave Type
                </option>

                <option value="Casual">
                    Casual
                </option>

                <option value="Sick">
                    Sick
                </option>

                <option value="Earned">
                    Earned
                </option>
            </select>
        </div>

        <div className="mb-3">
            <label className="form-label">
                Start Date
            </label>

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
            <label className="form-label">
                End Date
            </label>

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
            <label className="form-label">
                Reason
            </label>

            <textarea
                className="form-control"
                rows="3"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
            />
        </div>

        <button
            type="submit"
            className="btn btn-primary w-100"
        >
            Apply Leave
        </button>

    </form>
);

};

export default LeaveForm;
