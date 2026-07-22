import api from "../../api/axios"; // Ensure this matches your existing base API setup file
// Fetch profile
export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update profile - try PUT first, or change to api.post / api.patch if needed
export const updateProfile = async (profileData) => {
  try {
    // If your backend expects POST or PATCH instead of PUT, change api.put to api.post or api.patch
    const response = await api.put("/profile", profileData); 
    console.log("Update profile API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile in service:", error.response || error);
    throw error;
  }
};