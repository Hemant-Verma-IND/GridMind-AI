"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onGoogleLogin: () => void;
}

export default function LoginForm({ onSuccess, onError, isLoading, setIsLoading, onGoogleLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        onSuccess(data);
      } else {
        onError(data.error || "Authentication failed");
      }
    } catch (err) {
      onError("Unable to reach authentication server");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrimeLogin = () => {
    setIsLoading(true);
    onError("");
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("prime_paired", "true");
      localStorage.setItem("prime_mode", "hardware");
      localStorage.setItem("prime_device_id", "58FC3F030000");
      localStorage.setItem("prime_device_name", "Main PRIME Sentinel");
      window.open("https://prime-digital-fe.vercel.app/", "_blank");
    }, 800);
  };

  return (
    <div className="space-y-4 font-sans">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-stone-400" /> Email Address
          </label>
          <input 
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operator@gridmind.ai"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-stone-400" /> Password
            </label>
            <a href="#" className="text-[9px] font-bold text-[#119785] hover:underline">Forgot?</a>
          </div>
          <input 
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#119785] hover:bg-[#0D7F6F] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? "Verifying..." : "Access Dashboard"} <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="relative flex items-center justify-center py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200" />
        </div>
        <span className="relative bg-white px-3 text-[9px] font-bold text-stone-400 uppercase tracking-wider">or</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button 
          type="button"
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="py-2.5 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        <button 
          type="button"
          onClick={handlePrimeLogin}
          disabled={isLoading}
          className="py-2.5 border border-[#2563EB]/30 bg-white hover:bg-blue-50 text-[#2563EB] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span className="font-extrabold uppercase tracking-tight text-[11px] leading-none">PRIME</span>
        </button>
      </div>
    </div>
  );
}