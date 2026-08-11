'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/app/compound/lib/supabase";

interface SetupModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onComplete: () => void;
}

export const SetupChoiceModal: React.FC<SetupModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [selectedTab, setSelectedTab] = useState<"paystack" | "mt5">("paystack");
  const [depositAmount, setDepositAmount] = useState("10");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(depositAmount) || 0;
  const paystackFee = numAmount * 0.015 + 1.0; // 1.5% + ~$1 fee
  const totalPayable = numAmount + paystackFee;

  const handlePaystackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount < 10) {
      alert("Minimum deposit is $10.00 USD");
      return;
    }

    setIsProcessing(true);

    try {
      const { data: authData } = await supabase.auth.getUser();
      const email = authData?.user?.email || localStorage.getItem("cum_user_email") || "trader@compoundprotocol.com";

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amountUsd: numAmount,
          type: "deposit",
        }),
      });

      const data = await res.json();

      if (data.success && data.authorization_url) {
        // Redirect browser directly to Paystack Official Checkout
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Failed to initialize Paystack payment");
        setIsProcessing(false);
      }
    } catch (error: any) {
      alert("Paystack Connection Error: " + (error.message || "Failed to connect"));
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-5 relative"
        >
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8E8E93] hover:text-white text-sm font-mono p-1 cursor-pointer"
            >
              ✕
            </button>
          )}

          <div>
            <h2 className="text-lg font-extrabold text-white">Initialize Trading Account</h2>
            <p className="text-[11px] text-[#8E8E93]">Choose deposit gateway or MT5 private terminal setup</p>
          </div>

          {/* Option Selector Segment */}
          <div className="flex bg-[#000000]/60 p-1 rounded-2xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setSelectedTab("paystack")}
              className={`flex-1 py-2.5 rounded-xl text-[12px] font-extrabold transition-all ${
                selectedTab === "paystack" ? "bg-[#0A84FF] text-white shadow-lg" : "text-[#8E8E93]"
              }`}
            >
              Paystack Deposit
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab("mt5")}
              className={`flex-1 py-2.5 rounded-xl text-[12px] font-extrabold transition-all relative ${
                selectedTab === "mt5" ? "bg-[#1C1C1E] text-white" : "text-[#8E8E93]"
              }`}
            >
              $25/mo MT5 Terminal
            </button>
          </div>

          {selectedTab === "paystack" ? (
            /* PAYSTACK DEPOSIT DRAWER WITH FEE CALCULATION */
            <form onSubmit={handlePaystackSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] text-[#8E8E93] uppercase font-mono font-bold block mb-1">
                  Net Trading Deposit ($ USD)
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-[#000000] border border-white/[0.08] rounded-2xl p-3.5 text-white font-mono font-bold outline-none focus:border-[#0A84FF]"
                />
              </div>

              {/* Fee Breakdown Card */}
              <div className="bg-[#000000]/60 rounded-2xl p-3.5 border border-white/[0.08] space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-[#8E8E93]">
                  <span>Net Credited to Trading Account:</span>
                  <span className="text-[#34C759] font-bold">${numAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8E8E93]">
                  <span>Paystack Gateway Processing Fee (User Paid):</span>
                  <span className="text-[#FF3B30] font-bold">+${paystackFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white border-t border-white/[0.08] pt-2 font-extrabold">
                  <span>Total Amount Payable:</span>
                  <span className="text-[#0A84FF] text-[13px]">${totalPayable.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#0A84FF] text-white font-extrabold text-[13px] rounded-2xl shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:opacity-90 transition-all cursor-pointer flex justify-center items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Redirecting to Paystack...</span>
                  </>
                ) : (
                  `Pay $${totalPayable.toFixed(2)} via Paystack`
                )}
              </button>
            </form>
          ) : (
            /* LOCKED $25 MT5 TERMINAL DRAWER */
            <div className="p-5 bg-[#000000]/60 rounded-2xl border border-white/[0.08] text-center space-y-4">
              <span className="text-[10px] font-mono font-extrabold text-[#0A84FF] bg-[#0A84FF]/10 border border-[#0A84FF]/20 px-3 py-1 rounded-full uppercase tracking-wider block mx-auto w-fit">
                Rollout with cum£ound on 17th WAT
              </span>

              <h3 className="text-base font-extrabold text-white">Private MT5 Cloud Instance</h3>

              <p className="text-[12px] text-[#8E8E93] leading-relaxed">
                Connect your existing MT5 account directly to our VPS copiers. Available during official protocol launch on August 17th.
              </p>

              <button
                type="button"
                onClick={() => setSelectedTab("paystack")}
                className="w-full py-3 bg-[#1C1C1E] text-white font-bold text-[12px] rounded-2xl border border-white/[0.08]"
              >
                Use Paystack Deposit for Now
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
