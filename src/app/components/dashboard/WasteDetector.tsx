"use client";

import React, { useState } from "react";
import { useGridState } from "../../context/GridStateContext";
import { ShieldAlert, CheckCircle, Flame, ArrowRight, ShieldCheck } from "lucide-react";

export default function WasteDetector() {
  const { state } = useGridState();
  const [overrideActive, setOverrideActive] = useState(false);

  const getAnomalyData = () => {
    if (overrideActive) {
      return {
        count: 0,
        title: "All Anomalies Resolved",
        desc: "Shedding algorithms have successfully optimized concurrent grid draw.",
        severity: "resolved",
        badgeColor: "bg-emerald-50 text-[#119785] border-emerald-100",
      };
    }

    switch (state.scenario) {
      case "peak":
        return {
          count: 1,
          title: "Potential Overload Detected",
          desc: "Concurrent high-draw appliances (HVAC & EV Charger) active during peak tariff hours, exceeding your configured soft threshold of 8.0 kW.",
          severity: "high",
          badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
        };
      case "dirty":
        return {
          count: 1,
          title: "Carbon-Sync Non-Compliance",
          desc: "Heavy appliances active while regional coal reserves are online. Running load now incurs 3x standard lifecycle carbon emissions.",
          severity: "medium",
          badgeColor: "bg-stone-100 text-stone-700 border-stone-200",
        };
      default:
        return {
          count: 0,
          title: "Grid Optimization Stable",
          desc: "No unnecessary continuous baseloads or anomalous transient spikes identified.",
          severity: "none",
          badgeColor: "bg-emerald-50 text-[#119785] border-emerald-100",
        };
    }
  };

  const anomaly = getAnomalyData();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start border-b border-stone-100 pb-4 mb-5">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">Waste & Anomaly Detection</h3>
            <p className="text-xs text-stone-500 mt-1">Real-time heuristics monitoring continuous baseload leaks.</p>
          </div>
          <span className={`p-2 rounded-xl text-xs font-bold border ${anomaly.badgeColor}`}>
            {anomaly.count} Active
          </span>
        </div>

        <div className="space-y-4">
          {anomaly.severity === "none" || anomaly.severity === "resolved" ? (
            <div className="flex items-start gap-3 p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-xl">
              <ShieldCheck className="h-5 w-5 text-[#119785] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">{anomaly.title}</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{anomaly.desc}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
              <ShieldAlert className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">{anomaly.title}</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{anomaly.desc}</p>
                
                <button
                  onClick={() => setOverrideActive(true)}
                  className="mt-4 flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#119785] text-white rounded-lg hover:bg-[#0D7F6F] transition-all active:scale-95"
                >
                  Auto-Shed Concurrency <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-150 flex items-center justify-between text-[11px] font-semibold text-stone-500">
        <span className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-orange-600" /> Continuous Baseline Leak Tracker
        </span>
        <span className="text-stone-700 font-mono">0.25 kW (Stable)</span>
      </div>
    </div>
  );
}