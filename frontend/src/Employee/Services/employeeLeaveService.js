import api from "../../api/axios";

// Fetch current employee leave records
export const getMyLeaves = async () => {
  try {
    const response = await api.get("/employee/leave");
    const records = response.data?.data || response.data || [];
    return records;
  } catch (error) {
    console.error("Error fetching leave records:", error);
    throw error;
  }
};

// Apply for a new leave request
export const applyLeave = async (leaveData) => {
  try {
    const response = await api.post("/employee/leave", leaveData);
    return response.data;
  } catch (error) {
    console.error("Error submitting leave application:", error);
    throw error;
  }
};