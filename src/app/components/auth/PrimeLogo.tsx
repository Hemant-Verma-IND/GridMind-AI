"use client";

import React from "react";

export default function PrimeLogo() {
  return (
    <div className="flex flex-col items-center text-center select-none font-sans">
      <h1 
        className="text-4xl md:text-5xl font-black uppercase text-[#2563EB] tracking-tight" 
        style={{ 
          fontFamily: "'BankGothic', 'BankGothic Md BT', 'Impact', sans-serif",
          transform: "scaleX(1.15)"
        }}
      >
        PRIME
      </h1>
      <p className="text-[7px] md:text-[8px] font-bold text-stone-500 uppercase tracking-[0.24em] mt-2 font-mono">
        Power Regulation & Intelligent Monitoring Equipment
      </p>
    </div>
  );
}