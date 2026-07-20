const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const EmployeeLeaveTable = ({ leaves, onOpenModal }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">My Leave History</h5>

                <button
                    className="btn btn-primary"
                    onClick={onOpenModal}
                >
                    Apply Leave
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaves.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No leave records found.
                                </td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.id}</td>
                                    <td>{leave.leave_type}</td>
                                    <td>{formatDate(leave.start_date)}</td>
                                    <td>{formatDate(leave.end_date)}</td>

                                    <td>
                                        {leave.status === "Approved" && (
                                            <span className="badge bg-success">
                                                Approved
                                            </span>
                                        )}

                                        {leave.status === "Rejected" && (
                                            <span className="badge bg-danger">
                                                Rejected
                                            </span>
                                        )}

                                        {leave.status === "Pending" && (
                                            <span className="badge bg-warning text-dark">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeLeaveTable;