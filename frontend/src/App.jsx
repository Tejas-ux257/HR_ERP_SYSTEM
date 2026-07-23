import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Department from "./pages/Department/Department";
import Employee from "./pages/Employee/Employee";
import Attendance from "./pages/Attendance/Attendance";
import Leave from "./pages/Leave/Leave";
import Payroll from "./pages/Payroll/Payroll";
import Profile from "./pages/Profile/Profile";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Employee Portal Pages
import EmployeeDashboard from "./employee/pages/EmployeeDashboard";
import MyProfile from "./employee/pages/MyProfile";
import EmployeeAttendance from "./employee/pages/EmployeeAttendance";
import EmployeeApplyLeave from "./employee/pages/EmployeeApplyLeave";
import EmployeeMyLeave from "./employee/pages/EmployeeMyLeave";

import EmployeePayroll from "./employee/pages/EmployeePayroll";


import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute>
              <EmployeeAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/apply-leave"
          element={
            <ProtectedRoute>
              <EmployeeApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/my-leaves"
          element={
            <ProtectedRoute>
              <EmployeeMyLeave />
            </ProtectedRoute>
          }
        />    
        <Route
           path="/employee/payroll"
           element={
           <ProtectedRoute>
            <EmployeePayroll />
            </ProtectedRoute>
          }
        />      
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;