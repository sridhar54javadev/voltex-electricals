import { Link, Outlet } from "react-router-dom";

import {
  Zap,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import { siteConfig } from "../data/siteConfig";

export default function PublicLayout() {
  const currentYear = new Date().getFullYear();
  const navigation = siteConfig.navigation || [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="relative overflow-hidden bg-[#07131f] text-white">
        <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-[1440px] px-6 pt-20 sm:px-10 lg:px-16">
          <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-4">

            {/* BRAND */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <Zap size={27} fill="currentColor" />
                </div>

                <div>
                  <h2 className="text-2xl font-black tracking-[0.12em]">
                    VOLTEX
                  </h2>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400">
                    ELECTRICALS
                  </p>
                </div>
              </Link>

              <p className="mt-7 max-w-md text-sm leading-8 text-slate-400">
                Powering every connection. Discover quality electrical
                products, dependable solutions, and trusted electrical
                essentials for your requirements.
              </p>

              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-orange-400 transition hover:gap-4"
              >
                Discover VOLTEX
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em]">
                Quick Links
              </h3>

              <div className="mt-7 flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="w-fit text-sm text-slate-400 transition hover:translate-x-1 hover:text-orange-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em]">
                Get in Touch
              </h3>

              <div className="mt-7 flex flex-col gap-6">
                {siteConfig.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={19} className="mt-1 shrink-0 text-orange-400" />
                    <p className="text-sm leading-7 text-slate-400">
                      {siteConfig.address}
                    </p>
                  </div>
                )}

                {siteConfig.phone && (
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-orange-400"
                  >
                    <Phone size={18} className="text-orange-400" />
                    {siteConfig.phone}
                  </a>
                )}

                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 break-all text-sm text-slate-400 hover:text-orange-400"
                  >
                    <Mail size={18} className="shrink-0 text-orange-400" />
                    {siteConfig.email}
                  </a>
                )}

                <Link
                  to="/contact"
                  className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Contact Us
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500">
              © {currentYear} VOLTEX ELECTRICALS. All rights reserved.
            </p>

            <p className="text-xs text-slate-500">
              Powering Every Connection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}