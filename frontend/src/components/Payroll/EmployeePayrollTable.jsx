const EmployeePayrollTable = ({ payrolls }) => {

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB");
    };

    return (

        <div className="container mt-4">

            <div className="mb-4">

                <h3>My Payroll History</h3>

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">

                        <tr>

                            <th>Month</th>
                            <th>Year</th>
                            <th>Basic Salary</th>
                            <th>Allowances</th>
                            <th>Deductions</th>
                            <th>Net Salary</th>
                            <th>Generated On</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            payrolls.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center text-muted"
                                    >
                                        No Payroll Records Found
                                    </td>

                                </tr>

                            ) : (

                                payrolls.map((payroll) => (

                                    <tr key={payroll.id}>

                                        <td>{payroll.month}</td>

                                        <td>{payroll.year}</td>

                                        <td>
                                            {formatCurrency(payroll.basic_salary)}
                                        </td>

                                        <td>
                                            {formatCurrency(payroll.allowances)}
                                        </td>

                                        <td className="text-danger">
                                            {formatCurrency(payroll.deductions)}
                                        </td>

                                        <td className="fw-bold text-success">
                                            {formatCurrency(payroll.net_salary)}
                                        </td>

                                        <td>
                                            {formatDate(payroll.generated_at)}
                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default EmployeePayrollTable;