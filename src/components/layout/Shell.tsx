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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-slate-900 focus:font-bold">
        Skip to main content
      </a>
      
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
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[48px] flex items-center",
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
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                className="text-slate-500 hover:text-slate-700 p-2 min-h-[48px] min-w-[48px] flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-slate-100 p-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium min-h-[48px]",
                  location.pathname === link.path
                    ? "bg-green-50 text-green-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none" tabIndex={-1}>
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
              <p className="text-sm max-w-md mb-6">
                Greenhouse is the controlled-environment agriculture economics and planning hub. 
                Estimate startup costs, operating expenses, and ROI to make practical investment and operating decisions.
              </p>
              <p className="text-xs">
                A service of <a href="https://ruralutilitycost.com" className="text-green-500 hover:text-green-400 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">RuralUtilityCost.com</a>
              </p>
            </div>
            
            <nav aria-label="Footer Tools Navigation">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/estimate" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Cost Estimator</Link></li>
                <li><Link to="/heating" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Heating & Energy</Link></li>
                <li><Link to="/crops" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Crop Profitability</Link></li>
                <li><Link to="/roi" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">ROI & Payback</Link></li>
              </ul>
            </nav>

            <nav aria-label="Footer Information Navigation">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Information</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">About Greenhouse</Link></li>
                <li><a href="https://www.ruralutilitycost.com/contact" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Contact</a></li>
                <li><a href="https://www.ruralutilitycost.com/privacy-policy" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Privacy Policy</a></li>
                <li><a href="https://www.ruralutilitycost.com/terms-of-use" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Terms of Use</a></li>
                <li><a href="https://www.ruralutilitycost.com/disclaimer" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">Disclaimer</a></li>
                <li><a href="https://github.com/dsgiri/ruralutilitycost-greenhouse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white p-1 -ml-1 rounded">GitHub</a></li>
              </ul>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
            <p>Results are estimates only. Not professional engineering or financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
