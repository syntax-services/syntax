'use client';
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/compound/lib/supabase";
import { SkeletonShimmer } from "@/app/compound/components/ui/SkeletonShimmer";

interface UserTradeMarker {
  id: string;
  symbol: string;
  action: "BUY" | "SELL";
  price: number;
  lot_size: number;
  time: string;
  profit?: number;
}

const SYMBOLS = [
  { label: "Gold (XAUUSD)", value: "OANDA:XAUUSD" },
  { label: "Euro (EURUSD)", value: "OANDA:EURUSD" },
  { label: "Pound (GBPUSD)", value: "OANDA:GBPUSD" },
  { label: "Yen (USDJPY)", value: "OANDA:USDJPY" },
  { label: "Bitcoin (BTCUSD)", value: "BITSTAMP:BTCUSD" },
];

const TIMEFRAMES = [
  { label: "1m", value: "1" },
  { label: "5m", value: "5" },
  { label: "15m", value: "15" },
  { label: "1H", value: "60" },
  { label: "4H", value: "240" },
  { label: "1D", value: "D" },
];

const DEFAULT_DRAWING_TOOLS = [
  { id: "trendline", name: "Trend Line", icon: "╱" },
  { id: "fvg_rect", name: "FVG Box", icon: "▭" },
  { id: "orderblock", name: "Order Block Zone", icon: "▨" },
  { id: "long_pos", name: "Long Position", icon: "▲" },
  { id: "short_pos", name: "Short Position", icon: "▼" },
  { id: "fib_retracement", name: "Fib Retracement", icon: "≡" },
];

export default function ChartPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  const [selectedSymbol, setSelectedSymbol] = useState("OANDA:XAUUSD");
  const [selectedTimeframe, setSelectedTimeframe] = useState("5");
  const [isChartLoading, setIsChartLoading] = useState(true);

  // User Chart Settings & Favorites State (Synced to Supabase)
  const [favoriteTools, setFavoriteTools] = useState<string[]>(["trendline", "long_pos", "orderblock"]);
  const [favoriteIndicators, setFavoriteIndicators] = useState<string[]>(["SMC LuxAlgo", "ICT Silver Bullet"]);
  const [saveSyncStatus, setSaveSyncStatus] = useState("Synced to Account");

  // User Executed Trades Overlay State
  const [userTrades, setUserTrades] = useState<UserTradeMarker[]>([]);
  const [showTradesOverlay, setShowTradesOverlay] = useState(true);

  // Load Saved Per-User Chart Settings & Favorites from Supabase
  useEffect(() => {
    const loadUserChartSettings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("user_chart_settings")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (data) {
            if (data.symbol) setSelectedSymbol(data.symbol);
            if (data.interval) setSelectedTimeframe(data.interval);
            if (data.favorite_tools) setFavoriteTools(data.favorite_tools);
            if (data.favorite_indicators) setFavoriteIndicators(data.favorite_indicators);
          }
        }
      } catch (e) {
        // Fallback to defaults
      }
    };

    loadUserChartSettings();
  }, []);

  // Save Per-User Chart Settings & Favorites to Supabase
  const saveUserSettingsToSupabase = async (
    newSymbol = selectedSymbol,
    newTimeframe = selectedTimeframe,
    newTools = favoriteTools,
    newIndicators = favoriteIndicators
  ) => {
    setSaveSyncStatus("Saving to Account...");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("user_chart_settings").upsert({
          user_id: user.id,
          symbol: newSymbol,
          interval: newTimeframe,
          favorite_tools: newTools,
          favorite_indicators: newIndicators,
          updated_at: new Date().toISOString(),
        });
        setSaveSyncStatus("Saved to Account ✓");
        setTimeout(() => setSaveSyncStatus("Synced to Account"), 2000);
      }
    } catch (e) {
      setSaveSyncStatus("Save Error");
    }
  };

  // Toggle Favorite Tool
  const toggleFavoriteTool = (toolId: string) => {
    const updated = favoriteTools.includes(toolId)
      ? favoriteTools.filter((t) => t !== toolId)
      : [...favoriteTools, toolId];
    setFavoriteTools(updated);
    saveUserSettingsToSupabase(selectedSymbol, selectedTimeframe, updated, favoriteIndicators);
  };

  // Fetch User Executed Trades & Subscribe to Realtime Supabase Channel
  useEffect(() => {
    const fetchUserTrades = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("trading_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const formatted: UserTradeMarker[] = data.map((t) => ({
            id: t.id,
            symbol: t.symbol || "XAUUSD",
            action: t.action === "BUY" ? "BUY" : "SELL",
            price: Number(t.price) || 2420.50,
            lot_size: Number(t.lot_size) || 0.01,
            time: new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            profit: Number(t.profit) || 0.00
          }));
          setUserTrades(formatted);
        }
      }
    };

    fetchUserTrades();

    const channel = supabase
      .channel("public:trading_logs_chart")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "trading_logs" },
        (payload) => {
          if (payload.new) {
            const newMarker: UserTradeMarker = {
              id: payload.new.id || String(Date.now()),
              symbol: payload.new.symbol || "XAUUSD",
              action: payload.new.action === "BUY" ? "BUY" : "SELL",
              price: Number(payload.new.price) || 2420.50,
              lot_size: Number(payload.new.lot_size) || 0.01,
              time: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              profit: Number(payload.new.profit) || 0.00
            };
            setUserTrades((prev) => [newMarker, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Initialize TradingView Widget with LocalStorage & User State Persistence
  useEffect(() => {
    setIsChartLoading(true);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).TradingView && containerRef.current) {
        containerRef.current.innerHTML = ""; // Clear existing

        widgetRef.current = new (window as any).TradingView.widget({
          autosize: true,
          symbol: selectedSymbol,
          interval: selectedTimeframe,
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#1C1C1E",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart_container",
          hide_side_toolbar: false,
          disabled_features: ["create_volume_indicator_by_default"],
          enabled_features: [
            "use_localstorage_for_settings",
            "side_toolbar_in_fullscreen_mode",
            "header-[#0A84FF]",
            "drawing_templates"
          ],
        });
        setIsChartLoading(false);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [selectedSymbol, selectedTimeframe]);

  const handleSymbolChange = (newSymbol: string) => {
    setSelectedSymbol(newSymbol);
    saveUserSettingsToSupabase(newSymbol, selectedTimeframe, favoriteTools, favoriteIndicators);
  };

  const handleTimeframeChange = (newTf: string) => {
    setSelectedTimeframe(newTf);
    saveUserSettingsToSupabase(selectedSymbol, newTf, favoriteTools, favoriteIndicators);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#000000] text-white flex flex-col font-sans overflow-hidden relative">
      {/* Control Bar: Symbol, Timeframe & Sync Status */}
      <div className="p-2.5 bg-[#1C1C1E] border-b border-[#2C2C2E] flex flex-wrap gap-2 justify-between items-center flex-shrink-0 pt-safe z-20">
        {/* Symbol Select */}
        <select
          value={selectedSymbol}
          onChange={(e) => handleSymbolChange(e.target.value)}
          className="bg-[#000000] text-[12px] font-mono text-white px-3 py-1.5 rounded-lg border border-[#2C2C2E] outline-none focus:border-[#0A84FF]"
        >
          {SYMBOLS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Timeframe Selector & Overlay Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-[#000000] p-1 rounded-lg border border-[#2C2C2E]">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.value}
                onClick={() => handleTimeframeChange(tf.value)}
                className={`px-2.5 py-0.5 text-[11px] font-mono font-bold rounded transition-all ${
                  selectedTimeframe === tf.value
                    ? "bg-[#0A84FF] text-white shadow"
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTradesOverlay(!showTradesOverlay)}
            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              showTradesOverlay
                ? "bg-[#34C759]/10 text-[#34C759] border-[#34C759]/30"
                : "bg-[#1C1C1E] text-[#8E8E93] border-white/[0.08]"
            }`}
          >
            {showTradesOverlay ? `My Trades (${userTrades.length})` : "Show Trades"}
          </button>
        </div>
      </div>



      {/* User Executed Trade Markers Overlay on Chart */}
      {showTradesOverlay && userTrades.length > 0 && (
        <div className="absolute top-24 right-3 z-30 max-w-[220px] bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 space-y-2 shadow-2xl font-mono text-[11px] max-h-48 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center pb-1 border-b border-white/[0.08] text-[9px] text-[#8E8E93] font-bold uppercase tracking-wider">
            <span>Executed Trade Signals</span>
            <span className="text-[#34C759]">Live Sync</span>
          </div>

          {userTrades.slice(0, 5).map((trade) => (
            <div key={trade.id} className="flex justify-between items-center bg-[#000000]/60 p-2 rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${trade.action === "BUY" ? "bg-[#34C759]" : "bg-[#FF3B30]"}`} />
                <span className="font-extrabold text-white text-[11px]">{trade.action}</span>
                <span className="text-[10px] text-[#8E8E93]">{trade.lot_size}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold text-[11px] block">@{trade.price}</span>
                <span className="text-[9px] text-[#8E8E93]">{trade.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Viewport TradingView Canvas */}
      <div className="flex-1 w-full relative min-h-0 overflow-hidden">
        {isChartLoading && (
          <div className="absolute inset-0 p-2 z-10 bg-[#000000]">
            <SkeletonShimmer height="h-full" rounded="rounded-lg" />
          </div>
        )}
        <div id="tradingview_chart_container" ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
