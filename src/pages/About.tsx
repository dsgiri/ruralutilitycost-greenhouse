import React from "react";

export function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-4">
        About Greenhouse
      </h1>
      <div className="prose prose-slate prose-green text-slate-700 space-y-6">
        <p>
          <strong>Greenhouse</strong> is the controlled-environment agriculture economics and planning hub, part of the Rural Utility Cost ecosystem.
        </p>
        <p>
          We help greenhouse growers, numerical farm managers, and CEA planners estimate costs, profit, energy usage, ROI, and payback periods for controlled-environment agriculture and greenhouse systems.
        </p>
        <p>
          The goal of this platform is to help users make practical investment and operating decisions with clear, data-driven tools that are fast and easy to use. Whether you are planning a small hoop house or a massive glass greenhouse facility, understanding your startup costs, heating requirements, and crop profitability is essential.
        </p>
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">The Rural Utility Cost Ecosystem</h3>
          <p className="text-sm">
            This tool is not a standalone brand; it is proudly part of the RuralUtilityCost.com master ecosystem. We aim to keep the master site as the source of truth, adding specialized context here for greenhouse operators.
          </p>
        </div>
      </div>
    </div>
  );
}
