/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shell } from "./components/layout/Shell";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Legal } from "./pages/Legal";
import { CostEstimator } from "./pages/tools/CostEstimator";
import { HeatingCalculator } from "./pages/tools/HeatingCalculator";
import { ROICalculator } from "./pages/tools/ROICalculator";
import { CropProfitability } from "./pages/tools/CropProfitability";
import { ScenarioCompare } from "./pages/tools/ScenarioCompare";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal" element={<Legal />} />
          
          {/* Tools */}
          <Route path="estimate" element={<CostEstimator />} />
          <Route path="heating" element={<HeatingCalculator />} />
          <Route path="roi" element={<ROICalculator />} />
          <Route path="crops" element={<CropProfitability />} />
          <Route path="compare" element={<ScenarioCompare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
