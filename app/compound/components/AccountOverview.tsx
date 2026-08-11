'use client';
import React from "react";
import { motion } from "framer-motion";

interface AccountOverviewProps {
  balance: number;
  equity: number;
  goal: number;
  login?: number;
  server?: string;
  isLive?: boolean;
  compoundingMultiplier?: number;
}

export function AccountOverview({ balance, equity, goal, login, server, isLive, compoundingMultiplier = 1.0 }: AccountOverviewProps) {
  const progress = Math.min((equity / goal) * 100, 100);

  // Framer Motion spring presets from blueprint
  const springConfig = { stiffness: 150, damping: 25, mass: 0.8 };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ...springConfig }}
      className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 flex flex-col gap-4 shadow-xl shadow-black/50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Vortex-Flip Engine</h2>
          {isLive && login && login !== 0 && (
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Broker: <span className="text-zinc-300">{server}</span> | Acc: <span className="text-zinc-300">{login}</span>
            </p>
          )}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${isLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
          {isLive ? 'LIVE' : 'SIMULATION'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <div>
          <p className="text-sm text-zinc-400 uppercase tracking-wider">Balance</p>
          <p className="text-3xl font-mono mt-1 text-white">{balance.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400 uppercase tracking-wider">Equity</p>
          <p className="text-3xl font-mono text-emerald-400 mt-1">{equity.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400 uppercase tracking-wider">Multiplier</p>
          <p className="text-3xl font-mono text-violet-400 mt-1">{compoundingMultiplier.toFixed(2)}x</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">Flip Goal Progress</span>
          <span className="font-mono text-emerald-400">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", ...springConfig }}
            className="h-full bg-emerald-500 rounded-full"
          />
        </div>
        <div className="text-right text-xs text-zinc-500 mt-1 font-mono">Target: {goal}</div>
      </div>
    </motion.div>
  );
}
