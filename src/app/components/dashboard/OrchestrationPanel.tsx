"use client";

import React, { useState } from "react";
import { Battery, ShieldAlert, Leaf, Check, HelpCircle } from "lucide-react";

export default function OrchestrationPanel() {
  const [v2gEnabled, setV2gEnabled] = useState(true);
  const [reserveSoc, setReserveSoc] = useState(35);
  const [smartCharge, setSmartCharge] = useState(true);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start border-b border-stone-100 pb-4 mb-5">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">V2G & Smart Orchestration</h3>
            <p className="text-xs text-stone-500 mt-1">Configure vehicle-to-grid parameters and carbon schedules.</p>
          </div>
          <span className="p-2 bg-[#119785]/10 text-[#119785] rounded-xl">
            <Battery className="h-5 w-5" />
          </span>
        </div>

        {/* EV Battery State Visualization */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>EV Connection State: Connected</span>
            <span className="text-[#119785]">74% SoC (Available)</span>
          </div>
          {/* Custom battery meter container */}
          <div className="relative w-full h-6 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 p-0.5">
            {/* Warning threshold region overlay */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-orange-500/20 border-r border-dashed border-orange-400"
              style={{ width: `${reserveSoc}%` }}
            />
            {/* Active Charge Level bar */}
            <div 
              className="h-full bg-[#119785] rounded-md transition-all duration-500" 
              style={{ width: '74%' }}
            />
            {/* Visual labels on bar */}
            <div className="absolute inset-0 flex justify-between items-center px-3 text-[10px] font-black tracking-wider uppercase select-none">
              <span className="text-orange-800 z-10">V2G Limit ({reserveSoc}%)</span>
              <span className="text-white z-10">74%</span>
            </div>
          </div>
        </div>

        {/* Parameters Controls */}
        <div className="space-y-5">
          {/* V2G Discharging Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-[#1E2522] flex items-center gap-1.5 cursor-pointer">
                Enable V2G Discharge
              </label>
              <p className="text-xs text-stone-500">Allow grid system to borrow EV battery surplus during peaks.</p>
            </div>
            <button
              onClick={() => setV2gEnabled(!v2gEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                v2gEnabled ? "bg-[#119785]" : "bg-stone-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  v2gEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Reserve Limit Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1">V2G Reserve Safety Threshold <HelpCircle className="h-3 w-3 text-stone-400" /></span>
              <span className="text-orange-600">{reserveSoc}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="60" 
              value={reserveSoc}
              onChange={(e) => setReserveSoc(Number(e.target.value))}
              disabled={!v2gEnabled}
              className={`w-full accent-[#119785] h-1.5 bg-stone-150 rounded-lg appearance-none cursor-pointer ${
                !v2gEnabled && "opacity-40 cursor-not-allowed"
              }`}
            />
            <p className="text-[10px] text-stone-400">Protects EV storage. Vehicle will never be discharged below this level.</p>
          </div>

          {/* Carbon-Aware Charging Status */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-[#1E2522] flex items-center gap-1.5">
                Carbon-Aware Eco Charge
              </label>
              <p className="text-xs text-stone-500">Sync charging to wind and solar peaks (02:00 - 06:00).</p>
            </div>
            <button
              onClick={() => setSmartCharge(!smartCharge)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                smartCharge ? "bg-[#119785]" : "bg-stone-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  smartCharge ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Scheduling Status Block */}
      <div className={`mt-6 p-4 rounded-xl border transition-all ${
        smartCharge 
          ? "bg-emerald-50/50 border-emerald-100 text-emerald-950" 
          : "bg-stone-50 border-stone-200 text-stone-500"
      }`}>
        <div className="flex gap-2.5 items-start text-xs">
          {smartCharge ? (
            <>
              <Check className="h-4 w-4 text-[#119785] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1E2522]">Orchestrator Scheduled</p>
                <p className="mt-1">Eco charging will commence at 02:00 AM (predicted intensity: 95g CO₂/kWh).</p>
              </div>
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Standard Charging Mode</p>
                <p className="mt-1">Charging currently unoptimized. Expected carbon intensity is standard grid average.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}