/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { CalculationHistoryProvider } from "./context/CalculationHistoryContext";
import { Shell } from "./components/layout/Shell";
import { CookieBanner } from "./components/CookieBanner";

const Home = React.lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const Favorites = React.lazy(() => import("./pages/Favorites").then(module => ({ default: module.Favorites })));
const About = React.lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const CostEstimator = React.lazy(() => import("./pages/tools/CostEstimator").then(module => ({ default: module.CostEstimator })));
const HeatingCalculator = React.lazy(() => import("./pages/tools/HeatingCalculator").then(module => ({ default: module.HeatingCalculator })));
const ROICalculator = React.lazy(() => import("./pages/tools/ROICalculator").then(module => ({ default: module.ROICalculator })));
const CropProfitability = React.lazy(() => import("./pages/tools/CropProfitability").then(module => ({ default: module.CropProfitability })));
const ScenarioCompare = React.lazy(() => import("./pages/tools/ScenarioCompare").then(module => ({ default: module.ScenarioCompare })));
const NotFound = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.NotFound })));

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Analytics page_view event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null;
}

function PageLoader() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <CalculationHistoryProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Shell />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="about" element={<About />} />
                
                {/* Tools */}
                <Route path="estimate" element={<CostEstimator />} />
                <Route path="heating" element={<HeatingCalculator />} />
                <Route path="roi" element={<ROICalculator />} />
                <Route path="crops" element={<CropProfitability />} />
                <Route path="compare" element={<ScenarioCompare />} />
                
                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </CalculationHistoryProvider>
    </HelmetProvider>
  );
}
