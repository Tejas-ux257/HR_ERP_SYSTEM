function AttendanceTable({ attendance }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {attendance.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No attendance records found.
                            </td>

                        </tr>

                    ) : (

                        attendance.map((record) => (

                            <tr key={record.id}>

                                <td>{record.id}</td>

                                <td>
                                    {record.employee_name || record.employee_id}
                                </td>

                                <td>{record.attendance_date}</td>

                                <td>
                                    {record.check_in
                                        ? new Date(record.check_in).toLocaleString()
                                        : "--"}
                                </td>

                                <td>
                                    {record.check_out
                                        ? new Date(record.check_out).toLocaleString()
                                        : "--"}
                                </td>

                                <td>

                                    <span
                                        className={`badge ${
                                            record.status === "Present"
                                                ? "bg-success"
                                                : record.status === "Absent"
                                                ? "bg-danger"
                                                : record.status === "Leave"
                                                ? "bg-warning text-dark"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {record.status}
                                    </span>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default AttendanceTable;