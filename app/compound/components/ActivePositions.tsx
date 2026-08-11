'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  id: string;
  type: "BUY" | "SELL";
  entry_price: number;
  sl_price: number;
  tp_price: number;
  lot_size: number;
  floating_pnl: number;
}

interface ActivePositionsProps {
  positions: Position[];
}

export function ActivePositions({ positions }: ActivePositionsProps) {
  const springConfig = { stiffness: 150, damping: 25, mass: 0.8 };

  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-zinc-100">Active Positions</h3>
      
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {positions.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-zinc-500 italic"
            >
              No active trades. Waiting for high-probability setups.
            </motion.p>
          ) : (
            positions.map((pos) => (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", ...springConfig }}
                className="grid grid-cols-6 gap-2 p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-sm items-center"
              >
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${pos.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {pos.type}
                  </span>
                </div>
                <div className="col-span-1 text-zinc-300 font-mono text-xs text-center">{pos.lot_size.toFixed(2)}</div>
                <div className="col-span-1 text-zinc-300 font-mono text-xs text-center">E: {pos.entry_price.toFixed(2)}</div>
                <div className="col-span-1 text-zinc-400 font-mono text-xs text-center">SL: {pos.sl_price.toFixed(2)}</div>
                <div className="col-span-1 text-zinc-400 font-mono text-xs text-center">TP: {pos.tp_price.toFixed(2)}</div>
                <div className={`col-span-1 text-right font-mono font-medium ${pos.floating_pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pos.floating_pnl >= 0 ? '+' : ''}{pos.floating_pnl.toFixed(2)}¢
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
