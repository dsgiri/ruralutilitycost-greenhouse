import { ToolDef } from "./types";

export const TOOLS: ToolDef[] = [
  {
    id: "cost-estimator",
    title: "Greenhouse Startup Cost Calculator",
    description: "Estimate initial build and setup costs for new controlled-environment projects.",
    category: "startup cost",
    primaryOutcome: "Total estimated CapEx",
    path: "/estimate",
  },
  {
    id: "heating-calculator",
    title: "Heating Cost Calculator",
    description: "Forecast monthly and annual heating expenses based on climate and fuel type.",
    category: "heating",
    primaryOutcome: "Monthly heating opex",
    path: "/heating",
  },
  {
    id: "energy-forecast",
    title: "Energy Cost Forecast Tool",
    description: "Calculate expected electricity usage for lighting, fans, and automation.",
    category: "energy",
    primaryOutcome: "Annual kWh & cost",
    path: "/heating", // Combine heating and energy into one view for simplicity or discrete? Let's use /heating for both for now.
  },
  {
    id: "crop-profit",
    title: "Crop Profitability Calculator",
    description: "Compare crops by yield, market price, and operating expenses.",
    category: "crop profit",
    primaryOutcome: "Gross margin per sq ft",
    path: "/crops",
  },
  {
    id: "roi-payback",
    title: "ROI & Payback Period Calculator",
    description: "Determine how long it takes to recover your investment.",
    category: "ROI",
    primaryOutcome: "Years to payback",
    path: "/roi",
  },
  {
    id: "scenario-compare",
    title: "Scenario Comparison Grid",
    description: "Compare multiple greenhouse plans side by side to make evidence-based decisions.",
    category: "scenario modeling",
    primaryOutcome: "Side-by-side metrics",
    path: "/compare",
  },
];
