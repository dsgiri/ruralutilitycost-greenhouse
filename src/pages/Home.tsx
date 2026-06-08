import React from "react";
import { TOOLS } from "@/data";
import { ToolCard } from "@/components/ui/ToolCard";
import { useFavorites } from "@/hooks/useFavorites";

export function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="space-y-12">
      <section className="text-center max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Greenhouse Economics & Planning
        </h1>
        <p className="text-lg text-slate-600">
          Make evidence-based decisions for setup costs, heating expenses, crop profitability, and return on investment in controlled-environment agriculture.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">All Planning Tools</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {TOOLS.length} Tools
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
