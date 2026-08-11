'use client';
import React from "react";
import { motion } from "framer-motion";

interface RiskDashboardProps {
  currentExposurePercent: number; // e.g. 0.25 for 25%
  maxRiskCap: number; // e.g. 0.50 for 50%
  perPairPnL?: { symbol: string; pnl: number }[];
}

export function RiskDashboard({ currentExposurePercent, maxRiskCap, perPairPnL = [] }: RiskDashboardProps) {
  const springConfig = { stiffness: 150, damping: 25, mass: 0.8 };
  
  // Calculate width percentage relative to max cap, but visualize overall 100% capacity
  const fillPercentage = (currentExposurePercent / maxRiskCap) * 100;
  
  const isDanger = fillPercentage > 80;

  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-zinc-100">Global Risk Exposure</h3>
        <span className="text-xs font-mono text-zinc-400">Cap: {(maxRiskCap * 100).toFixed(0)}%</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Current Exposure</span>
          <span className={`font-mono ${isDanger ? 'text-rose-400' : 'text-emerald-400'}`}>
            {(currentExposurePercent * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="h-4 w-full bg-zinc-955 rounded-full border border-zinc-800 overflow-hidden relative">
          {/* Safe zone marker */}
          <div className="absolute top-0 bottom-0 left-[80%] w-px bg-zinc-700 z-10" />
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(fillPercentage, 100)}%` }}
            transition={{ type: "spring", ...springConfig }}
            className={`h-full rounded-full ${isDanger ? 'bg-rose-500' : 'bg-emerald-500'}`}
          />
        </div>
      </div>
      
      <p className="text-xs text-zinc-500 mt-2">
        The bot is strictly prohibited from exceeding the {(maxRiskCap * 100).toFixed(0)}% exposure ceiling.
      </p>

      {perPairPnL.length > 0 && (
        <div className="border-t border-zinc-850 pt-4 mt-2 flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Asset PnL Breakdown</h4>
          <div className="flex flex-col gap-1.5">
            {perPairPnL.map((item) => (
              <div key={item.symbol} className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">{item.symbol}</span>
                <span className={item.pnl >= 0 ? "text-emerald-400" : "text-rose-400 font-bold"}>
                  {item.pnl >= 0 ? "+" : ""}{item.pnl.toFixed(2)}¢
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
