import React from "react";

export function Legal() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-4">
        Legal & Disclaimer
      </h1>
      <div className="prose prose-slate prose-green text-slate-700 space-y-6">
        <p className="font-semibold text-red-600">
          RESULTS ARE ESTIMATES ONLY.
        </p>
        <p>
          The calculators, tools, and information provided by the Greenhouse app (part of RuralUtilityCost.com) are for educational, planning, and estimation purposes only. 
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Climate, crop yields, energy rates, and market conditions can change actual outcomes significantly.</li>
          <li>This app does not replace professional engineering advice, agronomy advice, financial advice, or construction advice.</li>
          <li>We make no guarantees regarding the accuracy, completeness, or reliability of these estimates.</li>
        </ul>
        <p>
          Users must verify important operational and investment decisions independently using certified professionals (such as licensed agricultural engineers, financial planners, or local extension agents) before spending capital.
        </p>
        <p className="text-sm text-slate-500 pt-8 border-t border-slate-100">
          By using this tool, you acknowledge that you have read and understood this disclaimer, and agree that Rural Utility Cost and its creators are not liable for any losses, damages, or unintended outcomes resulting from decisions modeled in these tools.
        </p>
      </div>
    </div>
  );
}
