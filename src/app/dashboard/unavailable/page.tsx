"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Zap } from "lucide-react";

export default function UnavailablePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2522] flex flex-col justify-between font-sans">
      
      <header className="border-b border-stone-200 bg-white px-6 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-stone-50 p-1.5 flex items-center justify-center border border-stone-200">
              <img 
                src="/logo.png" 
                alt="GridMind AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-stone-900">
              GridMind AI
            </span>
          </Link>
          <span className="text-xs font-semibold text-stone-400">Security Gateway Maintenance</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-md p-8 shadow-2xl text-center space-y-5">
          
          <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-stone-900">Google Sign-In Unavailable</h2>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
              We are currently upgrading our Google Workspace OAuth directory services. Google authentication is temporarily disabled during this maintenance window.
            </p>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-150 rounded-xl text-left flex gap-2.5 items-start text-[11px] text-stone-500">
            <Zap className="h-4 w-4 text-[#119785] flex-shrink-0 mt-0.5" />
            <p>
              Please use the <strong>Register</strong> tab to create a direct account, or log in using your standard operator email and password credentials for now.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-center">
            <Link 
              href="/dashboard/auth"
              className="px-5 py-2.5 bg-[#119785] hover:bg-[#0D7F6F] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Authentication
            </Link>
          </div>

        </div>
      </div>

      <footer className="border-t border-stone-200 py-6 text-center text-[10px] text-stone-400 bg-white">
        <p>© {new Date().getFullYear()} GridMind AI x PRIME Ecosystem. S3 Product Development Lab.</p>
      </footer>

    </div>
  );
}