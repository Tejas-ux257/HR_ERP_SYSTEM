import api from "../api/axios";

export const getDashboardSummary = async () => {
    try {
        const response = await api.get("/dashboard");

        return response.data;

    } catch (error) {

        throw error.response?.data || {
            message: "Failed to load dashboard"
        };

    }
};