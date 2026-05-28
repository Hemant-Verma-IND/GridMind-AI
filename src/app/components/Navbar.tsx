"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, Zap, Cpu, Activity, BatteryCharging, ShieldAlert, Globe, Map, Leaf } from "lucide-react";

export default function Navbar() {
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [statusStripOpen, setStatusStripOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const aboutTimeout = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleAboutEnter = () => {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    setIsAboutOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimeout.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 150);
  };

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <header className="w-full z-50 shadow-sm bg-white">
      
      {announcementOpen && (
        <div className="bg-[#F4F1EA] border-b border-stone-200 py-2.5 px-6 flex items-center justify-between text-xs text-stone-700">
          <p className="font-medium text-center flex-1">
            <strong>Platform Alert:</strong> GridMind AI utilizes simulated real-time telemetry to demonstrate active peer-to-peer trading and V2G dispatch.
          </p>
          <button 
            onClick={() => setAnnouncementOpen(false)} 
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="bg-white border-b border-stone-100 py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-auto flex items-center transition-all group-hover:scale-[1.02]">
              <img 
                src="/logo.png" 
                alt="GridMind AI Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#1E2522]">
              GridMind AI
            </span>
          </Link>

          <div className="relative w-full md:w-80 max-w-sm">
            <input 
              type="text" 
              placeholder="Search the platform..." 
              className="w-full pl-4 pr-10 py-1.5 border border-stone-200 rounded-full text-sm bg-[#FAF9F6] focus:outline-none focus:border-[#119785] transition-colors"
            />
            <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-stone-400" />
          </div>

        </div>
      </div>

      <nav className="bg-[#FAF9F6] border-b border-stone-200 py-2 px-6 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-6 text-sm font-semibold text-[#1E2522]">
            <Link href="/" className="hover:text-[#119785] transition-colors">Home</Link>
            
            <div 
              className="relative py-2"
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <button className="flex items-center gap-1 hover:text-[#119785] transition-colors focus:outline-none">
                About 
                <ChevronDown className={`h-4 w-4 transition-transform duration-250 ${isAboutOpen ? "rotate-180 text-[#119785]" : ""}`} />
              </button>

              {isAboutOpen && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[90vw] max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#0266A4] uppercase tracking-wider border-b border-stone-100 pb-2 mb-4 flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5" /> About
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-600">
                      <li><Link href="/about" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">About the Platform</Link></li>
                      <li><Link href="/about#structure" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Our Structure</Link></li>
                      <li><Link href="/about#work" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Work with GridMind</Link></li>
                      <li><Link href="/contact" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Contact</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#0266A4] uppercase tracking-wider border-b border-stone-100 pb-2 mb-4 flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5" /> The Grid
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-600">
                      <li><Link href="/about#climate" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Climate Mitigation</Link></li>
                      <li><Link href="/about#map" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Regional Map</Link></li>
                      <li><Link href="/about#region" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Our Region</Link></li>
                      <li><Link href="/about#ecosystem" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">The Energy Ecosystem</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div 
              className="relative py-2"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button className="flex items-center gap-1 hover:text-[#119785] transition-colors focus:outline-none">
                Services 
                <ChevronDown className={`h-4 w-4 transition-transform duration-250 ${isServicesOpen ? "rotate-180 text-[#119785]" : ""}`} />
              </button>

              {isServicesOpen && (
                <div 
                  className="absolute left-1/2 -translate-x-1/4 lg:-translate-x-40 top-full mt-2 w-[90vw] max-w-4xl bg-white border border-stone-200 rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#0266A4] uppercase tracking-wider border-b border-stone-100 pb-2 mb-4 flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5" /> Grid Solutions
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-600">
                      <li><Link href="/services#nilm" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">NILM Load Profiler</Link></li>
                      <li><Link href="/services#spikes" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Anomalous Spike Detector</Link></li>
                      <li><Link href="/services#audit" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Baseload Inefficiency Audit</Link></li>
                      <li><Link href="/services#frequency" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Phase Frequency Monitor</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#0266A4] uppercase tracking-wider border-b border-stone-100 pb-2 mb-4 flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5" /> Orchestration
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-600">
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">V2G Smart Dispatch</Link></li>
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Carbon-Aware Shifting</Link></li>
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Peak Rate Mitigator</Link></li>
                      <li><Link href="/developers" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1">Developer API Integrations</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#119785] uppercase tracking-wider border-b border-[#119785]/10 pb-2 mb-4 flex items-center gap-1.5">
                      <BatteryCharging className="h-3.5 w-3.5 text-[#119785]" /> I Want To...
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-600">
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1 font-medium">Configure EV Battery limits</Link></li>
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1 font-medium">Set up a Peer Trade</Link></li>
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1 font-medium">Request Carbon Offset Audit</Link></li>
                      <li><Link href="/dashboard" className="block py-2 px-2.5 rounded-lg hover:bg-[#119785]/5 hover:text-[#119785] transition-all hover:translate-x-1 font-medium">Simulate localized grid stress</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link href="/dashboard" className="hover:text-[#119785] transition-colors">Dashboard</Link>
            <Link href="/contact" className="hover:text-[#119785] transition-colors">Contact</Link>
          </div>
          
        </div>
      </nav>

      {statusStripOpen && (
        <div className="bg-[#119785] text-white text-xs py-2 px-6 font-semibold tracking-wide flex items-center justify-between gap-3 shadow-inner relative">
          <div className="flex-1 flex justify-center items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 fill-white animate-pulse" />
            <span>Grid optimization active. Local carbon intensity is operating at peak clean levels.</span>
            <Link href="/dashboard" className="underline hover:text-white/80 transition-colors ml-2">
              Explore live telemetry →
            </Link>
          </div>
          <button 
            onClick={() => setStatusStripOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </header>
  );
}