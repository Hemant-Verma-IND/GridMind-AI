import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import Footer from "./components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2522] selection:bg-[#119785]/10 font-sans antialiased">
      
      {/* Modular Shared Navbar */}
      <Navbar />

      {/* Modular Hero Section */}
      <Hero />

      {/* Symmetrical Mission & Statement Block (Reference Image 6) */}
       <section className="border-t border-stone-200 bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#119785] leading-tight">
            Smarter Power, Lower Carbon.
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Utilizing advanced non-intrusive models, vehicle-to-grid battery dispatch, and decentralized peer-to-peer trading algorithms to secure a balanced and resilient sustainable grid.
          </p>
          
          <div className="mt-12">
            <Link 
              href="/dashboard/auth"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#119785] text-white hover:bg-[#0D7F6F] text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#119785]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98]"
            >
              Enter Dashboard Command Center 
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* Modular Feature Grid */}
      <Features />

      {/* Modular Landing Footer */}
      <Footer />

    </div>
  );
}