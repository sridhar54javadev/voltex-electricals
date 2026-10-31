import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  Wrench,
  Award,
  Images,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: Tags },
  { name: "Services", path: "/admin/services", icon: Wrench },
  { name: "Brands", path: "/admin/brands", icon: Award },
  { name: "Gallery", path: "/admin/gallery", icon: Images },
  { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { name: "Enquiries", path: "/admin/enquiries", icon: Mail },
  { name: "Website Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      toast.success("Logged out successfully!");

      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Unable to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-blue-950 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-blue-900 px-6">
          <div>
            <h1 className="text-xl font-bold">
              VOLTEX <span className="text-orange-400">ADMIN</span>
            </h1>

            <p className="mt-1 text-xs text-blue-200">
              Business Management Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-900 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-blue-900 p-4">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={19} />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">

        {/* Topbar */}
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm md:px-8">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={25} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Admin Panel
              </h2>

              <p className="text-xs text-gray-500">
                Manage your electrical business
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                VOLTEX ELECTRICALS
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Zap size={22} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
</div>
    </div>
  );
}