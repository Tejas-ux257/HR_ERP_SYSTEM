import api from "../../api/axios";

// Apply Leave
export const applyLeave = async (leaveData) => {
  const response = await api.post("/employee/leave", leaveData);
  return response.data;
};

export const getMyLeaves = async () => {
  const response = await api.get("/employee/leave");
  return response.data.data;
};