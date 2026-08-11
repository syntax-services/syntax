'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SetupChoiceModal } from "@/app/compound/components/auth/SetupChoiceModal";

const Icons = {
  Zap: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  TrendingUp: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  Clock: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Shield: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )
};

export default function DashboardHome() {
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-08-17T00:00:00+01:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans max-w-md mx-auto relative flex flex-col justify-start pb-32">
      {/* 100% Fixed Header Bar with Official Logo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-2xl px-4 pt-safe pt-2.5 pb-2.5 border-b border-white/[0.08] flex items-center justify-start max-w-md mx-auto">
        <div className="flex items-center justify-start py-0.5">
          <Image src="/logo.jpg" alt="Cum£ound Logo" width={200} height={50} className="h-10 w-auto object-contain" priority />
        </div>
      </header>

      {/* Top Header Spacer */}
      <div className="h-14 flex-shrink-0" />

      {/* Main Waitlist Dashboard Body */}
      <div className="p-4 space-y-5 flex-1">
        {/* Countdown Banner */}
        <div className="bg-[#1C1C1E]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-4 shadow-2xl text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 text-[#0A84FF]">
            <Icons.Clock className="w-5 h-5 animate-pulse" />
            <span className="text-xs uppercase font-extrabold tracking-widest font-mono">Official Rollout Countdown</span>
          </div>

          <div className="grid grid-cols-4 gap-2 font-mono">
            <div className="p-3 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-2xl font-extrabold text-white">{timeLeft.days}</span>
              <span className="text-[9px] text-[#8E8E93] uppercase font-bold block mt-0.5">Days</span>
            </div>
            <div className="p-3 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-2xl font-extrabold text-white">{timeLeft.hours}</span>
              <span className="text-[9px] text-[#8E8E93] uppercase font-bold block mt-0.5">Hours</span>
            </div>
            <div className="p-3 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-2xl font-extrabold text-white">{timeLeft.minutes}</span>
              <span className="text-[9px] text-[#8E8E93] uppercase font-bold block mt-0.5">Mins</span>
            </div>
            <div className="p-3 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-2xl font-extrabold text-white">{timeLeft.seconds}</span>
              <span className="text-[9px] text-[#8E8E93] uppercase font-bold block mt-0.5">Secs</span>
            </div>
          </div>

          <p className="text-[11px] text-[#8E8E93] font-mono">
            Launch Date: August 17th, 00:00 WAT • SMC Engine Active
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/compound/chart" className="p-4 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2 hover:border-[#0A84FF]/40 transition-all">
            <Icons.TrendingUp className="w-6 h-6 text-[#0A84FF]" />
            <h3 className="text-sm font-extrabold text-white">Live SMC Charts</h3>
            <p className="text-[10px] text-[#8E8E93] font-mono leading-relaxed">View LuxAlgo Smart Money Concepts & ICT Fair Value Gaps in real time.</p>
          </Link>

          <Link href="/compound/trade" className="p-4 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2 hover:border-[#34C759]/40 transition-all">
            <Icons.Zap className="w-6 h-6 text-[#34C759]" />
            <h3 className="text-sm font-extrabold text-white">Active Positions</h3>
            <p className="text-[10px] text-[#8E8E93] font-mono leading-relaxed">Monitor real-time institutional Wyckoff order executions on XAUUSD.</p>
          </Link>
        </div>

        {/* Deposit Lock Card */}
        <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-3 text-center shadow-xl">
          <div className="w-10 h-10 bg-[#0A84FF]/10 rounded-2xl border border-[#0A84FF]/20 flex items-center justify-center mx-auto text-[#0A84FF]">
            <Icons.Shield className="w-5 h-5" />
          </div>
          <h2 className="text-[14px] font-extrabold text-white">Pre-Rollout Account Preview Active</h2>
          <p className="text-[12px] text-[#8E8E93] font-mono leading-relaxed">
            You have full access to explore live charts, trade positions, and account settings. Paystack deposits and automated trade execution open on August 17th 00:00 WAT.
          </p>
          <button
            onClick={() => setIsChoiceModalOpen(true)}
            className="w-full py-3 bg-[#0A84FF] text-white font-extrabold text-[13px] rounded-2xl shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:opacity-90 transition-all cursor-pointer mt-2"
          >
            Choose Account Setup Tier
          </button>
        </div>
      </div>

      <SetupChoiceModal
        isOpen={isChoiceModalOpen}
        onClose={() => setIsChoiceModalOpen(false)}
        onComplete={() => setIsChoiceModalOpen(false)}
      />
    </div>
  );
}
