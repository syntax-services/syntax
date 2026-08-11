'use client';
import React from "react";

interface TradeLog {
  id: string;
  time: string | number;
  type: string;
  symbol?: string;
  pnl?: number;
  balance?: number;
  entry?: number;
  entry_price?: number;
  sl?: number;
  tp?: number;
  exit?: number;
  exit_price?: number;
  lot?: number;
  lot_size?: number;
}

interface PerformanceLogsProps {
  logs: TradeLog[];
  activePositions?: any[];
  perPairPnL?: { symbol: string; pnl: number }[];
}

export function PerformanceLogs({ logs, activePositions, perPairPnL }: PerformanceLogsProps) {
  const wins = logs.filter(l => (l.pnl ?? 0) > 0).length;
  const winRate = logs.length > 0 ? (wins / logs.length) * 100 : 0;

  const formatTime = (timeVal: string | number) => {
    if (!timeVal) return "";
    const num = Number(timeVal);
    if (isNaN(num)) return String(timeVal);
    if (num > 1000000000) {
      const date = new Date(num < 50000000000 ? num * 1000 : num);
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }
    return String(timeVal);
  };

  const parseLog = (log: TradeLog) => {
    const lot = log.lot ?? log.lot_size ?? 0;
    const entry = log.entry ?? log.entry_price ?? 0;
    const sl = log.sl ?? 0;
    const tp = log.tp ?? 0;
    const balance = log.balance ?? 0;
    const timeStr = formatTime(log.time);

    // Match with active position for real-time tracking if open
    const activePos = activePositions?.find(pos => 
      pos.type === log.type && 
      Math.abs(pos.entry_price - entry) < 0.05 && 
      Math.abs(pos.lot_size - lot) < 0.005
    );

    let pnl = log.pnl;
    let exit = log.exit || log.exit_price;

    if (activePos) {
      pnl = activePos.floating_pnl;
      exit = activePos.type === "BUY"
        ? entry + (activePos.floating_pnl / (100 * (lot || 0.01)))
        : entry - (activePos.floating_pnl / (100 * (lot || 0.01)));
    } else {
      if (pnl === undefined || pnl === 0) {
        // Estimate based on per-pair PnL direction
        const symbol = log.symbol || "XAUUSD";
        const pairPnLObj = perPairPnL?.find(p => p.symbol === symbol);
        const isWin = pairPnLObj ? pairPnLObj.pnl >= 0 : true;

        if (isWin) {
          exit = tp;
          pnl = log.type === "BUY"
            ? (tp - entry) * 100 * lot
            : (entry - tp) * 100 * lot;
        } else {
          exit = sl;
          pnl = log.type === "BUY"
            ? (sl - entry) * 100 * lot
            : (entry - sl) * 100 * lot;
        }
      }
      if (!exit) {
        exit = lot > 0 
          ? (log.type === "BUY" ? entry + (pnl / (100 * lot)) : entry - (pnl / (100 * lot)))
          : 0;
      }
    }

    return { lot, entry, sl, tp, balance, timeStr, pnl: pnl ?? 0, exit: exit ?? 0 };
  };

  const downloadCSV = () => {
    if (logs.length === 0) return;
    const headers = "Time,Type,Lot,Entry,SL,TP,Exit,PnL,Balance\n";
    const rows = logs.map(
      (log) => {
        const parsed = parseLog(log);
        return `${parsed.timeStr},${log.type},${parsed.lot.toFixed(2)},${parsed.entry.toFixed(2)},${parsed.sl.toFixed(2)},${parsed.tp.toFixed(2)},${parsed.exit.toFixed(2)},${parsed.pnl.toFixed(2)},${parsed.balance.toFixed(2)}`;
      }
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `VortexFlip_Backtest_Report_${Date.now()}.csv`);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4 shadow-xl shadow-black/50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-zinc-100">Performance Logs</h3>
        <div className="flex items-center gap-4">
          {logs.length > 0 && (
            <button
              onClick={downloadCSV}
              className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition-all shadow-md shadow-emerald-950/20"
            >
              Download Report (.CSV)
            </button>
          )}
          <span className="text-xs font-mono text-zinc-400">WR: {winRate.toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
            <tr>
              <th className="px-3 py-2 rounded-tl-lg">Time</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2 text-right">Lot</th>
              <th className="px-3 py-2 text-right">Entry</th>
              <th className="px-3 py-2 text-right">SL</th>
              <th className="px-3 py-2 text-right">TP</th>
              <th className="px-3 py-2 text-right">Exit</th>
              <th className="px-3 py-2 text-right rounded-tr-lg">PnL</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-zinc-500 italic">No trades logged yet.</td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const parsed = parseLog(log);

                return (
                  <tr key={log.id || `log-${index}`} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 font-mono text-xs">
                    <td className="px-3 py-2 text-zinc-400">{parsed.timeStr}</td>
                    <td className="px-3 py-2">
                      <span className={`font-bold ${log.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-zinc-300">{parsed.lot.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-zinc-300">{parsed.entry.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-rose-400/80">{parsed.sl.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-emerald-400/80">{parsed.tp.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-zinc-300">{parsed.exit.toFixed(2)}</td>
                    <td className={`px-3 py-2 text-right font-bold ${parsed.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {parsed.pnl >= 0 ? '+' : ''}{parsed.pnl.toFixed(2)}¢
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
