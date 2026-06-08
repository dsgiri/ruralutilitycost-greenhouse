import React from "react";
import { Mail } from "lucide-react";

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-4">
        Contact Us
      </h1>
      <div className="prose prose-slate text-slate-700 space-y-6">
        <p>
          We welcome feedback, suggestions for new calculators, and bug reports. Whether you're an operator with historical data to help calibrate the models or a user who spotted an error, we want to hear from you.
        </p>
        
        <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-lg border border-slate-200 mt-6">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Mail className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Email the team</h3>
            <a href="mailto:contact@ruralutilitycost.com" className="text-green-600 hover:text-green-700 hover:underline">
              contact@ruralutilitycost.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
