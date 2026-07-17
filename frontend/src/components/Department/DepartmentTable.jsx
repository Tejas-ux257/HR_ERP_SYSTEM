function DepartmentTable({ departments, onEdit , onDelete, }) {

    if (departments.length === 0) {

        return (

            <div className="alert alert-info text-center">

                No Departments Found

            </div>

        );

    }

    return (

        <table className="table table-bordered table-hover">

            <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Department Code</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {departments.map((department) => (

                   <tr   key={department.department_id}>
                         <td>{department.department_id}</td>
                        <td>{department.department_name}</td>
                        <td>{department.department_code}</td>
                       
                        <td>
                           <button
                                    className="btn btn-warning btn-sm me-2"
                                     onClick={() => onEdit(department)}
                            >     
                                     Edit
                            </button>
                            <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                    console.log("Department Object:", department);
                                    onDelete(department);
    }}
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

export default DepartmentTable;