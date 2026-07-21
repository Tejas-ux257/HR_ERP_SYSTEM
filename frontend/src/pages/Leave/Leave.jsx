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

      setAttendance(response.data || []);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load attendance records.");

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

      console.error(error);

      toast.error(

        error.response?.data?.message ||

          error.message ||

          "Check Out Failed"

      );

    }

  };



  const filteredAttendance = attendance.filter((record) => {

    const employee = record.employee_name || "";

    return employee.toLowerCase().includes(searchTerm.toLowerCase());

  });



  if (loading) {

    return <LoadingSpinner message="Loading Attendance..." />;

  }



  // Calculated Summary Metrics

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

    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }} className="py-4">

      <div className="container-lg">

        {/* Header Bar */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">

          <div>

            <span

              className="px-2.5 py-1 rounded-pill small fw-semibold"

              style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "12px" }}

            >

              Time & Tracking

            </span>

            <h2 className="fw-bold text-dark mt-1 mb-0" style={{ letterSpacing: "-0.5px" }}>

              Attendance Management

            </h2>

          </div>



          {/* Quick Action Buttons */}

          <div className="d-flex align-items-center gap-2">

            <button

              className="btn btn-success shadow-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-2"

              onClick={handleCheckIn}

            >

              <i className="bi bi-box-arrow-in-right fs-6"></i>

              <span>Check In</span>

            </button>



            <button

              className="btn btn-outline-danger shadow-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-2"

              onClick={handleCheckOut}

            >

              <i className="bi bi-box-arrow-right fs-6"></i>

              <span>Check Out</span>

            </button>

          </div>

        </div>



        {/* Analytics Summary Cards */}

        <div className="row g-3 mb-4">

          {/* Card 1: Total Attendance */}

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">

              <div>

                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>

                  Total Logs

                </span>

                <h3 className="fw-bold text-dark mb-0 mt-1">{totalAttendance}</h3>

              </div>

              <div

                className="rounded-3 d-flex align-items-center justify-content-center"

                style={{ width: "42px", height: "42px", backgroundColor: "#eff6ff", color: "#2563eb" }}

              >

                <i className="bi bi-calendar-check-fill fs-5"></i>

              </div>

            </div>

          </div>



          {/* Card 2: Present Count */}

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">

              <div>

                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>

                  Present Today

                </span>

                <h3 className="fw-bold text-success mb-0 mt-1">{presentCount}</h3>

              </div>

              <div

                className="rounded-3 d-flex align-items-center justify-content-center"

                style={{ width: "42px", height: "42px", backgroundColor: "#f0fdf4", color: "#16a34a" }}

              >

                <i className="bi bi-person-check-fill fs-5"></i>

              </div>

            </div>

          </div>



          {/* Card 3: Checked Out */}

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">

              <div>

                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>

                  Checked Out

                </span>

                <h3 className="fw-bold text-info mb-0 mt-1">{checkedOutCount}</h3>

              </div>

              <div

                className="rounded-3 d-flex align-items-center justify-content-center"

                style={{ width: "42px", height: "42px", backgroundColor: "#f0f9ff", color: "#0284c7" }}

              >

                <i className="bi bi-clock-history fs-5"></i>

              </div>

            </div>

          </div>



          {/* Card 4: Pending Checkout */}

          <div className="col-12 col-sm-6 col-lg-3">

            <div className="bg-white p-3 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-between h-100">

              <div>

                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "11px" }}>

                  Pending Checkout

                </span>

                <h3 className="fw-bold text-warning mb-0 mt-1">{pendingCheckout}</h3>

              </div>

              <div

                className="rounded-3 d-flex align-items-center justify-content-center"

                style={{ width: "42px", height: "42px", backgroundColor: "#fffbeb", color: "#d97706" }}

              >

                <i className="bi bi-hourglass-split fs-5"></i>

              </div>

            </div>

          </div>

        </div>



        {/* Main Attendance Table Section */}

        <div className="bg-white rounded-4 shadow-sm border-0 overflow-hidden mb-4">

          {/* Header & Search Bar inside Table Box */}

          <div className="p-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

            <div>

              <h6 className="fw-bold text-dark mb-1">Attendance Logs</h6>

              <p className="text-muted small mb-0">

                Displaying daily check-in and check-out activity

              </p>

            </div>



            {/* Search Input */}

            <div style={{ maxWidth: "320px", width: "100%" }}>

              <div className="input-group">

                <span className="input-group-text bg-transparent border-end-0 text-muted">

                  <i className="bi bi-search"></i>

                </span>

                <input

                  type="text"

                  className="form-control border-start-0 ps-0 shadow-none"

                  placeholder="Search employee name..."

                  value={searchTerm}

                  onChange={(e) => setSearchTerm(e.target.value)}

                  style={{ fontSize: "14px" }}

                />

                {searchTerm && (

                  <button

                    className="btn btn-link text-muted border-start-0 text-decoration-none"

                    type="button"

                    onClick={() => setSearchTerm("")}

                  >

                    <i className="bi bi-x-circle-fill"></i>

                  </button>

                )}

              </div>

            </div>

          </div>



          {/* Table Render */}

          <div className="p-0">

            <AttendanceTable attendance={filteredAttendance} />

          </div>

        </div>

      </div>

    </div>

  );

}



export default Attendance; 

