const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const AdminLeaveTable = ({
    leaves,
    onApprove,
    onReject,
}) => {
    const total = leaves.length;

    const pending = leaves.filter(
        (leave) => leave.status === "Pending"
    ).length;

    const approved = leaves.filter(
        (leave) => leave.status === "Approved"
    ).length;

    const rejected = leaves.filter(
        (leave) => leave.status === "Rejected"
    ).length;

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Employee Leave Requests</h5>

                <div className="d-flex gap-2 flex-wrap">
                    <span className="badge bg-primary">Total: {total}</span>
                    <span className="badge bg-warning text-dark">Pending: {pending}</span>
                    <span className="badge bg-success">Approved: {approved}</span>
                    <span className="badge bg-danger">Rejected: {rejected}</span>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaves.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center"
                                >
                                    No leave records found.
                                </td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.id}</td>
                                    <td>
                                        <div>
                                            <strong>
                                                {leave.employee_name ??
                                                    leave.employee_id}
                                            </strong>
                                        </div>

                                        <div className="text-muted small">
                                            {leave.email}
                                        </div>

                                        <div className="text-primary small">
                                            {leave.department_name}
                                        </div>
                                    </td>
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

                                    <td>
                                        {leave.status === "Pending" ? (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() =>
                                                        onApprove(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        onReject(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span>-</span>
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

export default AdminLeaveTable;