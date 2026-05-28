"use client";

import React from "react";
import Link from "next/link";
import { 
  Leaf, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-stone-200 font-sans">
      
      {/* UPPER FOOTER: Multi-Column Links & Contact Info */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
        
        {/* Column 1: Grid Solutions */}
        <div className="lg:col-span-3">
          <h4 className="font-extrabold text-sm text-[#1E2522] uppercase tracking-wider mb-5">
            Grid Solutions
          </h4>
          <ul className="space-y-3.5 text-xs text-stone-600 font-medium">
            <li><Link href="/services#nilm" className="hover:text-[#119785] transition-colors">NILM Disaggregation</Link></li>
            <li><Link href="/services#v2g" className="hover:text-[#119785] transition-colors">V2G Battery Scheduling</Link></li>
            <li><Link href="/services#carbon" className="hover:text-[#119785] transition-colors">Carbon Intensity Forecasting</Link></li>
            <li><Link href="/services#p2p" className="hover:text-[#119785] transition-colors">P2P Microgrid Marketplace</Link></li>
            <li><Link href="/services#load" className="hover:text-[#119785] transition-colors">Active Load Management</Link></li>
            <li><Link href="/services#security" className="hover:text-[#119785] transition-colors">Decentralized Power Security</Link></li>
          </ul>
        </div>

        {/* Column 2: Opportunities & Developers */}
        <div className="lg:col-span-3">
          <h4 className="font-extrabold text-sm text-[#1E2522] uppercase tracking-wider mb-5">
            Opportunities
          </h4>
          <ul className="space-y-3.5 text-xs text-stone-600 font-medium">
            <li><Link href="/developers#api" className="hover:text-[#119785] transition-colors">Developer API Docs</Link></li>
            <li><Link href="/developers#grants" className="hover:text-[#119785] transition-colors">GridMind Innovation Grants</Link></li>
            <li><Link href="/developers#community" className="hover:text-[#119785] transition-colors">Community Microgrid Schemes</Link></li>
            <li><Link href="/developers#open-source" className="hover:text-[#119785] transition-colors">Open-Source Code Repositories</Link></li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div className="lg:col-span-2">
          <h4 className="font-extrabold text-sm text-[#1E2522] uppercase tracking-wider mb-5">
            About
          </h4>
          <ul className="space-y-3.5 text-xs text-stone-600 font-medium">
            <li><Link href="/about" className="hover:text-[#119785] transition-colors">About GridMind AI</Link></li>
            <li><Link href="/about#technology" className="hover:text-[#119785] transition-colors">Technology Stack</Link></li>
            <li><Link href="/news" className="hover:text-[#119785] transition-colors">News and Events</Link></li>
            <li><Link href="/roadmap" className="hover:text-[#119785] transition-colors">Platform Roadmap</Link></li>
            <li><Link href="/contact" className="hover:text-[#119785] transition-colors">Contact us</Link></li>
          </ul>
        </div>

        {/* Column 4: Branding, Socials & Contact Card */}
        <div className="lg:col-span-4 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-stone-200 pt-8 lg:pt-0 lg:pl-10">
          
          {/* Logo Alignment */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="GridMind AI Logo" 
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-extrabold text-lg tracking-tight text-[#1E2522]">
              GridMind AI
            </span>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <p><strong>Phone:</strong> +1 (800) GRID-MIND</p>
            <p><strong>Laboratory:</strong> Level 3, Sustainable Energy Center</p>
            <p><strong>Address:</strong> 42 Innovation Parkway, Tech District, Queensland</p>
          </div>

          {/* Social Icon Row using Custom Inline SVGs (Bypasses Lucide Brand limitation) */}
          <div className="flex items-center gap-3 mt-2">
            
            {/* Facebook */}
            <a href="#" className="p-2 bg-stone-200/50 hover:bg-[#119785]/15 text-[#1E2522] hover:text-[#119785] rounded-full transition-all" aria-label="Facebook">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1h3V2h-4c-2.5 0-4.5 2-4.5 4.5V8z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" className="p-2 bg-stone-200/50 hover:bg-[#119785]/15 text-[#1E2522] hover:text-[#119785] rounded-full transition-all" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="#" className="p-2 bg-stone-200/50 hover:bg-[#119785]/15 text-[#1E2522] hover:text-[#119785] rounded-full transition-all" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="p-2 bg-stone-200/50 hover:bg-[#119785]/15 text-[#1E2522] hover:text-[#119785] rounded-full transition-all" aria-label="YouTube">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.517 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.483 20.5 12 20.5 12 20.5s7.518 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

          </div>

        </div>

      </div>

      {/* LOWER FOOTER: Legal links & Ecosystem Acknowledgment */}
      <div className="bg-[#F4F1EA] border-t border-stone-200 py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Row 1: Legal Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold text-stone-600">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-[#119785] transition-colors">Privacy</Link>
              <Link href="/disclaimer" className="hover:text-[#119785] transition-colors">Copyright and Disclaimer</Link>
              <Link href="/freedom-info" className="hover:text-[#119785] transition-colors">Freedom of Information</Link>
              <Link href="/telemetry" className="hover:text-[#119785] transition-colors">Telemetry Publication Scheme</Link>
            </div>
            <div className="text-stone-500">
              Platform status: <span className="text-[#119785] font-bold">100% Operational</span>
            </div>
          </div>

          {/* Divider line within beige footer */}
          <hr className="border-stone-200" />

          {/* Row 2: Clean Energy Ecosystem Acknowledgment */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            
            {/* Visual Ecosystem Badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-8 bg-[#119785] rounded-md flex items-center justify-center text-white shadow-sm" title="Clean Energy Optimized">
                <Leaf className="h-4 w-4" />
              </div>
              <div className="w-12 h-8 bg-[#0266A4] rounded-md flex items-center justify-center text-white shadow-sm" title="Telemetry Shield">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="w-12 h-8 bg-amber-500 rounded-md flex items-center justify-center text-white shadow-sm" title="Active V2G Storage">
                <Zap className="h-4 w-4" />
              </div>
            </div>

            {/* Respect/Acknowledgment Statement */}
            <p className="text-xs text-stone-500 leading-relaxed font-medium">
              GridMind AI operates with total commitment to ecological sustainability. We acknowledge and respect the natural resources and communities we serve, and are dedicated to reducing the global carbon footprint of localized electrical distribution networks through open-source software, active non-intrusive load balancing, and secure peer-to-peer orchestration.
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
}