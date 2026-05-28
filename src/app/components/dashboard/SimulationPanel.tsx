"use client";

import React, { useState } from "react";
import { useGridState, GridScenario } from "../../context/GridStateContext";
import { Play, Settings, RefreshCw } from "lucide-react";

export default function SimulationPanel() {
  const { state, setScenario } = useGridState();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <div className="bg-white border border-stone-250 rounded-2xl shadow-2xl overflow-hidden w-[280px]">
        {/* Header */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-stone-900 text-stone-100 p-3.5 flex justify-between items-center text-xs font-bold"
        >
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Settings className="h-4 w-4 text-[#119785] animate-spin-slow" /> Demo Control Panel
          </span>
          <span className="text-[10px] text-stone-400">
            {expanded ? "Collapse" : "Expand"}
          </span>
        </button>

        {/* Control Buttons */}
        {expanded && (
          <div className="p-4 space-y-2.5 bg-stone-50/50">
            <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mb-2">Select Active Scenario:</p>
            
            {/* Scenario 1: Normal */}
            <button
              onClick={() => setScenario("normal")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                state.scenario === "normal"
                  ? "bg-[#119785]/10 border-[#119785] text-[#119785]"
                  : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
              }`}
            >
              <span>1. Standard Day (Clean)</span>
              <Play className="h-3.5 w-3.5 opacity-60" />
            </button>

            {/* Scenario 2: Peak Stress */}
            <button
              onClick={() => setScenario("peak")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                state.scenario === "peak"
                  ? "bg-orange-50 border-orange-500 text-orange-600"
                  : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
              }`}
            >
              <span>2. Peak Grid Stress</span>
              <Play className="h-3.5 w-3.5 opacity-60" />
            </button>

            {/* Scenario 3: High Carbon */}
            <button
              onClick={() => setScenario("dirty")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                state.scenario === "dirty"
                  ? "bg-stone-200 border-stone-700 text-stone-800"
                  : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
              }`}
            >
              <span>3. High Carbon Peak</span>
              <Play className="h-3.5 w-3.5 opacity-60" />
            </button>

            <div className="pt-2 border-t border-stone-200 mt-2 text-[10px] text-stone-400 flex items-center gap-1">
              <RefreshCw className="h-3 w-3 flex-shrink-0" />
              <span>Clicking dynamically shifts all dashboard states.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}