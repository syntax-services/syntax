'use client';
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface RulesModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const RulesAcceptanceModal: React.FC<RulesModalProps> = ({ isOpen, onAccept }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 30) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAcceptClick = () => {
    localStorage.setItem("cum_rules_accepted", "true");
    onAccept();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
            <div className="w-10 h-10 rounded-2xl bg-[#0A84FF]/20 border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF] font-bold text-lg">
              £
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Bot Decision & Risk Rules</h2>
              <p className="text-[11px] text-[#8E8E93]">Mandatory Terms for cum£ound Protocol</p>
            </div>
          </div>

          {/* Scrollable Terms Content */}
          <div
            onScroll={handleScroll}
            className="my-4 py-2 px-1 text-[12px] text-[#8E8E93] space-y-3 overflow-y-auto max-h-[42vh] font-mono border-y border-white/[0.08] no-scrollbar"
          >
            <div className="p-3.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#34C759] font-extrabold block mb-1">1. CENT ACCOUNT COMPOUNDING ($10 = 1,000 CENTS)</span>
              <p className="text-[#8E8E93] leading-relaxed">
                Minimum deposit is $10.00 USD, which converts to 1,000 Cent Units on MT5. Cent accounts enable micro-lot scaling (0.01 cent lot) to execute precision risk management and account flips without margin calls.
              </p>
            </div>

            <div className="p-3.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#0A84FF] font-extrabold block mb-1">2. FIXED INSTITUTIONAL RISK METRICS</span>
              <p className="text-[#8E8E93] leading-relaxed">
                Risk parameters are hardcoded in the Python core engine: Maximum 1.5% risk per trade and 5.0% maximum daily drawdown limit. All orders include automated stop-loss protection vectors.
              </p>
            </div>

            <div className="p-3.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#FF3B30] font-extrabold block mb-1">3. PAYSTACK USER-PAID GATEWAY FEES</span>
              <p className="text-[#8E8E93] leading-relaxed">
                To keep cum£ound Protocol 100% free, all Paystack payment processing fees (1.5% + ₦100 per transaction) are added on top of your deposit total and paid by the user.
              </p>
            </div>
          </div>

          {/* Link to Full Terms */}
          <div className="text-center py-1">
            <Link href="/compound/terms" target="_blank" className="text-[11px] text-[#0A84FF] font-mono hover:underline">
              Read Full Dedicated Terms & Conditions Page →
            </Link>
          </div>

          {/* Action Footer */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleAcceptClick}
              className="w-full py-3.5 bg-[#0A84FF] text-white font-extrabold text-[14px] rounded-2xl shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:opacity-90 transition-all cursor-pointer"
            >
              I Accept Bot Decisions & Risk Rules
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
