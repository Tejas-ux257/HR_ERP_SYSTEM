function EmployeeTable({
    employees,
    onEdit,
    onDelete,
}) {

    if (employees.length === 0) {

        return (

            <div className="alert alert-info text-center">

                No Employees Found

            </div>

        );

    }

    return (

        <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Department Code</th>
                    <th width="170">Actions</th>

                </tr>

            </thead>

            <tbody>

                {employees.map((employee) => (

                    <tr key={employee.id}>

                        <td>{employee.id}</td>

                        <td>{employee.name}</td>

                        <td>{employee.email}</td>

                        <td>{employee.phone}</td>

                        <td>{employee.department_name}</td>

                        <td>{employee.department_code}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => onEdit(employee)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(employee)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default EmployeeTable;