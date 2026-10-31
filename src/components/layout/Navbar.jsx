import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = siteConfig.navigation || [];

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "text-orange-500"
        : "text-slate-600 hover:text-orange-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">

      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">

        {/* BRAND */}

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#07131f] text-orange-400 shadow-lg transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-orange-500 group-hover:text-white">
            <Zap size={25} fill="currentColor" />
          </div>

          <div>
            <h1 className="text-[22px] font-black leading-none tracking-[0.12em] text-[#07131f]">
              VOLTEX
            </h1>

            <p className="mt-1 text-[9px] font-bold tracking-[0.31em] text-slate-500">
              ELECTRICALS
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-1 lg:flex">

          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClass}
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-orange-500 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

        </nav>

        {/* DESKTOP CONTACT BUTTON */}

        <Link
          to="/contact"
          className="hidden items-center gap-3 rounded-full bg-[#07131f] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 lg:inline-flex"
        >
          Let's Talk

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <ArrowUpRight size={16} />
          </span>
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#07131f] transition hover:border-orange-400 hover:text-orange-500 lg:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >

        <nav className="mx-auto max-w-[1440px] px-6 py-5 sm:px-10">

          <div className="flex flex-col gap-2">

            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-5 py-4 text-sm font-bold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-500"
                  }`
                }
              >
                {item.label}

                <ChevronRight size={17} />
              </NavLink>
            ))}

          </div>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-[#07131f] px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            Let's Talk
            <ArrowUpRight size={18} />
          </Link>

        </nav>

      </div>

    </header>
  );
}