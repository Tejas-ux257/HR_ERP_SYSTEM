import api from "../../api/axios";

// Get Logged-in Employee Payroll
export const getMyPayroll = async () => {
    const response = await api.get("/employee/payroll");
    return response.data;
};