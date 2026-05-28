"use client";

import React from "react";
import { Cpu, Activity, Leaf, TrendingUp } from "lucide-react";

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1E2522]">Edge-Computing Intelligence</h2>
        <p className="text-stone-500 mt-4 text-base font-medium leading-relaxed">
          Four emerging grid technologies integrated into a single responsive software layer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: NILM */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#119785]/30 transition-all hover:shadow-md flex flex-col group">
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" 
              alt="Clean modern home appliances representing NILM monitoring" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur text-[#119785] rounded-xl shadow-sm">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1E2522]">Non-Intrusive Load Monitoring (NILM)</h3>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed">
                Analyze aggregate utility meter signatures to extract and identify individual appliance footprints. Eliminates the requirement for individual hardware smart plugs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: V2G Orchestration */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#0266A4]/30 transition-all hover:shadow-md flex flex-col group">
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80" 
              alt="Modern electric vehicle charger" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur text-[#0266A4] rounded-xl shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1E2522]">Vehicle-to-Grid (V2G) Scheduling</h3>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed">
                Use your EV as active storage. The platform handles charging or discharging actions dynamically based on utility grid strain and state of charge limits.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Carbon-Aware Shifting */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#119785]/30 transition-all hover:shadow-md flex flex-col group">
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80" 
              alt="Wind turbines landscape representing carbon aware shifting" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur text-[#119785] rounded-xl shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1E2522]">Carbon-Aware Load Shifting</h3>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed">
                Integrate local grid carbon intensity API metrics to shift deferred tasks automatically, matching periods of peak wind and solar energy availability.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Transactive P2P Trading */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-[#0266A4]/30 transition-all hover:shadow-md flex flex-col group">
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80" 
              alt="Solar panels grid system representing peer-to-peer microgrid trades" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur text-[#0266A4] rounded-xl shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1E2522]">Transactive P2P Energy Trading</h3>
              <p className="text-stone-500 mt-3 text-sm leading-relaxed">
                Form local microgrids to trade surplus rooftop solar generation directly with neighbor nodes, bypassing standard low utility feed-in rates.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}