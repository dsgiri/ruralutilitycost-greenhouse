import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { ToolDef } from "@/types";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolDef;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ToolCard({ tool, isFavorite, onToggleFavorite }: ToolCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md uppercase tracking-wider">
            {tool.category}
          </span>
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-1"
            aria-label={isFavorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
          {tool.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 flex-1">
          {tool.description}
        </p>
        <div className="text-sm border-t border-slate-100 pt-3 mb-4">
          <span className="text-slate-500">Outcome:</span>{" "}
          <span className="font-medium text-slate-800">{tool.primaryOutcome}</span>
        </div>
        <Link
          to={tool.path}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 mt-auto"
        >
          Launch Tool
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
