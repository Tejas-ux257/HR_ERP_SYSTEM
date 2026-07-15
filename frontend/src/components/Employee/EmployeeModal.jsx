import EmployeeForm from "./EmployeeForm";

function EmployeeModal({
    show,
    onClose,
    employee,
    refreshEmployees,
}) {

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {employee
                                ? "Edit Employee"
                                : "Add Employee"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <EmployeeForm
                            employee={employee}
                            onClose={onClose}
                            refreshEmployees={refreshEmployees}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeModal;