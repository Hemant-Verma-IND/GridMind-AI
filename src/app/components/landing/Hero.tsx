"use client";

import React from "react";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#0266A4] text-white overflow-hidden pb-20">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white rounded-b-3xl shadow-xl overflow-hidden">
        
        {/* Left Split Image */}
        <div className="lg:col-span-6 relative h-[250px] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80" 
            alt="Coastal clean energy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0266A4]/15"></div>
        </div>

        {/* Right Split: Redesigned glassmorphic Welcome Block */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#0266A4] to-[#013558] p-10 lg:p-16 flex flex-col justify-center relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Intelligent Grid Command</span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mt-3 text-white">
              Automate, Optimize, Transact.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-[#119785]">(Welcome)</span>
            </h1>
            
            {/* Redesigned Query Card (Glassmorphism & High-end Input contrast) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl mt-6">
              <p className="text-sm text-stone-200 leading-relaxed font-light mb-4">
                What microgrid metrics or disaggregated appliance analytics would you like to explore today?
              </p>

              {/* Enhanced Query Input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask GridMind AI anything..." 
                  className="w-full pl-4 pr-12 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 focus:border-[#119785] focus:bg-white text-white focus:text-stone-900 rounded-xl text-sm transition-all shadow-inner placeholder-white/50 focus:placeholder-stone-400 focus:outline-none"
                />
                <button className="absolute right-2 top-2 p-2 bg-[#119785] text-white hover:bg-[#0D7F6F] rounded-lg transition-colors shadow-sm">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Quick-Action suggestions */}
              <div className="flex flex-wrap gap-2 mt-4 text-[11px] text-white/60 items-center">
                <span className="font-semibold">Try:</span>
                <button className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all">
                  "Show EV load discharge"
                </button>
                <button className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all">
                  "Scan appliance peaks"
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Symmetrical Curve */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] fill-[#FAF9F6]">
          <path d="M0,0 C150,90 350,120 600,120 C850,120 1050,90 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}