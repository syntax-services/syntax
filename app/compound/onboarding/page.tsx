'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Icons = {
  Shield: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Check: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Server: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  ),
  Wallet: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
  )
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedArchitecture, setSelectedArchitecture] = useState<"pool" | "custom" | null>(null);

  useEffect(() => {
    const devOverride = localStorage.getItem("cum_dev_override") === "true";
    if (devOverride) return;

    const saved = localStorage.getItem("cum_waitlist_active");
    if (saved === "true" || saved === null) {
      router.push("/compound");
    }
  }, [router]);

  const completeOnboarding = () => {
    // In production, we would save this selection to the database.
    router.push("/compound");
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#000000] text-white flex flex-col font-sans">
      
      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Bot Rules */}
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full"
          >
            <div className="w-16 h-16 bg-[#0A84FF]/10 rounded-2xl flex items-center justify-center mb-6">
              <Icons.Shield className="w-8 h-8 text-[#0A84FF]" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Protocol Rules</h1>
            <p className="text-[15px] text-[#8E8E93] mb-8">
              Before accessing the institutional trading engine, you must acknowledge the network execution laws.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "The bot executes strictly based on Volume Profile & Liquidity sweeps. No manual override during active trades.",
                "Drawdown limits are hard-coded. Reaching the max daily limit suspends trading until 00:00 server time.",
                "Withdrawals from the Master Pool can be made at any time (subject to standard withdrawal fees).",
                "The platform deducts a 10% performance fee strictly from profits made by the bot (losses are not deducted).",
                "Server compute is limited. Heavy backtesting requires a Pro subscription."
              ].map((rule, i) => (
                <div key={i} className="flex gap-3 items-start bg-[#1C1C1E] p-4 rounded-xl border border-[#2C2C2E]">
                  <div className="mt-0.5 bg-[#34C759]/20 rounded-full p-1 shrink-0">
                    <Icons.Check className="w-3 h-3 text-[#34C759]" />
                  </div>
                  <span className="text-[13px] leading-relaxed text-white/90">{rule}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-4 bg-[#0A84FF] text-white font-bold rounded-full active:opacity-80 transition-opacity mt-auto"
            >
              I Accept the Rules
            </button>
          </motion.div>
        )}

        {/* STEP 2: Architecture Selection */}
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col px-6 py-12 max-w-md mx-auto w-full"
          >
            <h1 className="text-3xl font-bold tracking-tight mb-2 mt-4">Connect Broker</h1>
            <p className="text-[15px] text-[#8E8E93] mb-8">
              Choose your server execution architecture.
            </p>

            <div className="space-y-4">
              
              {/* Option A: Master Pool (Free) */}
              <button 
                onClick={() => setSelectedArchitecture("pool")}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  selectedArchitecture === "pool" ? 'bg-[#0A84FF]/10 border-[#0A84FF]' : 'bg-[#1C1C1E] border-[#2C2C2E]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedArchitecture === "pool" ? 'bg-[#0A84FF]' : 'bg-[#2C2C2E]'}`}>
                      <Icons.Wallet className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[17px] font-bold text-white tracking-wide">Master Pool</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#34C759] bg-[#34C759]/10 px-2 py-1 rounded">Recommended</span>
                </div>
                <p className="text-[13px] text-[#8E8E93] mb-3">Deposit directly to our registered broker API. Trades execute on our Master Server and equity is split proportionally to your dashboard instantly.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold text-[#8E8E93] bg-[#2C2C2E] px-2 py-0.5 rounded">$0 Server Cost</span>
                  <span className="text-[10px] font-semibold text-[#8E8E93] bg-[#2C2C2E] px-2 py-0.5 rounded">0ms Latency</span>
                </div>
              </button>

              {/* Option B: Custom MT5 (Premium) */}
              <button 
                onClick={() => setSelectedArchitecture("custom")}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  selectedArchitecture === "custom" ? 'bg-[#BF5AF2]/10 border-[#BF5AF2]' : 'bg-[#1C1C1E] border-[#2C2C2E]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedArchitecture === "custom" ? 'bg-[#BF5AF2]' : 'bg-[#2C2C2E]'}`}>
                      <Icons.Server className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[17px] font-bold text-white tracking-wide">Link Private MT5</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#BF5AF2] bg-[#BF5AF2]/10 px-2 py-1 rounded">Premium</span>
                </div>
                <p className="text-[13px] text-[#8E8E93] mb-3">Enter your own MT5 login credentials. We will spin up a dedicated cloud terminal instance to execute signals on your account directly.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold text-[#8E8E93] bg-[#2C2C2E] px-2 py-0.5 rounded-full">Requires Private Server ($25/mo)</span>
                </div>
              </button>

            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={completeOnboarding}
                disabled={!selectedArchitecture}
                className="w-full py-4 bg-white text-black font-bold rounded-full active:opacity-80 transition-opacity disabled:opacity-30"
              >
                Continue to Dashboard
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
