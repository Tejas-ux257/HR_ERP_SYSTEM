import { useState } from "react";

export default function ChangePasswordModal({
    show,
    onClose,
    onSave,
}) {

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(formData);

        setFormData({
            current_password: "",
            new_password: "",
        });
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal d-block" tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Change Password</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>Current Password</label>

                                <input
                                    type="password"
                                    name="current_password"
                                    className="form-control"
                                    value={formData.current_password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>New Password</label>

                                <input
                                    type="password"
                                    name="new_password"
                                    className="form-control"
                                    value={formData.new_password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-warning"
                            >
                                Change Password
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}