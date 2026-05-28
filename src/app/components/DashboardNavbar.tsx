"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, User, Settings, LogOut, Check, X, ShieldAlert } from "lucide-react";

export default function DashboardNavbar() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [showAlerts, setShowAlerts] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Operator_01",
    role: "Grid Manager",
    email: "operator_01@gridmind.ai",
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleNavClick = (section: string, elementId: string) => {
    setActiveSection(section);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenEditModal = () => {
    setTempProfile({ ...profile });
    setShowEditModal(true);
    setShowProfileMenu(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    setShowEditModal(false);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 font-sans">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center transition-all group-hover:scale-[1.02]">
                <img 
                  src="/logo.png" 
                  alt="GridMind AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#1E2522]">
                GridMind AI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-500">
            <button
              onClick={() => handleNavClick("overview", "overview")}
              className={`transition-all py-5 border-b-2 cursor-pointer ${
                activeSection === "overview"
                  ? "text-[#119785] border-[#119785]"
                  : "border-transparent text-stone-500 hover:text-[#1E2522]"
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => handleNavClick("forecast", "forecast")}
              className={`transition-all py-5 border-b-2 cursor-pointer ${
                activeSection === "forecast"
                  ? "text-[#119785] border-[#119785]"
                  : "border-transparent text-stone-500 hover:text-[#1E2522]"
              }`}
            >
              Forecasting
            </button>
            <button
              onClick={() => handleNavClick("orchestration", "orchestration")}
              className={`transition-all py-5 border-b-2 cursor-pointer ${
                activeSection === "orchestration"
                  ? "text-[#119785] border-[#119785]"
                  : "border-transparent text-stone-500 hover:text-[#1E2522]"
              }`}
            >
              V2G Storage
            </button>
            <button
              onClick={() => handleNavClick("marketplace", "marketplace")}
              className={`transition-all py-5 border-b-2 cursor-pointer ${
                activeSection === "marketplace"
                  ? "text-[#119785] border-[#119785]"
                  : "border-transparent text-stone-500 hover:text-[#1E2522]"
              }`}
            >
              Local P2P
            </button>
          </nav>

          <div className="flex items-center gap-4">
            
            <div className="relative">
              <button 
                onClick={() => setShowAlerts(!showAlerts)}
                className="p-2 text-stone-500 hover:text-stone-950 hover:bg-stone-50 rounded-xl transition-all relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-600 rounded-full border border-white" />
              </button>

              {showAlerts && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl p-3 text-xs z-50 text-stone-700">
                  <p className="font-bold text-stone-900 border-b border-stone-100 pb-1.5 mb-1.5 uppercase tracking-wider text-[10px]">Active Notifications</p>
                  <div className="space-y-2">
                    <p className="font-mono text-orange-600 bg-orange-50/50 p-1.5 rounded border border-orange-100/50">
                      V2G Dispatch recommended. Load spike predicted at 18:00.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 transition-all cursor-pointer"
              >
                <User className="h-4 w-4 text-stone-500" />
                <span className="text-xs font-bold text-stone-700">{profile.name}</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-stone-100 bg-stone-50/50">
                    <p className="text-xs font-bold text-[#1E2522]">{profile.name}</p>
                    <p className="text-[10px] text-stone-500 font-medium mt-0.5">{profile.role}</p>
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5">{profile.email}</p>
                  </div>
                  
                  <div className="p-1">
                    <button 
                      onClick={handleOpenEditModal}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-all cursor-pointer"
                    >
                      <Settings className="h-3.5 w-3.5 text-stone-400" /> Edit Profile
                    </button>
                    <Link 
                      href="/"
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-all"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 text-stone-400" /> Exit Console
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5 text-red-500" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-all text-xs font-bold rounded-lg shadow-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Exit Console
            </Link>

          </div>

        </div>
      </header>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 font-sans p-4 animate-fade-in">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
            
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#1E2522]">Edit Operator Profile</h3>
                <p className="text-[10px] text-stone-400 mt-0.5">Update console credentials in-memory.</p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-stone-50 rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Operator Name</label>
                <input 
                  type="text"
                  required
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">System Role</label>
                <input 
                  type="text"
                  required
                  value={tempProfile.role}
                  onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Email Endpoint</label>
                <input 
                  type="email"
                  required
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119785]/50 text-stone-900"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex gap-2 justify-end">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-bold rounded-lg hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#119785] hover:bg-[#0D7F6F] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5" /> Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}