'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/app/compound/lib/supabase";

interface Trade {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  lots: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  time: string;
}

export default function TradePage() {
  const [balance, setBalance] = useState(0.00);
  const [equity, setEquity] = useState(0.00);
  const [activeTrades, setActiveTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Check if user has real deposits stored in localStorage
    if (typeof window !== "undefined") {
      const storedTx = localStorage.getItem("cum_transactions");
      if (storedTx) {
        try {
          const txs = JSON.parse(storedTx);
          const totalNet = txs.reduce((acc: number, tx: any) => acc + (tx.netAmount || 0), 0);
          setBalance(totalNet);
          setEquity(totalNet);
        } catch (e) {
          // Fallback to $0.00
        }
      }
    }

    // Subscribe to Supabase Realtime Trading Logs
    const channel = supabase
      .channel("public:trading_logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "trading_logs" },
        (payload) => {
          console.log("Realtime Trade Event Received:", payload);
          if (payload.new) {
            const newTrade: Trade = {
              id: payload.new.id || String(Date.now()),
              symbol: payload.new.symbol || "XAUUSD",
              type: payload.new.action === "BUY" ? "BUY" : "SELL",
              lots: payload.new.lot_size || 0.01,
              openPrice: payload.new.price || 2420.50,
              currentPrice: payload.new.price || 2420.50,
              profit: 0.00,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setActiveTrades((prev) => [newTrade, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans relative pb-32 max-w-md mx-auto">
      {/* Fixed Top Header Bar with Official Logo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-2xl px-4 pt-safe pt-3 pb-3 border-b border-white/[0.08] flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-[17px] font-extrabold text-white tracking-wide">Live Active Positions</h1>
      </header>

      {/* Top Header Spacer */}
      <div className="h-14 flex-shrink-0" />

      <div className="p-4 space-y-4 flex-1">
        {/* Real-time Equity Bar ($0.00 Default) */}
        <div className="bg-[#1C1C1E]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 shadow-xl grid grid-cols-2 gap-4 font-mono">
          <div>
            <span className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider block">Account Balance</span>
            <span className="text-2xl font-extrabold text-white">${balance.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider block">Net Floating Equity</span>
            <span className="text-2xl font-extrabold text-[#34C759]">${equity.toFixed(2)}</span>
          </div>
        </div>

        {/* Live Positions Feed */}
        <div className="space-y-3">
          <h2 className="text-xs text-[#8E8E93] uppercase tracking-widest font-extrabold px-1">
            Realtime Order Execution Feed
          </h2>

          {activeTrades.length === 0 ? (
            <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-6 text-center space-y-2 shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF9500] mx-auto" />
              <p className="text-[13px] text-white font-extrabold">Pre-Rollout Waitlist Mode</p>
              <p className="text-[11px] text-[#8E8E93] font-mono leading-relaxed">
                Official automated trading core unlocks on August 17th 00:00 WAT. No active open positions during waitlist preview.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {activeTrades.map((t) => (
                <div key={t.id} className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-4 flex justify-between items-center font-mono">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-[14px]">{t.symbol}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        t.type === "BUY" ? "bg-[#34C759]/20 text-[#34C759]" : "bg-[#FF3B30]/20 text-[#FF3B30]"
                      }`}>
                        {t.type} {t.lots}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                      Open: {t.openPrice} → Current: {t.currentPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-base font-extrabold ${t.profit >= 0 ? "text-[#34C759]" : "text-[#FF3B30]"}`}>
                      {t.profit >= 0 ? `+$${t.profit.toFixed(2)}` : `-$${Math.abs(t.profit).toFixed(2)}`}
                    </span>
                    <span className="text-[10px] text-[#8E8E93] block">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
