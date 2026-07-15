import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const fetchDashboard = async () => {

        console.log("1. Started");

        try {

            console.log("2. Calling API");

            const response = await getDashboardSummary();

            console.log("3. API Response:", response);

            setDashboard(response.data);

        } catch (error) {

            console.log("4. Error:", error);

        } finally {

            console.log("5. Finally");

            setLoading(false);

        }

    };

    fetchDashboard();

}, []);

    if (loading) {
        return <h3>Loading Dashboard...</h3>;
    }

   return (
    <div className="container-fluid">

        <h2 className="mb-4">Dashboard</h2>

        <div className="row g-4">

            <div className="col-md-4">
                <div className="card shadow border-0 bg-primary text-white">
                    <div className="card-body">
                        <h5>Total Employees</h5>
                        <h1>{dashboard.total_employees}</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow border-0 bg-success text-white">
                    <div className="card-body">
                        <h5>Total Departments</h5>
                        <h1>{dashboard.total_departments}</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow border-0 bg-warning">
                    <div className="card-body">
                        <h5>Today's Attendance</h5>
                        <h1>{dashboard.today_attendance}</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow border-0 bg-danger text-white">
                    <div className="card-body">
                        <h5>Pending Leaves</h5>
                        <h1>{dashboard.pending_leaves}</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow border-0 bg-info text-white">
                    <div className="card-body">
                        <h5>Approved Leaves</h5>
                        <h1>{dashboard.approved_leaves}</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow border-0 bg-dark text-white">
                    <div className="card-body">
                        <h5>Payroll Records</h5>
                        <h1>{dashboard.total_payroll_records}</h1>
                    </div>
                </div>
            </div>

        </div>

    </div>
);
}

export default Dashboard;