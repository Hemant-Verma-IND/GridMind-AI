"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Clock, Info } from "lucide-react";

interface ChartDataPoint {
  time: string;
  actual: number | null;
  predicted: number;
}

interface DemandChartProps {
  data?: ChartDataPoint[];
  loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const actualVal = payload[0]?.value;
    const predictedVal = payload[1]?.value;

    return (
      <div className="bg-stone-900 border border-stone-800 text-stone-100 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-bold text-stone-400 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {label}
        </p>
        {actualVal !== undefined && actualVal !== null && (
          <p className="font-medium">
            Actual Load: <span className="text-emerald-400 font-bold">{actualVal} kW</span>
          </p>
        )}
        {predictedVal !== undefined && (
          <p className="font-medium">
            AI Forecast: <span className="text-orange-400 font-bold">{predictedVal} kW</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function DemandChart({ data = [], loading = false }: DemandChartProps) {
  // Client-side hydration guard to eliminate width(-1) browser console warnings
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm h-96 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 w-full h-full items-center justify-center bg-stone-50 rounded-xl">
          <span className="text-xs text-stone-400 font-medium">Preparing forecast telemetry...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-6 shadow-sm transition-all duration-200 ${loading ? "opacity-60" : "opacity-100"}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">Demand Forecasting & Grid Constraints</h3>
          <p className="text-xs text-stone-500 mt-1">Real-time usage contrasted against next-generation predictive modeling.</p>
        </div>
        
        {/* Custom Legend */}
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#119785] inline-block" />
            <span className="text-stone-700">Actual (kW)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-orange-500 inline-block" />
            <span className="text-stone-700">AI Forecast (kW)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-50/70 border border-orange-100 inline-block" />
            <span className="text-stone-700">Peak Utility Window</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full" style={{ minWidth: 0, minHeight: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#119785" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#119785" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EC" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#A8A29E" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#A8A29E" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              unit=" kW"
            />
            <Tooltip content={<CustomTooltip />} />
            
            <ReferenceArea 
              x1="18:00" 
              x2="22:00" 
              fill="#FFF7ED" 
              fillOpacity={0.7} 
              stroke="#FFF7ED"
            />

            <Area
              type="monotone"
              dataKey="actual"
              stroke="#119785"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorActual)"
              activeDot={{ r: 6, stroke: "#FFF", strokeWidth: 2 }}
            />

            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#EA580C"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 items-center mt-4 p-3 bg-orange-50/50 border border-orange-100 rounded-lg text-xs text-orange-950">
        <Info className="h-4 w-4 text-orange-600 flex-shrink-0" />
        <p>
          <strong>V2G Advisory:</strong> Grid demand will spike to an estimated peak during tariff hours (18:00 - 22:00). Enabling EV Discharge is recommended to offset this load and earn utility credits.
        </p>
      </div>
    </div>
  );
}