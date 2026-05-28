"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, Leaf, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Grainient from "../../components/Grainient";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

interface Slide {
  title: string;
  badge: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
}

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "PRIME e-MCB Edge Breakers",
      badge: "Edge Hardware",
      desc: "Upgrading safety systems with high-capacity 30A SLA electromagnetic relays. Operating on the edge, the system monitors raw RMS current and voltage to isolate household hazards in milliseconds.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      icon: <Cpu className="h-4 w-4" />
    },
    {
      title: "Engineering for Everyday Safety",
      badge: "PRIME Ecosystem",
      desc: "Motivated by fatal electrical short-circuit accident records, PRIME shifts home protection from reactive disconnection to proactive load monitoring, real-time cost tracking, and single-tap remote mobile restoration.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      icon: <ShieldCheck className="h-4 w-4" />
    },
    {
      title: "Non-Intrusive Wave Disaggregation",
      badge: "GridMind Analytics",
      desc: "Evaluating aggregate main-meter signatures with machine-learning NILM algorithms to identify appliance cycles without plug hardware, while orchestrating bi-directional EV V2G support.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      icon: <Leaf className="h-4 w-4" />
    },
    {
      title: "Transactive Microgrid Markets",
      badge: "Decentralized Ledger",
      desc: "Forming localized energy communities where prosumers with surplus rooftop solar and battery storage automatically trade capacity directly with neighbor nodes, bypassing low utility buyback rates.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleLoginSuccess = (data: any) => {
    localStorage.setItem("operator_name", data.operator.name);
    localStorage.setItem("operator_role", data.operator.role);
    
    const isConfigured = localStorage.getItem("prime_paired") === "true";
    if (isConfigured) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard/setup");
    }
  };

  const handleRegisterSuccess = () => {
    localStorage.setItem("operator_name", "Operator_01");
    localStorage.setItem("operator_role", "Grid Manager");
    router.push("/dashboard/setup");
  };

  const handleError = (msg: string) => {
    setErrorMsg(msg);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("operator_name", "Workspace Operator");
      localStorage.setItem("operator_role", "Grid Engineer");
      
      const isConfigured = localStorage.getItem("prime_paired") === "true";
      if (isConfigured) {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/setup");
      }
    }, 1200);
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

      <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 items-stretch min-h-screen">
        
        <div className="bg-white p-8 lg:p-16 flex flex-col justify-between border-r border-stone-200/30">
          
          <div className="space-y-8 my-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-5">
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

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-extrabold text-stone-900">
                  {activeTab === "login" ? "Sign in to Console" : "Create Operator Account"}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  {activeTab === "login" 
                    ? "Verify credentials to access active grid controllers." 
                    : "Register to deploy and calibrate your PRIME breakers."}
                </p>
              </div>

              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  onClick={() => { setActiveTab("login"); setErrorMsg(""); setSuccessMsg(""); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === "login" 
                      ? "bg-white text-[#119785] shadow-sm animate-fade-in" 
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setActiveTab("register"); setErrorMsg(""); setSuccessMsg(""); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === "register" 
                      ? "bg-[#0266A4] text-white shadow-sm animate-fade-in" 
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Register
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
                  {successMsg}
                </div>
              )}

              {activeTab === "login" ? (
                <LoginForm 
                  onSuccess={handleLoginSuccess}
                  onError={handleError}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onGoogleLogin={handleGoogleLogin}
                />
              ) : (
                <RegisterForm 
                  onSuccess={handleRegisterSuccess}
                  onError={handleError}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onGoogleLogin={handleGoogleLogin}
                />
              )}
            </div>

          </div>

          <div className="text-[10px] text-stone-400 border-t border-stone-200 pt-4 text-center">
            <p>Ecosystem provisioned for NIT Rourkela S3 evaluation.</p>
          </div>

        </div>

        <div className="bg-[#FAF9F6]/90 backdrop-blur-xs p-8 lg:p-16 flex flex-col justify-between border-l border-stone-200/40 relative overflow-hidden">
          
          <div className="flex justify-between items-center border-b border-stone-200 pb-5">
            <div>
              <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">Ecosystem Capabilities</h3>
              <p className="text-xs text-stone-500 mt-1">Unified monitoring and hardware-level grid protection</p>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handlePrevSlide}
                className="p-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-600 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextSlide}
                className="p-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-600 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center py-10">
            <div className="relative w-full h-[450px] overflow-hidden">
              {slides.map((slide, index) => {
                let positionClass = "translate-x-full opacity-0 pointer-events-none";
                if (index === currentSlide) {
                  positionClass = "translate-x-0 opacity-100 z-10";
                } else if (
                  index === currentSlide - 1 || 
                  (currentSlide === 0 && index === slides.length - 1)
                ) {
                  positionClass = "-translate-x-full opacity-0 pointer-events-none";
                }

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-between bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-md transition-all duration-750 ease-in-out ${positionClass}`}
                  >
                    <div className="h-64 w-full overflow-hidden relative">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur border border-stone-100 rounded-full text-[10px] font-bold text-[#119785] shadow-sm uppercase tracking-wider">
                        {slide.icon} {slide.badge}
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-center">
                      <h4 className="text-lg font-extrabold text-stone-900 leading-tight">
                        {slide.title}
                      </h4>
                      <p className="text-stone-500 text-xs leading-relaxed">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-stone-400 border-t border-stone-200/50 pt-4">
            <p>© {new Date().getFullYear()} GridMind AI x PRIME Ecosystem. S3 Product Development Lab.</p>
            <div className="flex gap-1.5">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-[#119785] w-3" : "bg-stone-300"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}