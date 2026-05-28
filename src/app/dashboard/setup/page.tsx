"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cpu, Laptop, Activity, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import Grainient from "../../components/Grainient";

export default function SetupPage() {
  const [setupMode, setSetupMode] = useState<"hardware" | "simulation" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHardwareRedirect = () => {
    localStorage.setItem("prime_paired", "true");
    localStorage.setItem("prime_mode", "hardware");
    localStorage.setItem("prime_device_id", "58FC3F030000");
    localStorage.setItem("prime_device_name", "Main PRIME Sentinel");
    
    window.open("https://prime-nitrkl.vercel.app/", "_blank");
    window.location.href = "/dashboard";
  };

  const handleInitializeSimulation = () => {
    setIsLoading(true);
    localStorage.setItem("prime_paired", "true");
    localStorage.setItem("prime_mode", "simulation");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden font-sans bg-[#0266A4]">
      
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Grainient
            color1="#119785"
            color2="#0266A4"
            color3="#03a0a0"
            timeSpeed={1.65}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={3.2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={0.55}
            grainAmount={0}
            grainScale={0.2}
            grainAnimated={false}
            contrast={1.55}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
      </div>

      <header className="relative z-10 border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-stone-50 p-1.5 flex items-center justify-center border border-stone-200 transition-all group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="GridMind AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900 group-hover:text-[#119785] transition-colors">
              GridMind AI
            </span>
          </Link>

          <span className="text-stone-300 font-light text-sm">×</span>

          <a 
            href="https://prime-nitrkl.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 group"
          >
            <span className="font-semibold text-base tracking-widest text-[#2563EB] uppercase group-hover:text-blue-700 transition-colors">
              PRIME
            </span>
            <span className="text-[9px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded group-hover:bg-blue-50 transition-colors">
              v1.1
            </span>
          </a>

        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-12">
          
          {setupMode === null && (
            <div className="text-center space-y-3">
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Provisioning & Setup
              </h1>
              <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                Configure your integration mode to calibrate hardware monitoring loops or deploy virtual software-based grids.
              </p>
            </div>
          )}

          {setupMode === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch animate-fade-in">
              
              <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-stone-300 hover:shadow-xl transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="h-52 w-full overflow-hidden relative border-b border-stone-200 bg-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" 
                      alt="Physical PRIME Smart Switches" 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 p-2 bg-white/95 backdrop-blur text-[#119785] rounded-xl shadow-xs border border-stone-100">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase bg-[#119785] text-white px-2.5 py-1 rounded shadow-sm">
                      PRIME Device
                    </span>
                  </div>
                  
                  <div className="px-8 space-y-2">
                    <h3 className="text-lg font-extrabold text-stone-900">Option A: PRIME Device</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Establish an active hardware connection with your physical PRIME protective breaker unit. This connects your physical ZMPT101B and ACS712 sensors for sub-second trip isolation.
                    </p>
                  </div>
                </div>

                <div className="mt-8 px-8 pb-8">
                  <button 
                    onClick={() => setSetupMode("hardware")}
                    className="w-full py-3 border border-[#119785] hover:bg-[#119785]/5 text-[#119785] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Configure Hardware Profile <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-stone-300 hover:shadow-xl transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="h-52 w-full overflow-hidden relative border-b border-stone-200 bg-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                      alt="Visual Grid Simulation Workspace" 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 p-2 bg-white/95 backdrop-blur text-[#0266A4] rounded-xl shadow-xs border border-stone-100">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase bg-[#0266A4] text-white px-2.5 py-1 rounded shadow-sm">
                      Visual PRIME
                    </span>
                  </div>

                  <div className="px-8 space-y-2">
                    <h3 className="text-lg font-extrabold text-stone-900">Option B: Visual PRIME</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Deploy a software-based grid environment mimicking standard household equipment. Pushes mock current, voltage, and power anomalies over virtual channels directly to your dashboard controls.
                    </p>
                  </div>
                </div>

                <div className="mt-8 px-8 pb-8">
                  <button 
                    onClick={() => setSetupMode("simulation")}
                    className="w-full py-3 border border-[#0266A4] hover:bg-[#0266A4]/5 text-[#0266A4] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Configure Software Profile <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : setupMode === "hardware" ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto animate-fade-in text-center space-y-5">
              <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                <AlertCircle className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-stone-900">PRIME Device Integration</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  The physical hardware pairing service is currently undergoing final lab calibration. This service will be fully implemented and deployed in the next development cycle of the S3 Product Development Lab.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-center gap-3">
                <button 
                  onClick={() => setSetupMode(null)}
                  className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Go Back
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#0266A4] rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto animate-fade-in text-center space-y-5">
              <div className="mx-auto w-12 h-12 bg-[#0266A4]/10 rounded-xl flex items-center justify-center text-[#0266A4] border border-[#0266A4]/15">
                <Activity className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-stone-900">Initialize Pure Software Simulation</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  GridMind AI will generate high-fidelity models representing real domestic appliance cycles, simulated AC loads, and virtual fault injections to evaluate your efficiency scoring.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-center gap-3">
                <button 
                  onClick={() => setSetupMode(null)}
                  className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Go Back
                </button>
                <button 
                  onClick={handleInitializeSimulation}
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#0266A4] hover:bg-[#014D7C] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  {isLoading ? "Starting Simulation..." : "Deploy Simulation Workspace"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <footer className="relative z-10 border-t border-stone-200/20 py-6 text-center text-[10px] text-white/50 bg-white/5 backdrop-blur-xs">
        <p>© {new Date().getFullYear()} GridMind AI x PRIME Ecosystem. S3 Product Development Lab.</p>
      </footer>

    </div>
  );
}