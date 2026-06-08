import React from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "@/data";
import { ToolCard } from "@/components/ui/ToolCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Settings2 } from "lucide-react";

export function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteTools = TOOLS.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Favorite Tools</h1>
        <p className="text-slate-600">Quick access to your saved calculators and estimators.</p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center max-w-2xl mx-auto mt-12">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Settings2 className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No favorites yet</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            You haven't added any tools to your favorites. Click the heart icon on any tool card to save it here for quick access later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Browse Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
