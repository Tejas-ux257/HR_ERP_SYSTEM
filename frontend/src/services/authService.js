import api from "../api/axios";

export const loginUser = async (username, password) => {
    try {
        const response = await api.post("/login", {
            username,
            password,
        });

        // Backend Response:
        // {
        //   status,
        //   message,
        //   data: {
        //      token,
        //      user
        //   }
        // }

        return response.data.data;

    } catch (error) {

        throw (
            error.response?.data || {
                message: "Login failed",
            }
        );

    }
};