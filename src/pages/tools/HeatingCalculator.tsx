import React from "react";
import { Flame, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";

export function HeatingCalculator() {
  const [area, setArea] = useCalculationHistory<number>("heatingCalc", "area", 3000);
  const [deltaT, setDeltaT] = useCalculationHistory<number>("heatingCalc", "deltaT", 40); // Temp difference
  const [coverType, setCoverType] = useCalculationHistory<string>("heatingCalc", "coverType", "double_poly");
  const [fuelType, setFuelType] = useCalculationHistory<string>("heatingCalc", "fuelType", "natural_gas");
  const [fuelPrice, setFuelPrice] = useCalculationHistory<number>("heatingCalc", "fuelPrice", 1.20); // per therm or gallon

  // U-values (BTU/hr-sqft-degF)
  const U_VALUES: Record<string, number> = {
    single_poly: 1.15,
    double_poly: 0.70,
    glass: 1.10,
    polycarbonate_twin: 0.55,
  };

  // Efficiency and units per million BTU
  const FUEL_DATA: Record<string, { efficiency: number, unitBtu: number, unitLabel: string }> = {
    natural_gas: { efficiency: 0.80, unitBtu: 100000, unitLabel: "Therm" },
    propane: { efficiency: 0.80, unitBtu: 91500, unitLabel: "Gallon" },
    fuel_oil: { efficiency: 0.80, unitBtu: 138000, unitLabel: "Gallon" },
    electricity: { efficiency: 1.00, unitBtu: 3412, unitLabel: "kWh" },
  };

  // Approximate surface area to floor area ratio (1.5 for average greenhouse)
  const surfaceArea = area * 1.5;
  const uValue = U_VALUES[coverType];
  
  // Peak BTU/hr requirement
  const peakBtuHr = surfaceArea * deltaT * uValue;

  // Assuming average heating hours per month for a typical winter case (~ 600 hours)
  const heatingHoursPerMonth = 600; 
  const monthlyBtu = peakBtuHr * heatingHoursPerMonth * 0.5; // Average load is roughly 50% of peak across those hours

  const fuel = FUEL_DATA[fuelType];
  const unitsRequired = (monthlyBtu / fuel.unitBtu) / fuel.efficiency;
  const monthlyCost = unitsRequired * fuelPrice;

  // Simple projection for winter months (high to low)
  const chartData = [
    { name: "Nov", cost: monthlyCost * 0.6 },
    { name: "Dec", cost: monthlyCost * 0.9 },
    { name: "Jan", cost: monthlyCost * 1.0 },
    { name: "Feb", cost: monthlyCost * 0.85 },
    { name: "Mar", cost: monthlyCost * 0.5 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Heating Cost Calculator</h1>
        <p className="text-slate-600">Forecast peak heating loads and estimate monthly fuel expenses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-slate-900">Heating Parameters</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Growing Area (sq ft)</label>
              <input
                type="number"
                min="100"
                step="100"
                value={area || ""}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Temp Diff. (ΔT in °F)</label>
              <input
                type="number"
                min="0"
                step="5"
                value={deltaT || ""}
                onChange={(e) => setDeltaT(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-slate-500 mt-1">Indoor target min minus worst outdoor cold.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Material</label>
              <select
                value={coverType}
                onChange={(e) => setCoverType(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="single_poly">Single Poly Film (U=1.15)</option>
                <option value="double_poly">Double Poly Inflated (U=0.70)</option>
                <option value="glass">Single Glass (U=1.10)</option>
                <option value="polycarbonate_twin">Twin-wall Polycarbonate (U=0.55)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="natural_gas">Natural Gas (80% eff)</option>
                <option value="propane">Propane (80% eff)</option>
                <option value="fuel_oil">Fuel Oil #2 (80% eff)</option>
                <option value="electricity">Electricity (100% eff)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fuel Price ($ / {fuel.unitLabel})
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={fuelPrice || ""}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Peak Heating Load</p>
               <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                 {peakBtuHr.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg text-slate-500 font-normal">BTU/hr</span>
               </h3>
               <p className="text-xs text-slate-500 mt-2">Equipment sizing requirement.</p>
            </div>
            <div className="flex-1 bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800">
               <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Peak Month Cost</p>
               <h3 className="text-3xl font-bold tracking-tight">
                 ${monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} 
               </h3>
               <p className="text-xs text-slate-400 mt-2">Estimated max monthly operating expense.</p>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex flex-col">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Estimated Winter Cost Profile</h3>
            <div className="flex-1 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    formatter={(value: number) => [`$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 'Cost']}
                  />
                  <Bar dataKey="cost" fill="#0f172a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:col-span-2 bg-orange-50 p-6 rounded-xl border border-orange-100 flex gap-4">
             <div className="mt-1"><Info className="w-5 h-5 text-orange-400" /></div>
             <div>
                <h4 className="text-sm font-semibold text-orange-900">Interpretation</h4>
                <p className="text-sm text-orange-800 mt-1">
                  Heating loads change significantly with wind, solar gain, and thermal mass. These estimates use standard worst-case ΔT design methodology (ASAE standards). Always consult an HVAC engineer for final boiler/heater sizing.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
