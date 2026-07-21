import PayrollForm from "./PayrollForm";

const PayrollModal = ({
    payroll,
    onClose,
    onSave
}) => {

    return (

        <>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        {/* Header */}

                        <div className="modal-header">

                            <h5 className="modal-title">

                                {
                                    payroll
                                        ? "Update Payroll"
                                        : "Generate Payroll"
                                }

                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        {/* Body */}

                        <div className="modal-body">

                            <PayrollForm
                                payroll={payroll}
                                onSubmit={onSave}
                                onCancel={onClose}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Background Overlay */}

            <div
                className="modal-backdrop fade show"
            ></div>

        </>

    );

};

export default PayrollModal;