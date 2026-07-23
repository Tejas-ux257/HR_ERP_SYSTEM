import api from "../../api/axios";

// Fetch current employee profile
export const getProfile = async () => {
  try {
    const response = await api.get("/employee/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update current employee profile
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/employee/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Upload profile picture / documents
export const uploadProfileImage = async (formData) => {
  try {
    const response = await api.post("/employee/profile/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};