"use client";

import React from "react";
import { useGridState } from "../../context/GridStateContext";
import { DollarSign, Leaf, Sparkles, TrendingUp } from "lucide-react";

export default function ImpactEstimator() {
  const { state } = useGridState();

  // Dynamic calculations representing aggregate savings under different states
  const savingsData = {
    normal: {
      costSaved: "14.80",
      co2Deflected: "12.4",
      efficiencyGain: "14.2",
    },
    peak: {
      costSaved: "28.40", // High savings because V2G is actively avoiding the peak rate
      co2Deflected: "18.6",
      efficiencyGain: "26.8",
    },
    dirty: {
      costSaved: "16.10",
      co2Deflected: "32.4", // Huge carbon deflected because system avoids highly dirty coal power
      efficiencyGain: "18.5",
    }
  };

  const currentSavings = savingsData[state.scenario] || savingsData.normal;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Section Title */}
        <div className="space-y-1 md:max-w-xs border-r-0 md:border-r border-stone-200 pr-0 md:pr-6">
          <h4 className="text-xs font-black text-[#119785] tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Impact Analytics
          </h4>
          <h3 className="text-sm font-bold text-[#1E2522]">Cost & Carbon Estimator</h3>
          <p className="text-[11px] text-stone-500">Live projected offsets generated via smart-grid algorithms.</p>
        </div>

        {/* Metric 1: Financial Savings */}
        <div className="flex-1 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-[#119785] rounded-xl">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Weekly Cost Saved</p>
            <p className="text-xl font-bold text-stone-900 mt-0.5">
              ${currentSavings.costSaved}
            </p>
            <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
              {state.scenario === "peak" ? "⚡ V2G dispatch active" : "Optimized scheduling"}
            </p>
          </div>
        </div>

        {/* Metric 2: Carbon Offsets */}
        <div className="flex-1 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-[#119785] rounded-xl">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">CO₂ Deflected</p>
            <p className="text-xl font-bold text-stone-900 mt-0.5">
              {currentSavings.co2Deflected} <span className="text-xs font-medium text-stone-500">kg</span>
            </p>
            <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
              {state.scenario === "dirty" ? "🌳 High fossil-fuel avoidance" : "Renewable sync active"}
            </p>
          </div>
        </div>

        {/* Metric 3: Efficiency Gain */}
        <div className="flex-1 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-[#119785] rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Efficiency Gain</p>
            <p className="text-xl font-bold text-stone-900 mt-0.5">
              +{currentSavings.efficiencyGain}%
            </p>
            <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
              Over unoptimized baseline
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}