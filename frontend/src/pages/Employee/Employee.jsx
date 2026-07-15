import { useEffect, useState } from "react";

import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeModal from "../../components/Employee/EmployeeModal";

import { getEmployees } from "../../services/employeeService";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Load Employees
    const fetchEmployees = async () => {

        try {

            const response = await getEmployees();

            console.log("Employee Response:", response);

            setEmployees(response.data || []);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to load employees"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        let isMounted = true;

        const loadEmployees = async () => {
            try {
                const response = await getEmployees();
                console.log("Employee Response:", response);
                if (isMounted) {
                    setEmployees(response.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                    alert(
                        error.response?.data?.message ||
                        error.message ||
                        "Failed to load employees"
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadEmployees();

        return () => {
            isMounted = false;
        };

    }, []);

    // Add Employee
    const handleAddEmployee = () => {

        setSelectedEmployee(null);

        setShowModal(true);

    };

    // Edit Employee
    const handleEditEmployee = (employee) => {

        setSelectedEmployee(employee);

        setShowModal(true);

    };

    // Close Modal
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedEmployee(null);

    };

    if (loading) {

        return (
            <div className="container-fluid mt-4">
                <h4>Loading Employees...</h4>
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Employee Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={handleAddEmployee}
                >
                    + Add Employee
                </button>

            </div>

            <EmployeeTable
                employees={employees}
                onEdit={handleEditEmployee}
            />

            <EmployeeModal
                show={showModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
                refreshEmployees={fetchEmployees}
            />

        </div>

    );

}

export default Employee;