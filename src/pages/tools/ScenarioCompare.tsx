import React from "react";
import { GitCompare } from "lucide-react";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";

type Scenario = {
  name: string;
  area: number;
  capexPsf: number;
  opexPsf: number;
  revenuePsf: number;
};

export function ScenarioCompare() {
  const [s1, setS1] = useCalculationHistory<Scenario>("scenarioCompare", "s1", {
    name: "High Tunnel Veggies",
    area: 5000,
    capexPsf: 6,
    opexPsf: 5,
    revenuePsf: 8,
  });

  const [s2, setS2] = useCalculationHistory<Scenario>("scenarioCompare", "s2", {
    name: "Glass Hydroponic",
    area: 5000,
    capexPsf: 45,
    opexPsf: 18,
    revenuePsf: 28,
  });

  const calculateMetrics = (s: Scenario) => {
    const totalCapex = s.area * s.capexPsf;
    const totalOpex = s.area * s.opexPsf;
    const totalRevenue = s.area * s.revenuePsf;
    const profit = totalRevenue - totalOpex;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const payback = profit > 0 ? totalCapex / profit : 0;

    return { totalCapex, totalOpex, totalRevenue, profit, margin, payback };
  };

  const m1 = calculateMetrics(s1);
  const m2 = calculateMetrics(s2);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Scenario Comparison Grid</h1>
        <p className="text-slate-600">Compare capital intensity, margins, and payback of different setups.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           <GitCompare className="w-5 h-5 text-indigo-500" />
           <h2 className="text-lg font-semibold text-slate-900">Side-by-Side Analysis</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="p-4 font-medium w-1/3">Metric</th>
                <th className="p-4 font-medium w-1/3 border-l border-slate-200">
                  <input
                    type="text"
                    value={s1.name}
                    onChange={(e) => setS1({...s1, name: e.target.value})}
                    className="w-full bg-transparent font-semibold text-slate-900 focus:outline-none focus:border-b focus:border-indigo-500"
                  />
                </th>
                <th className="p-4 font-medium w-1/3 border-l border-slate-200">
                  <input
                    type="text"
                    value={s2.name}
                    onChange={(e) => setS2({...s2, name: e.target.value})}
                    className="w-full bg-transparent font-semibold text-slate-900 focus:outline-none focus:border-b focus:border-indigo-500"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Inputs */}
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">Area (sq ft)</td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s1.area} onChange={(e) => setS1({...s1, area: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s2.area} onChange={(e) => setS2({...s2, area: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">CapEx ($/sqft)</td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s1.capexPsf} onChange={(e) => setS1({...s1, capexPsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s2.capexPsf} onChange={(e) => setS2({...s2, capexPsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">OpEx ($/sqft)</td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s1.opexPsf} onChange={(e) => setS1({...s1, opexPsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s2.opexPsf} onChange={(e) => setS2({...s2, opexPsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <td className="p-4 font-medium text-slate-700">Revenue ($/sqft)</td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s1.revenuePsf} onChange={(e) => setS1({...s1, revenuePsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
                <td className="p-4 border-l border-slate-100">
                  <input type="number" value={s2.revenuePsf} onChange={(e) => setS2({...s2, revenuePsf: Number(e.target.value)})} className="w-full bg-transparent focus:outline-none border-b border-slate-300" />
                </td>
              </tr>

              {/* Calculated Results */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-medium text-slate-700">Total CapEx</td>
                <td className="p-4 border-l border-slate-100 text-slate-900 font-medium">${m1.totalCapex.toLocaleString()}</td>
                <td className="p-4 border-l border-slate-100 text-slate-900 font-medium">${m2.totalCapex.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-medium text-slate-700">Annual OpEx</td>
                <td className="p-4 border-l border-slate-100 text-slate-600">${m1.totalOpex.toLocaleString()}</td>
                <td className="p-4 border-l border-slate-100 text-slate-600">${m2.totalOpex.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-medium text-slate-700">Annual Revenue</td>
                <td className="p-4 border-l border-slate-100 text-green-700 font-medium">${m1.totalRevenue.toLocaleString()}</td>
                <td className="p-4 border-l border-slate-100 text-green-700 font-medium">${m2.totalRevenue.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-4 font-medium text-slate-700">Net Annual Profit</td>
                <td className="p-4 border-l border-slate-100 text-slate-900 font-bold">${m1.profit.toLocaleString()}</td>
                <td className="p-4 border-l border-slate-100 text-slate-900 font-bold">${m2.profit.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-slate-100 bg-indigo-50/30">
                <td className="p-4 font-medium text-indigo-900">Gross Margin</td>
                <td className="p-4 border-l border-indigo-100 text-indigo-900 font-semibold">{m1.margin.toFixed(1)}%</td>
                <td className="p-4 border-l border-indigo-100 text-indigo-900 font-semibold">{m2.margin.toFixed(1)}%</td>
              </tr>
              <tr className="bg-indigo-50/50">
                <td className="p-4 font-medium text-indigo-900">Payback Period</td>
                <td className="p-4 border-l border-indigo-100 text-indigo-900 font-semibold">
                  {m1.payback > 0 ? `${m1.payback.toFixed(1)} years` : "Never"}
                </td>
                <td className="p-4 border-l border-indigo-100 text-indigo-900 font-semibold">
                  {m2.payback > 0 ? `${m2.payback.toFixed(1)} years` : "Never"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
