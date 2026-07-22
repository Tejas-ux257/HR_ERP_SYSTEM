import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Right Content Area */}
      <div className="flex-grow-1 bg-light d-flex flex-column">
        <Navbar />
        {/* DO NOT put <Profile /> or <ProfileCard /> here */}
        <main className="p-4 flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  );
}