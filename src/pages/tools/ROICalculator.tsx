import React from "react";
import { TrendingUp, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";
import { SEO } from "@/components/SEO";

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useCalculationHistory<number>("roiCalc", "initialInvestment", 100000);
  const [annualRevenue, setAnnualRevenue] = useCalculationHistory<number>("roiCalc", "annualRevenue", 50000);
  const [operatingExpenses, setOperatingExpenses] = useCalculationHistory<number>("roiCalc", "operatingExpenses", 20000);

  const annualCashFlow = annualRevenue - operatingExpenses;
  const paybackPeriod = annualCashFlow > 0 ? initialInvestment / annualCashFlow : 0;
  
  // 5-year ROI
  const totalReturn5y = (annualCashFlow * 5) - initialInvestment;
  const roi5y = (totalReturn5y / initialInvestment) * 100;

  // Generate chart data mapping 10 years of cumulative cash flow
  const chartData = Array.from({ length: 11 }, (_, i) => {
    const cumulativeCashFlow = (annualCashFlow * i) - initialInvestment;
    return {
      year: `Year ${i}`,
      balance: cumulativeCashFlow,
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SEO 
        title="Greenhouse ROI & Payback Calculator" 
        description="Estimate return on investment with our Greenhouse ROI & Payback Calculator. Make evidence-based decisions for your controlled-environment agriculture operations." 
        canonicalUrl="https://greenhouse.ruralutilitycost.com/roi" 
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">ROI & Payback Calculator</h1>
        <p className="text-slate-600">Determine how long it takes to recover capital and estimate 5-year return.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-slate-900">Financial Inputs</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total CapEx ($)</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={initialInvestment || ""}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Annual Revenue ($)</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={annualRevenue || ""}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Annual OpEx ($)</label>
              <input
                type="number"
                min="0"
                step="500"
                value={operatingExpenses || ""}
                onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-slate-600">Net Annual Cash Flow</span>
                <span className="font-semibold text-slate-900">${annualCashFlow.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          <div className="flex-1 bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800">
             <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Payback Period</p>
             <h3 className="text-4xl font-bold tracking-tight">
               {annualCashFlow > 0 ? `${paybackPeriod.toFixed(1)} yrs` : "Never"}
             </h3>
             <p className="text-xs text-slate-400 mt-2">Time required to break even.</p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">5-Year ROI</p>
             <h3 className="text-4xl font-bold tracking-tight text-slate-900">
               {roi5y.toFixed(1)}%
             </h3>
             <p className="text-xs text-slate-500 mt-2">Yield on capital after 5 years.</p>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[350px] flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Cumulative Cash Flow (10 Years)</h3>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    formatter={(value: number) => [`$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 'Balance']}
                  />
                  {/* Reference line for breakeven (Y=0) */}
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#94a3b8" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="balance" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4">
             <div className="mt-1"><RefreshCw className="w-5 h-5 text-blue-400" /></div>
             <div>
                <h4 className="text-sm font-semibold text-blue-900">Capital Cycle Note</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Poly film typically needs replacement every 4 years, and polycarbonate every 10-15 years. This simple payback model does not account for recurring CapEx or tax depreciation.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
