export type ToolCategory =
  | "startup cost"
  | "energy"
  | "heating"
  | "irrigation"
  | "labor"
  | "crop profit"
  | "ROI"
  | "payback"
  | "expansion"
  | "climate control"
  | "scenario modeling";

export interface ToolDef {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  primaryOutcome: string;
  path: string;
}

export type GreenhouseType =
  | "glass"
  | "poly"
  | "hoop"
  | "high_tunnel"
  | "shade"
  | "indoor"
  | "hybrid";

export const GREENHOUSE_TYPES: Record<GreenhouseType, string> = {
  glass: "Glass Greenhouse",
  poly: "Poly Greenhouse",
  hoop: "Hoop House",
  high_tunnel: "High Tunnel",
  shade: "Shade Structure",
  indoor: "Indoor / CEA System",
  hybrid: "Hybrid Protected Agriculture",
};
