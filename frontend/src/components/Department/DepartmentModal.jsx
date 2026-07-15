import DepartmentForm from "./DepartmentForm";

function DepartmentModal({
    show,
    onClose,
    department,
    refreshDepartments,
}) {

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {department
                                ? "Edit Department"
                                : "Add Department"}

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <DepartmentForm
                            department={department}
                            onClose={onClose}
                            refreshDepartments={refreshDepartments}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DepartmentModal;