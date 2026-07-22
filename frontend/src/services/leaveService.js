import api from "../api/axios";

// Apply Leave (Employee)
export const applyLeave = async (leaveData) => {
  const response = await api.post("/leave/apply", leaveData);
  return response.data;
};

// Get All Leaves (Admin)
export const getLeaves = async () => {
  const response = await api.get("/leave");
  return response.data;
};

// Get Employee Leaves
export const getEmployeeLeaves = async (employeeId) => {
  const response = await api.get(`/leave/${employeeId}`);
  return response.data;
};

// Update Leave Status (Generic)
export const updateLeaveStatus = async (leaveId, status) => {
  const response = await api.put(
    `/leave/${leaveId}/${status.toLowerCase()}`
  );
  return response.data;
};

// Approve Leave
export const approveLeave = async (leaveId) => {
  const response = await api.put(`/leave/${leaveId}/approve`);
  return response.data;
};

// Reject Leave
export const rejectLeave = async (leaveId) => {
  const response = await api.put(`/leave/${leaveId}/reject`);
  return response.data;
};