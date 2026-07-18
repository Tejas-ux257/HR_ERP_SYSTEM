import api from "../api/axios";

// Check In
export const checkIn = async (employeeId) => {
    const response = await api.post("/attendance/check-in", {
        employee_id: employeeId,
    });

    return response.data;
};

// Check Out
export const checkOut = async (employeeId) => {
    const response = await api.put("/attendance/check-out", {
        employee_id: employeeId,
    });

    return response.data;
};

// Get Today's Attendance
export const getTodayAttendance = async () => {
    const response = await api.get("/attendance/today");
    return response.data;
};

// Get All Attendance
export const getAllAttendance = async () => {
    const response = await api.get("/attendance");
    return response.data;
};

// Get Employee Attendance
export const getEmployeeAttendance = async (employeeId) => {
    const response = await api.get(`/attendance/${employeeId}`);
    return response.data;
};