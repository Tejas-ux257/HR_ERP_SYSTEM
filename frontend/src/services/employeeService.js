import api from "../api/axios";

export const getEmployees = async (
    page = 1,
    limit = 10,
    search = ""
) => {
    const response = await api.get("/employees", {
        params: {
            page,
            limit,
            search,
        },
    });

    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await api.post("/employees", employee);
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};