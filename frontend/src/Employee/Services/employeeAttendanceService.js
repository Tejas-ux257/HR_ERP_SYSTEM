import api from "../../api/axios";

// Fetch today's attendance status
export const getTodayAttendance = async () => {
  try {
    const response = await api.get("/employee/attendance/status");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching today's attendance status:", error);
    throw error;
  }
};

// Check In
export const checkIn = async () => {
  try {
    const response = await api.post("/employee/attendance/check-in");
    return response.data;
  } catch (error) {
    console.error("Error performing check-in:", error);
    throw error;
  }
};

// Check Out
export const checkOut = async () => {
  try {
    const response = await api.post("/employee/attendance/check-out");
    return response.data;
  } catch (error) {
    console.error("Error performing check-out:", error);
    throw error;
  }
};

// Attendance History
export const getAttendanceHistory = async () => {
  try {
    const response = await api.get("/employee/attendance");
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    throw error;
  }
};

export const getMyAttendance = getAttendanceHistory;