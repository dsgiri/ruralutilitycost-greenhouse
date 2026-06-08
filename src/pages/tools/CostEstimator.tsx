import React from "react";
import { GREENHOUSE_TYPES, GreenhouseType } from "@/types";
import { Calculator, DollarSign, Sprout } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";

const TYPE_BASE_COST_PSF: Record<GreenhouseType, number> = {
  glass: 35.0,
  poly: 15.0,
  hoop: 4.0,
  high_tunnel: 6.0,
  shade: 3.0,
  indoor: 120.0,
  hybrid: 45.0,
};

const COLORS = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

export function CostEstimator() {
  const [area, setArea] = useCalculationHistory<number>("costEstimator", "area", 3000);
  const [type, setType] = useCalculationHistory<GreenhouseType>("costEstimator", "type", "poly");
  const [sitePrepCost, setSitePrepCost] = useCalculationHistory<number>("costEstimator", "sitePrepCost", 5000);
  const [automationLevel, setAutomationLevel] = useCalculationHistory<"low" | "medium" | "high">("costEstimator", "automationLevel", "medium");

  const baseCost = area * TYPE_BASE_COST_PSF[type];
  
  const automationMultiplier = automationLevel === "low" ? 0.05 : automationLevel === "medium" ? 0.15 : 0.35;
  const automationCost = baseCost * automationMultiplier;
  
  const laborToBuildCost = baseCost * 0.25; // Estimate 25% of material cost for labor
  const contingency = (baseCost + automationCost + sitePrepCost + laborToBuildCost) * 0.10; // 10% contingency

  const totalCapEx = baseCost + automationCost + sitePrepCost + laborToBuildCost + contingency;

  const chartData = [
    { name: "Structure & Cover", value: baseCost },
    { name: "Climate & Automation", value: automationCost },
    { name: "Site Prep & Utilities", value: sitePrepCost },
    { name: "Labor to Build", value: laborToBuildCost },
    { name: "Contingency (10%)", value: contingency },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Startup Cost Estimator</h1>
        <p className="text-slate-600">Estimate initial build and setup capital expenditures (CapEx).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-semibold text-slate-900">Parameters</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Structure Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as GreenhouseType)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(GREENHOUSE_TYPES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Growing Area (sq ft)</label>
              <input
                type="number"
                min="0"
                step="100"
                value={area || ""}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Climate & Automation</label>
              <select
                value={automationLevel}
                onChange={(e) => setAutomationLevel(e.target.value as any)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="low">Low (Manual venting, basic heating)</option>
                <option value="medium">Medium (Thermostats, automated roll-ups/fans)</option>
                <option value="high">High (Full environmental computer, shade curtains, LEDs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Site Prep Cost ($)</label>
              <input
                type="number"
                min="0"
                step="500"
                value={sitePrepCost || ""}
                onChange={(e) => setSitePrepCost(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-500 mt-1">Grading, water/electric hookups.</p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Estimated CapEx</p>
              <h3 className="text-4xl font-bold tracking-tight">
                ${totalCapEx.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </h3>
            </div>
            <div className="bg-slate-800 p-4 rounded-full hidden sm:block">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Breakdown</h3>
            <div className="space-y-3">
              {chartData.map((item, i) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 mt-2 flex justify-between items-center text-sm font-semibold">
                <span>Total</span>
                <span>${totalCapEx.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Distribution</h3>
            <div className="flex-1 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-200 flex gap-4">
             <div className="mt-1"><Sprout className="w-5 h-5 text-slate-400" /></div>
             <div>
                <h4 className="text-sm font-semibold text-slate-900">Per Square Foot</h4>
                <p className="text-sm text-slate-600 mt-1">
                  At this specification, your fully-loaded build cost is <strong>${(totalCapEx / area).toFixed(2)} / sq ft</strong>. 
                  Use this figure to quickly estimate similar future expansions.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
