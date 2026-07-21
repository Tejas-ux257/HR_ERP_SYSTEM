import api from "../api/axios";

// Apply Leave
export const applyLeave = async (leaveData) => {
    const response = await api.post("/leave/apply", leaveData);
    return response.data;
};

// Get All Leaves
export const getLeaves = async () => {
    const response = await api.get("/leave");
    return response.data;
};

// Get Employee Leaves
export const getEmployeeLeaves = async (employeeId) => {
    const response = await api.get(`/leave/${employeeId}`);
    return response.data;
};

// Update Leave Status
export const updateLeaveStatus = async (leaveId, status) => {
    const response = await api.put(
        `/leave/${leaveId}/${status.toLowerCase()}`
    );
    return response.data;
};

// Optional Individual APIs
export const approveLeave = async (leaveId) => {
    const response = await api.put(`/leave/${leaveId}/approve`);
    return response.data;
};

export const rejectLeave = async (leaveId) => {
    const response = await api.put(`/leave/${leaveId}/reject`);
    return response.data;
};