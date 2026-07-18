import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/Common/LoadingSpinner";
import AttendanceTable from "../../components/Attendance/AttendanceTable";

import {
    checkIn,
    checkOut,
     getAllAttendance,
   
} from "../../services/attendanceService";

function Attendance() {

    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const employeeId = user?.employee_id;

    const fetchAttendance = useCallback(async () => {
        try {
            const response = await getAllAttendance();

            console.log("Response:", response);
            console.log("Response.data:", response.data);

            setAttendance(response.data || []);

        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {

        const loadAttendance = async () => {

            setLoading(true);

            await fetchAttendance();

            setLoading(false);

        };

        loadAttendance();

    }, [fetchAttendance]);

    const handleCheckIn = async () => {

        console.log("User:", user);
        console.log("Employee ID:", employeeId);

        try {

            await checkIn(employeeId);

            toast.success("Checked In Successfully");

            await fetchAttendance();

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Check In Failed"
            );

        }

    };

    const handleCheckOut = async () => {

        try {

            await checkOut(employeeId);

            toast.success("Checked Out Successfully");

            await fetchAttendance();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Check Out Failed"
            );

        }

    };

    const filteredAttendance = attendance.filter((record) => {

        const employee =
            record.employee_name ||
            "";

        return employee
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

    });

    if (loading) {

        return (
            <LoadingSpinner
                message="Loading Attendance..."
            />
        );

    }   



    const totalAttendance = attendance.length;

const presentCount = attendance.filter(
    (record) => record.status === "Present"
).length;

const checkedOutCount = attendance.filter(
    (record) => record.check_out
).length;

const pendingCheckout = attendance.filter(
    (record) => !record.check_out
).length; 


    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Attendance Management</h2>

                <div>

                    <button
                        className="btn btn-success me-2"
                        onClick={handleCheckIn}
                    >
                        ✔ Check In
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={handleCheckOut}
                    >
                        ✖ Check Out
                    </button>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            <AttendanceTable
                attendance={filteredAttendance}
            />

            <div className="row mb-4">

                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-primary text-white">
                        <div className="card-body text-center">
                            <h5>Total Attendance</h5>
                            <h2>{totalAttendance}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-success text-white">
                        <div className="card-body text-center">
                            <h5>Present</h5>
                            <h2>{presentCount}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-info text-white">
                        <div className="card-body text-center">
                            <h5>Checked Out</h5>
                            <h2>{checkedOutCount}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0 bg-warning text-dark">
                        <div className="card-body text-center">
                            <h5>Pending Checkout</h5>
                            <h2>{pendingCheckout}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Attendance;