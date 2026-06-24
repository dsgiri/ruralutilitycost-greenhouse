import React from "react";
import { Leaf, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useCalculationHistory } from "@/context/CalculationHistoryContext";
import { SEO } from "@/components/SEO";

type CropConfig = {
  id: string;
  name: string;
  yieldPerSqFt: number; // lbs per sq ft per year
  pricePerLb: number;
  costPerSqFt: number; // OpEx
};

const DEFAULT_CROPS: CropConfig[] = [
  { id: "1", name: "Tomatoes (Hydro)", yieldPerSqFt: 10, pricePerLb: 2.20, costPerSqFt: 12.00 },
  { id: "2", name: "Lettuce (NFT)", yieldPerSqFt: 15, pricePerLb: 1.80, costPerSqFt: 15.00 },
  { id: "3", name: "Microgreens", yieldPerSqFt: 5, pricePerLb: 25.00, costPerSqFt: 60.00 },
];

export function CropProfitability() {
  const [crops, setCrops] = useCalculationHistory<CropConfig[]>("cropProfit", "crops", DEFAULT_CROPS);

  const updateCrop = (id: string, field: keyof CropConfig, value: number | string) => {
    setCrops(crops.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const chartData = crops.map(c => {
    const revenue = c.yieldPerSqFt * c.pricePerLb;
    const profit = revenue - c.costPerSqFt;
    return {
      name: c.name,
      Revenue: Number(revenue.toFixed(2)),
      Cost: Number(c.costPerSqFt.toFixed(2)),
      Profit: Number(profit.toFixed(2)),
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SEO 
        title="Greenhouse Crop Profitability Calculator" 
        description="Estimate crop profitability with our Greenhouse Crop Profitability Calculator. Make evidence-based decisions for your controlled-environment agriculture operations." 
        canonicalUrl="https://greenhouse.ruralutilitycost.com/crops" 
      />
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Crop Profitability Comparison</h1>
        <p className="text-slate-600">Compare expected revenue and gross margin per square foot.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
            <Leaf className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-slate-900">Crop Metrics (Annual per Sq Ft)</h2>
          </div>

          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="pb-3 font-medium">Crop Name</th>
                <th className="pb-3 font-medium">Yield (lbs)</th>
                <th className="pb-3 font-medium">Price/lb ($)</th>
                <th className="pb-3 font-medium">OpEx Cost ($)</th>
                <th className="pb-3 font-medium text-right">Margin ($)</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => {
                const revenue = crop.yieldPerSqFt * crop.pricePerLb;
                const margin = revenue - crop.costPerSqFt;
                return (
                  <tr key={crop.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="py-3">
                      <input 
                        type="text" 
                        value={crop.name}
                        onChange={(e) => updateCrop(crop.id, "name", e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-green-500 focus:outline-none transition-colors max-w-[150px]"
                      />
                    </td>
                    <td className="py-3">
                      <input 
                        type="number" 
                        min="0" step="0.1"
                        value={crop.yieldPerSqFt}
                        onChange={(e) => updateCrop(crop.id, "yieldPerSqFt", Number(e.target.value))}
                        className="w-24 bg-transparent border-b border-slate-200 focus:border-green-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-3">
                      <input 
                        type="number" 
                        min="0" step="0.1"
                        value={crop.pricePerLb}
                        onChange={(e) => updateCrop(crop.id, "pricePerLb", Number(e.target.value))}
                        className="w-24 bg-transparent border-b border-slate-200 focus:border-green-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-3">
                      <input 
                        type="number" 
                        min="0" step="0.5"
                        value={crop.costPerSqFt}
                        onChange={(e) => updateCrop(crop.id, "costPerSqFt", Number(e.target.value))}
                        className="w-24 bg-transparent border-b border-slate-200 focus:border-green-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-semibold ${margin > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        ${margin.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Per Sq Ft Value Breakdown</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#64748b' }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Revenue" fill="#0f172a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
