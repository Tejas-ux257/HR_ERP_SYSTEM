import api from "../api/axios";

/**
 * Generate Payroll
 */
export const generatePayroll = async (payrollData) => {
    const response = await api.post(
        "/payroll",
        payrollData
    );

    return response.data;
};

/**
 * Get All Payroll Records
 */
export const getAllPayroll = async () => {

    console.log("Calling GET /payroll");

    const response = await api.get(
        "/payroll"
    );

    console.log("Axios Response:", response);

    return response?.data ?? response;
};

/**
 * Get Payroll of One Employee
 */
export const getEmployeePayroll = async (employeeId) => {

    console.log("Calling GET /payroll/" + employeeId);

    const response = await api.get(
        `/payroll/${employeeId}`
    );

    console.log("Axios Response:", response);

    return response?.data ?? response;
};

/**
 * Update Payroll
 */
export const updatePayroll = async (
    payrollId,
    payrollData
) => {
    const response = await api.put(
        `/payroll/${payrollId}`,
        payrollData
    );

    return response.data;
};