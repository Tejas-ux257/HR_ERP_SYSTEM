import EmployeeSidebar from "../Components/EmployeeSidebar";
import EmployeeNavbar from "../Components/EmployeeNavbar";

export default function EmployeeLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <EmployeeSidebar />

      {/* Main Content Workspace */}
      <div className="flex-grow-1 bg-light d-flex flex-column">
        <EmployeeNavbar />
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
}