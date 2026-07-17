import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
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

    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            try {
                await fetchDashboard();
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
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