"use client";

import React, { useState, useEffect } from "react";
import { useGridState } from "../context/GridStateContext";
import OverviewMetrics from "../components/dashboard/OverviewMetrics";
import ImpactEstimator from "../components/dashboard/ImpactEstimator";
import DemandChart from "../components/dashboard/DemandChart";
import OrchestrationPanel from "../components/dashboard/OrchestrationPanel";
import GridMarketplace from "../components/dashboard/GridMarketplace";
import AIAssistant from "../components/dashboard/AIAssistant";
import SimulationPanel from "../components/dashboard/SimulationPanel";
import { RefreshCw } from "lucide-react";

export default function DashboardContent() {
  const { state } = useGridState();
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGridData() {
      try {
        const res = await fetch(`/api/grid-metrics?scenario=${state.scenario}`);
        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.error("Failed to query GridMind core API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGridData();

    const interval = setInterval(fetchGridData, 3000);

    return () => clearInterval(interval);
  }, [state.scenario]);

  return (
    <div id="overview" className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8 scroll-mt-20">
      
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1E2522]">
              Grid Optimization Command Center
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Real-time active tracking, forecast analysis, and decentralized telemetry.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {loading && !apiData && (
              <span className="text-xs text-stone-400 flex items-center gap-1.5 font-medium animate-pulse">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Querying API Engine...
              </span>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${state.gridStatusColor}`}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Grid Status: {state.gridStatusLabel} ({apiData?.latestTelemetry?.active_power_kw || state.activeLoadKw} kW)
            </div>
          </div>
        </div>
      </div>

      <OverviewMetrics latestTelemetry={apiData?.latestTelemetry} />

      <ImpactEstimator />

      <div id="forecast" className="grid grid-cols-1 gap-6 scroll-mt-20">
        <DemandChart data={apiData?.forecastChartData} loading={loading && !apiData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        <div id="orchestration" className="scroll-mt-20">
          <OrchestrationPanel />
        </div>
        <div id="marketplace" className="scroll-mt-20">
          <GridMarketplace nilmLogs={apiData?.nilmLogs} />
        </div>
      </div>

      <SimulationPanel />

      <AIAssistant />
    </div>
  );
}