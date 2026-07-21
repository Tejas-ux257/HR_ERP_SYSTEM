const PayrollTable = ({ payrolls = [], onAdd, onEdit }) => {
  // Helper for currency formatting
  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Helper for date formatting
  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Header Bar */}
      <div className="card border-0 shadow-sm rounded-3 mb-4">
        <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 py-3">
          <div>
            <h4 className="fw-bold mb-1 text-dark">Payroll Records</h4>
            <p className="text-muted small mb-0">
              Manage and track monthly employee salary disbursements
            </p>
          </div>
          <div>
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 fw-medium shadow-sm"
              onClick={onAdd}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Generate Payroll</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light border-bottom text-secondary text-uppercase small fw-semibold">
              <tr>
                <th className="py-3 px-3">Payroll ID</th>
                <th className="py-3 px-3">Emp ID</th>
                <th className="py-3 px-3">Period</th>
                <th className="py-3 px-3 text-end">Basic Salary</th>
                <th className="py-3 px-3 text-end">Allowances</th>
                <th className="py-3 px-3 text-end">Deductions</th>
                <th className="py-3 px-3 text-end">Net Salary</th>
                <th className="py-3 px-3 text-center">Generated On</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payrolls.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <div className="d-flex flex-column align-items-center gap-2">
                      <i className="bi bi-inbox fs-1 text-secondary opacity-50"></i>
                      <span className="fw-medium">No Payroll Records Found</span>
                      <small className="text-muted">
                        Click "Generate Payroll" to create a new payroll batch.
                      </small>
                    </div>
                  </td>
                </tr>
              ) : (
                payrolls.map((payroll) => (
                  <tr key={payroll.id}>
                    {/* Payroll ID */}
                    <td className="px-3">
                      <span className="fw-semibold text-primary">
                        {payroll.id}
                      </span>
                    </td>

                    {/* Employee ID */}
                    <td className="px-3">
                      <span className="badge bg-light text-dark border">
                        {payroll.employee_id}
                      </span>
                    </td>

                    {/* Month / Year */}
                    <td className="px-3">
                      <div className="fw-medium text-dark">
                        {payroll.month} {payroll.year}
                      </div>
                    </td>

                    {/* Basic Salary */}
                    <td className="px-3 text-end font-monospace">
                      {formatCurrency(payroll.basic_salary)}
                    </td>

                    {/* Allowances */}
                    <td className="px-3 text-end font-monospace text-success">
                      + {formatCurrency(payroll.allowances)}
                    </td>

                    {/* Deductions */}
                    <td className="px-3 text-end font-monospace text-danger">
                      - {formatCurrency(payroll.deductions)}
                    </td>

                    {/* Net Salary */}
                    <td className="px-3 text-end font-monospace fw-bold text-success fs-6">
                      {formatCurrency(payroll.net_salary)}
                    </td>

                    {/* Date */}
                    <td className="px-3 text-center text-muted small">
                      {formatDate(payroll.generated_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-3 text-center">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-2 d-inline-flex align-items-center gap-1"
                        onClick={() => onEdit(payroll)}
                        title="Edit Payroll"
                      >
                        <i className="bi bi-pencil-square"></i>
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;