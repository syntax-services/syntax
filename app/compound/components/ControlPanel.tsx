'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ControlPanelProps {
  isLive: boolean;
  useBeProtection: boolean;
  enforceKillzones: boolean;
  enforceDailyPnl: boolean;
  enforceSinglePos: boolean;
  enforceExposureCap: boolean;
  onToggleMode: (isLive: boolean) => void;
  onToggleBe: (useBe: boolean) => void;
  onToggleKillzone: (enforce: boolean) => void;
  onToggleDailyPnl: (enforce: boolean) => void;
  onToggleSinglePos: (enforce: boolean) => void;
  onToggleExposureCap: (enforce: boolean) => void;
  entryMode?: string;
  onChangeEntryMode?: (mode: string) => void;
  onRunBacktest: () => void;
  backtestStatus?: string;
  isConnected: boolean;
}

export function ControlPanel({ isLive, useBeProtection, enforceKillzones, enforceDailyPnl, enforceSinglePos, enforceExposureCap, onToggleMode, onToggleBe, onToggleKillzone, onToggleDailyPnl, onToggleSinglePos, onToggleExposureCap, entryMode = "PULLBACK_TOP", onChangeEntryMode, onRunBacktest, backtestStatus, isConnected }: ControlPanelProps) {
  const [loadingMode, setLoadingMode] = useState(false);
  const [loadingBe, setLoadingBe] = useState(false);
  const [loadingKz, setLoadingKz] = useState(false);

  const handleToggleMode = async () => {
    if (!isConnected) return;
    setLoadingMode(true);
    await onToggleMode(!isLive);
    setLoadingMode(false);
  };

  const handleToggleBe = async () => {
    if (!isConnected) return;
    setLoadingBe(true);
    await onToggleBe(!useBeProtection);
    setLoadingBe(false);
  };

  const handleToggleKillzone = async () => {
    if (!isConnected) return;
    setLoadingKz(true);
    await onToggleKillzone(!enforceKillzones);
    setLoadingKz(false);
  };

  const handleToggleDailyPnl = async () => {
    if (!isConnected) return;
    await onToggleDailyPnl(!enforceDailyPnl);
  };

  const handleToggleSinglePos = async () => {
    if (!isConnected) return;
    await onToggleSinglePos(!enforceSinglePos);
  };

  const handleToggleExposureCap = async () => {
    if (!isConnected) return;
    await onToggleExposureCap(!enforceExposureCap);
  };

  const isBacktesting = backtestStatus && backtestStatus !== "complete" && backtestStatus !== "idle" && backtestStatus !== "error_no_data";

  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col gap-6 shadow-xl shadow-black/50">
      <h3 className="text-lg font-semibold text-zinc-100">Control Panel</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Execution Mode</p>
          <p className="text-xs text-zinc-500">Toggle between MT5 Live and Simulation</p>
        </div>
        <button
          onClick={handleToggleMode}
          disabled={loadingMode || isBacktesting || !isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isLive ? 'bg-rose-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle execution mode</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isLive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Break-Even Protection</p>
          <p className="text-xs text-zinc-500">Auto trail SL to entry at 1:1 RR</p>
        </div>
        <button
          onClick={handleToggleBe}
          disabled={loadingBe || !isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            useBeProtection ? 'bg-emerald-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle BE protection</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              useBeProtection ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Session Killzones</p>
          <p className="text-xs text-zinc-500">Restrict to London & NY hours (WAT)</p>
        </div>
        <button
          onClick={handleToggleKillzone}
          disabled={loadingKz || !isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enforceKillzones ? 'bg-amber-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle killzone enforcement</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enforceKillzones ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Daily PnL Guard</p>
          <p className="text-xs text-zinc-500">Liquidate all if daily loss limit hit</p>
        </div>
        <button
          onClick={handleToggleDailyPnl}
          disabled={!isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enforceDailyPnl ? 'bg-amber-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle daily PnL check</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enforceDailyPnl ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Single Position</p>
          <p className="text-xs text-zinc-500">Limit bot to 1 open trade at a time</p>
        </div>
        <button
          onClick={handleToggleSinglePos}
          disabled={!isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enforceSinglePos ? 'bg-emerald-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle single position</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enforceSinglePos ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">Exposure Cap</p>
          <p className="text-xs text-zinc-500">Block trades exceeding 50% risk ceiling</p>
        </div>
        <button
          onClick={handleToggleExposureCap}
          disabled={!isConnected}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enforceExposureCap ? 'bg-amber-500' : 'bg-zinc-600'
          } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="sr-only">Toggle exposure cap</span>
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enforceExposureCap ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="pt-4 border-t border-zinc-800">
        <p className="text-sm font-medium text-zinc-200 mb-2">Simulation Engine</p>
        <button 
          onClick={onRunBacktest}
          disabled={isBacktesting || !isConnected}
          className={`w-full py-2 rounded-md font-medium text-sm transition-all ${
            !isConnected ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' :
            isBacktesting ? 'bg-emerald-500/20 text-emerald-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {!isConnected ? "Awaiting Backend Connection..." :
           isBacktesting ? `Processing: ${backtestStatus}...` : "Run 1-Month Factual Backtest"}
        </button>
      </div>
    </div>
  );
}
