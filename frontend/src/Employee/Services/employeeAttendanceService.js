import api from "../../api/axios";

export const getMyAttendance = async () => {
    try {
        const response = await api.get("/employee/attendance");

        return response.data.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to fetch attendance",
            }
        );
    }
};