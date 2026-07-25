import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Spinner,
  Alert,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import { getMyPayroll } from "../Services/employeePayrollService";

function EmployeePayroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyPayroll();

      console.log("Payroll Response:", response);

      if (response.status === "success") {
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

  const latestNetSalary =
    payrolls.length > 0 ? payrolls[0].net_salary : 0;

  const totalPaidSlips = payrolls.filter(
    (p) => p.status === "Paid"
  ).length;

  return (
    <EmployeeLayout>
      <div className="container-fluid py-2">

        {/* Header */}
        <div className="mb-4">
          <h3 className="fw-bold mb-1">
            My Payroll & Payslips
          </h3>

          <p className="text-muted mb-0">
            View your monthly salary statements,
            allowances and deductions.
          </p>
        </div>

        {/* Summary Cards */}
        <Row className="g-3 mb-4">

          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted small fw-semibold">
                    LATEST NET SALARY
                  </span>

                  <h3 className="fw-bold text-success mt-1 mb-0">
                    ₹{" "}
                    {Number(latestNetSalary).toLocaleString(
                      "en-IN"
                    )}
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
                  <span className="text-muted small fw-semibold">
                    TOTAL PAYSLIPS
                  </span>

                  <h3 className="fw-bold text-primary mt-1 mb-0">
                    {payrolls.length}
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
                  <span className="text-muted small fw-semibold">
                    PAID STATEMENTS
                  </span>

                  <h3 className="fw-bold text-info mt-1 mb-0">
                    {totalPaidSlips}
                  </h3>
                </div>

                <div className="bg-info-subtle text-info p-3 rounded-circle fs-4">
                  ✅
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        {/* Payroll Table */}
        <Card className="border-0 shadow-sm rounded-3">

          <Card.Header className="bg-white border-bottom py-3">
            <h5 className="mb-0 fw-bold">
              Payment History
            </h5>
          </Card.Header>

          <Card.Body className="p-0">

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />

                <p className="mt-3">
                  Loading payroll...
                </p>
              </div>
            ) : error ? (
              <Alert variant="danger" className="m-3">
                {error}
              </Alert>
            ) : payrolls.length === 0 ? (
              <Alert variant="info" className="m-3">
                No payroll records found.
              </Alert>
            ) : (
              <Table responsive hover className="mb-0">

                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Basic Salary</th>
                    <th>Allowances</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {payrolls.map((payroll) => (
                    <tr key={payroll.id}>

                      <td>
                        {payroll.id}
                      </td>

                      <td>
                        {payroll.month}
                      </td>

                      <td>
                        {payroll.year}
                      </td>

                      <td>
                        ₹{" "}
                        {Number(
                          payroll.basic_salary
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="text-success">
                        + ₹{" "}
                        {Number(
                          payroll.allowances
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="text-danger">
                        - ₹{" "}
                        {Number(
                          payroll.deductions
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <strong>
                          ₹{" "}
                          {Number(
                            payroll.net_salary
                          ).toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <Badge
                          bg={
                            payroll.status === "Paid"
                              ? "success"
                              : "warning"
                          }
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