import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
