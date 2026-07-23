import { useEffect, useState } from "react";
import { Card, Table, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { getMyPayroll } from "../Services/employeePayrollService";

function EmployeePayroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Payroll Data
  const fetchPayroll = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyPayroll();

      if (response.status === "success") {
        // Handle both array and single object responses
        if (Array.isArray(response.data)) {
          setPayrolls(response.data);
        } else if (response.data) {
          setPayrolls([response.data]);
        } else {
          setPayrolls([]);
        }
      } else {
        setError(response.message || "Failed to load payroll.");
      }
    } catch (err) {
      console.error("Payroll Error:", err);
      setError("Failed to load payroll.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  // Summary Metrics
  const latestNetSalary = payrolls.length > 0 ? payrolls[0].net_salary : 0;
  const totalPaidSlips = payrolls.filter((p) => p.status === "Paid").length;

  return (
    <EmployeeLayout>
      <div className="container-fluid py-2">
        {/* Page Title Header */}
        <div className="mb-4">
          <h3 className="fw-bold mb-1">My Payroll & Payslips</h3>
          <p className="text-muted mb-0">
            View your monthly salary statements, allowances, and deductions.
          </p>
        </div>

        {/* Summary Cards */}
        <Row className="g-3 mb-4">
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">LATEST NET SALARY</span>
                  <h3 className="fw-bold text-success mb-0 mt-1">
                    ₹ {Number(latestNetSalary).toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="bg-success-subtle text-success p-3 rounded-circle fs-4">
                  💰
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">TOTAL PAYSLIPS</span>
                  <h3 className="fw-bold text-primary mb-0 mt-1">
                    {payrolls.length} Records
                  </h3>
                </div>
                <div className="bg-primary-subtle text-primary p-3 rounded-circle fs-4">
                  📄
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">PAID STATEMENTS</span>
                  <h3 className="fw-bold text-info mb-0 mt-1">
                    {totalPaidSlips} Paid
                  </h3>
                </div>
                <div className="bg-info-subtle text-info p-3 rounded-circle fs-4">
                  ✅
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Table Card */}
        <Card className="border-0 shadow-sm rounded-3">
          <Card.Header className="bg-white border-bottom py-3">
            <h5 className="mb-0 fw-bold text-dark">Payment History</h5>
          </Card.Header>

          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted fw-semibold">Loading payroll records...</p>
              </div>
            ) : error ? (
              <div className="p-3">
                <Alert variant="danger" className="mb-0">{error}</Alert>
              </div>
            ) : payrolls.length === 0 ? (
              <div className="p-3">
                <Alert variant="info" className="mb-0">
                  No payroll records found.
                </Alert>
              </div>
            ) : (
              <Table responsive hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4 py-3">#</th>
                    <th className="py-3">Month</th>
                    <th className="py-3">Year</th>
                    <th className="py-3">Basic Salary</th>
                    <th className="py-3">Allowances</th>
                    <th className="py-3">Deductions</th>
                    <th className="py-3">Net Salary</th>
                    <th className="pe-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((payroll, index) => (
                    <tr key={payroll.payroll_id || index}>
                      <td className="ps-4 text-muted fw-medium">{index + 1}</td>
                      <td className="fw-semibold">{payroll.month}</td>
                      <td>{payroll.year}</td>
                      <td>₹ {Number(payroll.basic_salary).toLocaleString("en-IN")}</td>
                      <td className="text-success">+ ₹ {Number(payroll.allowances).toLocaleString("en-IN")}</td>
                      <td className="text-danger">- ₹ {Number(payroll.deductions).toLocaleString("en-IN")}</td>
                      <td>
                        <strong className="text-dark">
                          ₹ {Number(payroll.net_salary).toLocaleString("en-IN")}
                        </strong>
                      </td>
                      <td className="pe-4">
                        <Badge
                          bg={payroll.status === "Paid" ? "success" : "warning"}
                          className="px-3 py-2 rounded-pill fw-normal"
                        >
                          {payroll.status || "Pending"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeePayroll;