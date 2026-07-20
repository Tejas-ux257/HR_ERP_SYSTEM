import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/Common/LoadingSpinner";
import AdminLeaveTable from "../../components/Leave/AdminLeaveTable";
import EmployeeLeaveTable from "../../components/Leave/EmployeeLeaveTable";
import LeaveModal from "../../components/Leave/LeaveModal";

import {
    getAllLeaves,
    getEmployeeLeaves,
    approveLeave,
    rejectLeave,
} from "../../services/leaveService";

export default function Leave() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isAdmin = user?.role === "Admin" || user?.role === "HR";

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const loadLeaves = useCallback(async () => {
        try {
            setLoading(true);

            const response = isAdmin
                ? await getAllLeaves()
                : await getEmployeeLeaves(user?.employee_id);

            console.log("API Response:", response);
            console.log("Leaves Data:", response.data);

            setLeaves(response.data || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load leave records."
            );
        } finally {
            setLoading(false);
        }
    }, [isAdmin, user?.employee_id]);

    useEffect(() => {
        const fetchLeaves = async () => {
            await loadLeaves();
        };

        void fetchLeaves();
    }, [loadLeaves]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            {isAdmin ? (
                <AdminLeaveTable
                    leaves={leaves}
                    onApprove={async (id) => {
                        try {
                            await approveLeave(id);
                            toast.success("Leave approved.");
                            await loadLeaves();
                        } catch (err) {
                            toast.error(
                                err.response?.data?.message || "Failed to approve."
                            );
                        }
                    }}
                    onReject={async (id) => {
                        try {
                            await rejectLeave(id);
                            toast.success("Leave rejected.");
                            await loadLeaves();
                        } catch (err) {
                            toast.error(
                                err.response?.data?.message || "Failed to reject."
                            );
                        }
                    }}
                />
            ) : (
                <EmployeeLeaveTable
                    leaves={leaves}
                    onOpenModal={() => setShowModal(true)}
                />
            )}

            {showModal && (
                <LeaveModal onClose={() => setShowModal(false)} onSaved={loadLeaves} />
            )}
        </>
    );
}
