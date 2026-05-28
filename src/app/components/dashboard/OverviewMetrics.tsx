"use client";

import React, { useState } from "react";
import { useGridState } from "../../context/GridStateContext";
import { Zap, Leaf, Gauge, DollarSign, Info, TrendingUp, AlertCircle } from "lucide-react";

type MetricHoverState = "load" | "carbon" | "efficiency" | "tariff" | null;

interface OverviewMetricsProps {
  latestTelemetry?: {
    active_power_kw: number;
    voltage_v: number;
    current_a: number;
  };
}

export default function OverviewMetrics({ latestTelemetry }: OverviewMetricsProps) {
  const { state } = useGridState();
  const [activeHover, setActiveHover] = useState<MetricHoverState>(null);

  const displayLoad = latestTelemetry ? latestTelemetry.active_power_kw : state.activeLoadKw;
  const displayVoltage = latestTelemetry ? latestTelemetry.voltage_v : 230.0;
  const displayCurrent = latestTelemetry ? latestTelemetry.current_a : parseFloat((displayLoad / 0.23).toFixed(1));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
      
      <div 
        className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-in-out hover:border-emerald-800/30 hover:shadow-md hover:-translate-y-[2px] cursor-help relative overflow-hidden"
        onMouseEnter={() => setActiveHover("load")}
        onMouseLeave={() => setActiveHover(null)}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Grid Load</span>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
            <Zap className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-stone-900 tracking-tight">
            {displayLoad} <span className="text-lg font-medium text-stone-500">kW</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-800">
          <TrendingUp className={`h-3 w-3 ${state.scenario === "peak" ? "" : "rotate-180"}`} />
          <span>{state.scenario === "peak" ? "+100% surge" : "-4.3% reduction"}</span>
        </div>
        <div className={`absolute inset-x-0 bottom-0 bg-stone-900 text-stone-100 text-[11px] p-3 transition-all duration-200 ease-in-out border-t border-stone-800 ${activeHover === "load" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
          <div className="flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
            <p>Active Ingress: {displayVoltage}V @ {displayCurrent}A streaming from live sensor registers.</p>
          </div>
        </div>
      </div>

      <div 
        className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-in-out hover:border-emerald-800/30 hover:shadow-md hover:-translate-y-[2px] cursor-help relative overflow-hidden"
        onMouseEnter={() => setActiveHover("carbon")}
        onMouseLeave={() => setActiveHover(null)}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Grid Carbon Index</span>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
            <Leaf className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-stone-900 tracking-tight">
            {state.carbonIntensityG} 
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-2 ${
              state.carbonIntensityG > 300 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-800"
            }`}>
              {state.carbonIntensityG > 300 ? "Dirty" : "Clean"}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-stone-500">
          <span>Primary source: {state.carbonIntensityG > 300 ? "Fossil Reserves (Gas/Coal)" : "Wind/Solar High"}</span>
        </div>
        <div className={`absolute inset-x-0 bottom-0 bg-stone-900 text-stone-100 text-[11px] p-3 transition-all duration-200 ease-in-out border-t border-stone-800 ${activeHover === "carbon" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
          <div className="flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
            <p>Real-time data retrieved from regional grid API. Low carbon intensity supports heavy loads.</p>
          </div>
        </div>
      </div>

      <div 
        className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-in-out hover:border-emerald-800/30 hover:shadow-md hover:-translate-y-[2px] cursor-help relative overflow-hidden"
        onMouseEnter={() => setActiveHover("efficiency")}
        onMouseLeave={() => setActiveHover(null)}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Efficiency Rating</span>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
            <Gauge className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-800 tracking-tight">
            {state.efficiencyScore}%
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-stone-500">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${state.efficiencyScore < 70 ? "bg-red-600" : "bg-emerald-600"}`} />
          <span>{state.efficiencyScore < 70 ? "Peak surge warning active" : "Optimal power factor (0.96)"}</span>
        </div>
        <div className={`absolute inset-x-0 bottom-0 bg-stone-900 text-stone-100 text-[11px] p-3 transition-all duration-200 ease-in-out border-t border-stone-800 ${activeHover === "efficiency" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
          <div className="flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
            <p>Based on low peak-usage alignment, active power-factor, and zero active phase anomalies.</p>
          </div>
        </div>
      </div>

      <div 
        className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-in-out hover:border-orange-600/30 hover:shadow-md hover:-translate-y-[2px] cursor-help relative overflow-hidden"
        onMouseEnter={() => setActiveHover("tariff")}
        onMouseLeave={() => setActiveHover(null)}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Utility Rate Plan</span>
          <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-stone-900 tracking-tight">
            ${state.tariffRate} <span className="text-xs font-medium text-stone-500">/ kWh</span>
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-orange-600">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{state.tariffStatus} rate active</span>
        </div>
        <div className={`absolute inset-x-0 bottom-0 bg-stone-900 text-stone-100 text-[11px] p-3 transition-all duration-200 ease-in-out border-t border-stone-800 ${activeHover === "tariff" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}>
          <div className="flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 mt-0.5 text-orange-500 flex-shrink-0" />
            <p>System automatically triggers V2G mitigation when rates exceed $0.20/kWh.</p>
          </div>
        </div>
      </div>

    </div>
  );
}