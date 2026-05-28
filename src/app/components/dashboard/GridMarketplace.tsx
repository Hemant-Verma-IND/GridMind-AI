"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Cpu, ShoppingBag, ArrowRight } from "lucide-react";

interface NilmLog {
  timestamp: string;
  appliance: string;
  status: string;
  load: string;
}

interface GridMarketplaceProps {
  nilmLogs?: NilmLog[];
}

interface P2POffer {
  id: number;
  neighbor: string;
  qty: string;
  price: string;
  type: "sell" | "buy";
}

export default function GridMarketplace({ nilmLogs = [] }: GridMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<"nilm" | "p2p">("nilm");
  const [bids, setBids] = useState<P2POffer[]>([]);
  const [trades, setTrades] = useState<string[]>([]);

  async function fetchMarketData() {
    try {
      const res = await fetch("/api/p2p-trade");
      const data = await res.json();
      setBids(data.offers);
      setTrades(data.ledger);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMarketData();
  }, [activeTab]);

  const handleExecuteTrade = async (id: number, qty: string, price: string, neighbor: string) => {
    try {
      await fetch("/api/p2p-trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, qty, price, neighbor }),
      });
      fetchMarketData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-3 mb-5 gap-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">Telemetry & Local Markets</h3>
            <p className="text-xs text-stone-500 mt-1">Live NILM disaggregation logs and local peer contracts.</p>
          </div>
          
          <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setActiveTab("nilm")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "nilm" ? "bg-white text-[#119785] shadow-xs" : "text-stone-500"
              }`}
            >
              <Cpu className="h-3 w-3" /> NILM logs
            </button>
            <button
              onClick={() => setActiveTab("p2p")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "p2p" ? "bg-white text-[#119785] shadow-xs" : "text-stone-500"
              }`}
            >
              <TrendingUp className="h-3 w-3" /> P2P Market
            </button>
          </div>
        </div>

        {activeTab === "nilm" && (
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-stone-500 uppercase tracking-wide px-1">
              <span>Timestamp</span>
              <span>Disaggregated Appliance Event</span>
              <span>Signature</span>
            </div>
            
            <div className="font-mono text-xs space-y-2 border border-stone-100 rounded-xl p-3 bg-stone-50/50 max-h-[220px] overflow-y-auto">
              {nilmLogs.length > 0 ? (
                nilmLogs.map((log, index) => (
                  <div key={index} className="flex justify-between py-1 border-b border-stone-100/40 text-stone-500">
                    <span>[ {log.timestamp} ]</span>
                    <span className="text-[#1E2522] font-semibold">{log.appliance}</span>
                    <span className={`${log.status === "OFF" ? "text-orange-600" : "text-[#119785]"} font-bold`}>
                      {log.load} {log.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-stone-400 py-4">No active NILM transients detected.</div>
              )}
            </div>
            <p className="text-[10px] text-stone-400 px-1">NILM engine disaggregates load curves on the fly using active edge transient analysis.</p>
          </div>
        )}

        {activeTab === "p2p" && (
          <div className="space-y-4">
            <div className="space-y-2">
              {bids.length > 0 ? (
                bids.map((bid) => (
                  <div 
                    key={bid.id} 
                    className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-xl hover:border-[#119785]/20 hover:shadow-xs transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#1E2522]">{bid.neighbor}</p>
                      <p className="text-[10px] text-stone-500">
                        Available: <span className="font-semibold text-stone-700">{bid.qty}</span> @ {bid.price}/kWh
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleExecuteTrade(bid.id, bid.qty, bid.price, bid.neighbor)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-[#119785] text-[#119785] rounded-lg hover:bg-[#119785] hover:text-white transition-all duration-200 active:scale-95"
                    >
                      {bid.type === "sell" ? "Buy P2P" : "Sell P2P"} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                  No active local microgrid listings available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-150">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
          <ShoppingBag className="h-3.5 w-3.5 text-[#119785]" /> Community Transaction Ledger
        </div>
        
        <div className="space-y-1 max-h-[80px] overflow-y-auto pr-1">
          {trades.length > 0 ? (
            trades.map((trade, idx) => (
              <p key={idx} className="text-[10px] font-mono text-emerald-800 bg-emerald-50/40 border border-emerald-100/50 p-1.5 rounded-md flex items-start gap-1">
                <span>⚡</span> {trade}
              </p>
            ))
          ) : (
            <p className="text-[10px] font-mono text-stone-400 p-1.5 rounded bg-stone-50/50 text-center">
              Listening for active blockchain microgrid contracts...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}