import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Sprout, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Shell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Estimate", path: "/estimate" },
    { name: "Heating", path: "/heating" },
    { name: "ROI", path: "/roi" },
    { name: "Crops", path: "/crops" },
    { name: "Compare", path: "/compare" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Ecosystem Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center">
        Part of the <a href="https://ruralutilitycost.com" className="text-white hover:underline font-medium">Rural Utility Cost</a> ecosystem.
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-green-600 p-1.5 rounded-lg text-white group-hover:bg-green-700 transition">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-lg leading-none block text-slate-900">Greenhouse</span>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Rural Utility Cost</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-green-50 text-green-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-500 hover:text-slate-700 p-2 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-green-50 text-green-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="w-6 h-6 text-green-500" />
                <span className="text-xl font-bold text-white">Greenhouse</span>
              </div>
              <p className="text-sm max-w-md">
                Greenhouse is the controlled-environment agriculture economics and planning hub. 
                Estimate startup costs, operating expenses, and ROI to make practical investment and operating decisions.
              </p>
              <p className="mt-4 text-xs">
                A service of <a href="https://ruralutilitycost.com" className="text-green-500 hover:underline">RuralUtilityCost.com</a>
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/estimate" className="hover:text-white transition">Cost Estimator</Link></li>
                <li><Link to="/heating" className="hover:text-white transition">Heating & Energy</Link></li>
                <li><Link to="/crops" className="hover:text-white transition">Crop Profitability</Link></li>
                <li><Link to="/roi" className="hover:text-white transition">ROI & Payback</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Information</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition">About Greenhouse</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link to="/legal" className="hover:text-white transition">Legal & Disclaimer</Link></li>
                <li><a href="https://github.com" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
            <p>Results are estimates only. Not professional engineering or financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
