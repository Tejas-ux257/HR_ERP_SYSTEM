import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Department from "./pages/Department/Department";
import Employee from "./pages/Employee/Employee";
import Attendance from "./pages/Attendance/Attendance";
import Leave from "./pages/Leave/Leave";
import Payroll from "./pages/Payroll/Payroll";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>

            {/* Public Route */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/departments"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Department />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Employee />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Attendance />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leave"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Leave />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/payroll"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Payroll />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;