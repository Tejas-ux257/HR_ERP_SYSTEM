import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PayrollTable from "../../components/Payroll/PayrollTable";
import EmployeePayrollTable from "../../components/Payroll/EmployeePayrollTable";
import PayrollModal from "../../components/Payroll/PayrollModal";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import {
    generatePayroll,
    getAllPayroll,
    getEmployeePayroll,
    updatePayroll
} from "../../services/payrollService";

export default function Payroll() {

    console.log("========== Payroll Page Loaded ==========");

    const [user] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    });

    console.log("User:", user);

    const isAdmin =
        user?.role === "Admin" ||
        user?.role === "HR";

    console.log("Is Admin:", isAdmin);

    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const loadPayroll = async () => {
        console.log("Loading Payroll Started");

        try {
            setLoading(true);

            const response = isAdmin
                ? await getAllPayroll()
                : await getEmployeePayroll(user?.employee_id);

            console.log("Payroll Response:", response);

            const payload = response?.data ?? response;
            const payrollData = Array.isArray(payload) ? payload : [];

            if (response?.status === "error") {
                toast.error(response.message || "Failed to load payroll.");
                setPayrolls([]);
                return;
            }

            setPayrolls(payrollData);

        } catch (error) {
            console.error("Payroll Error:", error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to load payroll."
            );

            setPayrolls([]);

        } finally {
            console.log("Finally executed");
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchPayroll = async () => {
            console.log("Payroll useEffect Running");
            await loadPayroll();
        };

        fetchPayroll().catch(() => {
            if (!isMounted) return;
        });

        return () => {
            isMounted = false;
        };
    }, 
    [] 
);

    const handleAdd = () => {
        setSelectedPayroll(null);
        setShowModal(true);
    };

    const handleEdit = (payroll) => {
        setSelectedPayroll(payroll);
        setShowModal(true);
    };

    const handleSave = async (data) => {

        try {

            if (selectedPayroll) {

                await updatePayroll(
                    selectedPayroll.id,
                    data
                );

                toast.success("Payroll updated successfully.");

            } else {

                await generatePayroll(data);

                toast.success("Payroll generated successfully.");

            }

            setShowModal(false);

            await loadPayroll();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save payroll."
            );

        }

    };

    const safePayrolls = Array.isArray(payrolls) ? payrolls : [];

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading Payroll...</h2>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>

            {
                isAdmin ? (
                    <PayrollTable
                        payrolls={safePayrolls}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                    />
                ) : (
                    <EmployeePayrollTable
                        payrolls={safePayrolls}
                    />
                )
            }

            {
                showModal && (
                    <PayrollModal
                        payroll={selectedPayroll}
                        onClose={() => setShowModal(false)}
                        onSave={handleSave}
                    />
                )
            }

        </>
    );

}