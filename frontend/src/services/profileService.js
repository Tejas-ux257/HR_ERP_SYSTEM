import api from "../api/axios";

// Get logged-in employee profile
export const getProfile = async () => {
    const response = await api.get("/profile");
    return response.data;
};

// Update profile
export const updateProfile = async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
    const response = await api.put("/profile/password", passwordData);
    return response.data;
};