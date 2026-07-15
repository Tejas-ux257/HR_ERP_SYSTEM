function EmployeeTable({ employees }) {

    return (

        <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Code</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {employees.length === 0 ? (

                    <tr>

                        <td colSpan="7" className="text-center">
                            No Employees Found
                        </td>

                    </tr>

                ) : (

                    employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>

                            <td>{employee.name}</td>

                            <td>{employee.email}</td>

                            <td>{employee.phone}</td>

                            <td>{employee.department_name}</td>

                            <td>{employee.department_code}</td>

                            <td>

                                <button className="btn btn-warning btn-sm me-2">
                                    Edit
                                </button>

                                <button className="btn btn-danger btn-sm">
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>

    );

}

export default EmployeeTable;