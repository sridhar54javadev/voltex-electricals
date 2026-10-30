import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-wide text-blue-900">
            VOLTEX <span className="text-orange-500">ELECTRICALS</span>
          </a>

          <span className="hidden text-sm text-gray-500 md:block">
            Powering Every Connection.
          </span>
        </div>
      </header>

      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-950 px-6 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} VOLTEX ELECTRICALS.</p>
        <p className="mt-2">Powering Every Connection.</p>
      </footer>
    </div>
  );
}
