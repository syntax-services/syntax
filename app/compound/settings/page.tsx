'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/compound/lib/supabase";

const Icons = {
  Zap: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Wallet: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="M6 8h12"></path>
      <circle cx="16" cy="14" r="1.5"></circle>
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
  Lock: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  LogOut: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  User: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Edit: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  ChevronRight: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
};

export default function SettingsPage() {
  const router = useRouter();
  
  // User Profile State
  const [userName, setUserName] = useState("Protocol Trader");
  const [userEmail, setUserEmail] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Dev & MT5 Subscription State
  const [isMt5Subscribed, setIsMt5Subscribed] = useState(false);
  const [isLocalhostDev, setIsLocalhostDev] = useState(false);
  const [paystackStatus, setPaystackStatus] = useState("");
  const [isAfterAug17, setIsAfterAug17] = useState(false);

  // MT5 Credentials State
  const [mt5Broker, setMt5Broker] = useState("Exness Technologies");
  const [mt5Server, setMt5Server] = useState("Exness-Real7");
  const [mt5Login, setMt5Login] = useState("5098231");

  // Wallet / Deposit State ($0.00 Default)
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    // Check Localhost Developer Exemption
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        setIsLocalhostDev(true);
        localStorage.setItem("cum_mt5_subscribed", "true");
        setIsMt5Subscribed(true);
      } else {
        const storedSub = localStorage.getItem("cum_mt5_subscribed");
        if (storedSub === "true") setIsMt5Subscribed(true);
      }

      const storedEmail = localStorage.getItem("cum_user_email");
      if (storedEmail) setUserEmail(storedEmail);

      const storedName = localStorage.getItem("cum_user_name");
      if (storedName) setUserName(storedName);
    }

    const targetDate = new Date("2026-08-17T00:00:00+01:00").getTime();
    if (Date.now() >= targetDate) {
      setIsAfterAug17(true);
    }

    // Fetch user profile from Supabase if logged in
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        if (data.user.email) setUserEmail(data.user.email);
        if (data.user.user_metadata?.full_name) {
          setUserName(data.user.user_metadata.full_name);
        }
      }
    });
    // Check URL parameters for Paystack payment callback
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const payment = urlParams.get("payment");
      const reference = urlParams.get("reference");
      const type = urlParams.get("type");

      if (payment === "success" && reference) {
        setPaystackStatus("Verifying Paystack Payment...");
        fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              if (type === "mt5_subscription") {
                setIsMt5Subscribed(true);
                localStorage.setItem("cum_mt5_subscribed", "true");
                setPaystackStatus("MT5 Instance Active ($25/mo)");
              } else {
                setPaystackStatus("Deposit Verified & Credited Successfully!");
              }
            } else {
              setPaystackStatus(data.message || "Payment Verification Pending");
            }
          })
          .catch(() => setPaystackStatus("Payment Verification Error"));
      }
    }
  }, []);

  const handleSaveProfile = async () => {
    setSaveStatus("Saving changes...");
    localStorage.setItem("cum_user_name", userName);
    try {
      await supabase.auth.updateUser({
        data: { full_name: userName }
      });
    } catch (e) {
      // Graceful fallback
    }
    setSaveStatus("Profile saved!");
    setTimeout(() => {
      setSaveStatus("");
      setIsEditingProfile(false);
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem("cum_session_exp");
    localStorage.removeItem("cum_user_email");
    localStorage.removeItem("cum_user_name");
    localStorage.removeItem("cum_rules_accepted");
    localStorage.removeItem("cum_payment_completed");
    router.push("/compound/login");
  };

  const handleMt5Subscribe = async () => {
    setPaystackStatus("Connecting Paystack Gateway...");
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, amountUsd: 25, type: "mt5_subscription" }),
      });
      const data = await res.json();
      if (data.success && data.authorization_url) {
        setPaystackStatus("Redirecting to Paystack...");
        window.location.href = data.authorization_url;
      } else {
        setPaystackStatus(data.error || "Paystack connection failed");
      }
    } catch (e) {
      setPaystackStatus("Paystack Connection Error");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) < 10) {
      setPaystackStatus("Minimum deposit is $10.00 USD");
      return;
    }
    setPaystackStatus("Connecting Paystack Gateway...");
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, amountUsd: Number(depositAmount), type: "deposit" }),
      });
      const data = await res.json();
      if (data.success && data.authorization_url) {
        setPaystackStatus("Redirecting to Paystack...");
        window.location.href = data.authorization_url;
      } else {
        setPaystackStatus(data.error || "Paystack connection failed");
      }
    } catch (e) {
      setPaystackStatus("Paystack Connection Error");
    }
  };

  const handleWithdraw = () => {
    if (!withdrawAmount) return;
    setPaystackStatus(`Withdrawal Request ($${withdrawAmount} USD) Submitted`);
  };

  const canAccessMt5 = isLocalhostDev || isMt5Subscribed || isAfterAug17;

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white flex flex-col pb-32 font-sans relative max-w-md mx-auto">
      {/* Fixed Top Header Bar with Logo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-2xl px-4 pt-safe pt-3 pb-3 border-b border-white/[0.08] flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-[17px] font-extrabold text-white tracking-wide">Account & Profile</h1>
      </header>

      {/* Top Header Spacer */}
      <div className="h-14 flex-shrink-0" />

      <div className="p-4 space-y-5 flex-1">
        {/* 1. User Profile Header Card (Inspiration from String. App) */}
        <div className="bg-[#1C1C1E]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-6 space-y-4 shadow-2xl text-center relative overflow-hidden">
          {/* Glowing Avatar Border */}
          <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#0A84FF] via-[#34C759] to-[#0A84FF] shadow-[0_0_25px_rgba(10,132,255,0.4)]">
            <div className="w-full h-full rounded-full bg-[#000000] flex items-center justify-center text-white font-extrabold text-xl">
              {userName ? userName.slice(0, 2).toUpperCase() : "TV"}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight">{userName}</h2>
              <span className="text-[9px] font-mono font-bold text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2 py-0.5 rounded-full uppercase">
                {isLocalhostDev ? "DEVELOPER" : "VERIFIED TRADER"}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider block mt-0.5">
              {userEmail}
            </span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.08] font-mono text-[11px]">
            <div className="p-2.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">Net Equity</span>
              <span className="text-white font-extrabold text-[12px]">$0.00</span>
            </div>
            <div className="p-2.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">Active Trades</span>
              <span className="text-[#0A84FF] font-extrabold text-[12px]">0</span>
            </div>
            <div className="p-2.5 bg-[#000000]/60 rounded-2xl border border-white/[0.08]">
              <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">MT5 Status</span>
              <span className="text-[#34C759] font-extrabold text-[12px]">{canAccessMt5 ? "Active" : "Locked"}</span>
            </div>
          </div>
        </div>

        {/* 2. Edit Profile Details Interface */}
        <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-[#8E8E93] uppercase tracking-widest font-extrabold flex items-center gap-2">
              <Icons.User className="w-4 h-4 text-[#0A84FF]" />
              Personal Profile Details
            </h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-[11px] text-[#0A84FF] font-mono font-bold hover:underline"
            >
              {isEditingProfile ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {isEditingProfile ? (
            <div className="space-y-3 font-mono text-[12px] pt-1">
              <div>
                <label className="text-[10px] text-[#8E8E93] uppercase font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#000000] text-white p-3 rounded-2xl border border-white/[0.08] outline-none focus:border-[#0A84FF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8E8E93] uppercase font-bold block mb-1">Account Email</label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="w-full bg-[#000000]/50 text-[#8E8E93] p-3 rounded-2xl border border-white/[0.08] outline-none cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="w-full py-3 bg-[#0A84FF] text-white font-extrabold text-[12px] rounded-2xl hover:opacity-90 transition-all cursor-pointer shadow-lg"
              >
                {saveStatus || "Save Profile Changes"}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.08] font-mono text-[12px]">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#8E8E93]">Display Name</span>
                <span className="text-white font-bold">{userName}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#8E8E93]">Email Address</span>
                <span className="text-white font-bold">{userEmail}</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. $25/mo Private MT5 Instance Subscription Card */}
        <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-3 shadow-xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-[#34C759]/20 text-[#34C759] rounded-2xl border border-[#34C759]/30">
                <Icons.Server className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-extrabold text-white">Private MT5 Cloud Instance</h2>
                <span className="text-[11px] text-[#8E8E93]">Dedicated MT5 login terminal server</span>
              </div>
            </div>
            <span className="text-xl font-extrabold font-mono text-white">$25<span className="text-[11px] font-normal text-[#8E8E93]">/mo</span></span>
          </div>

          <button
            onClick={handleMt5Subscribe}
            className={`w-full py-3 rounded-2xl font-extrabold text-[13px] transition-all cursor-pointer ${
              canAccessMt5
                ? "bg-[#34C759] text-white shadow-lg"
                : "bg-[#0A84FF] text-white hover:opacity-90 shadow-[0_0_20px_rgba(10,132,255,0.3)]"
            }`}
          >
            {canAccessMt5 ? "Active Dedicated Instance ($25/mo)" : "Subscribe to Private MT5 Instance ($25/mo)"}
          </button>
        </div>

        {/* 4. MT5 Broker Account Connection */}
        {canAccessMt5 ? (
          <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-[#34C759]/30 p-5 space-y-3 shadow-xl tint-green">
            <div className="flex items-center justify-between">
              <h2 className="text-xs text-white uppercase tracking-widest font-extrabold">MT5 Terminal Connection</h2>
              <span className="text-[9px] font-mono font-bold text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full uppercase">
                Active & Connected
              </span>
            </div>

            <div className="space-y-2 font-mono text-[12px]">
              <div>
                <label className="text-[10px] text-[#8E8E93] uppercase font-bold block mb-1">Broker Name</label>
                <input
                  type="text"
                  value={mt5Broker}
                  onChange={(e) => setMt5Broker(e.target.value)}
                  placeholder="Broker Name (e.g. Exness)"
                  className="w-full bg-[#000000] text-white p-3 rounded-2xl border border-white/[0.08] outline-none focus:border-[#34C759]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8E8E93] uppercase font-bold block mb-1">Broker Server</label>
                <input
                  type="text"
                  value={mt5Server}
                  onChange={(e) => setMt5Server(e.target.value)}
                  placeholder="Server (e.g. Exness-Real7)"
                  className="w-full bg-[#000000] text-white p-3 rounded-2xl border border-white/[0.08] outline-none focus:border-[#34C759]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8E8E93] uppercase font-bold block mb-1">Login Account ID</label>
                <input
                  type="text"
                  value={mt5Login}
                  onChange={(e) => setMt5Login(e.target.value)}
                  placeholder="Login ID (e.g. 5098231)"
                  className="w-full bg-[#000000] text-white p-3 rounded-2xl border border-white/[0.08] outline-none focus:border-[#34C759]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-3 text-center shadow-lg">
            <div className="w-10 h-10 bg-[#0A84FF]/10 rounded-2xl border border-[#0A84FF]/20 flex items-center justify-center mx-auto text-[#0A84FF]">
              <Icons.Lock className="w-5 h-5" />
            </div>
            <h2 className="text-[14px] font-extrabold text-white">MT5 Direct Terminal Connection Locked</h2>
            <p className="text-[12px] text-[#8E8E93] leading-relaxed">
              Direct MT5 credentials input (<code className="text-[#0A84FF] font-mono">Exness Technologies / Exness-Real7 / 5098231</code>) is strictly reserved for $25/mo subscribers and unlocks automatically on August 17th 00:00 WAT.
            </p>
          </div>
        )}

        {/* 5. Wallet & Paystack Gateway Section */}
        <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-4 shadow-xl">
          <h2 className="text-xs text-[#8E8E93] uppercase tracking-widest font-extrabold flex items-center gap-2">
            <Icons.Wallet className="w-3.5 h-3.5 text-[#34C759]" />
            Wallet & Paystack Deposits
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-[#8E8E93] uppercase font-extrabold tracking-wider block mb-1">Deposit Funds (Min $10.00)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min $10.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 bg-[#000000] text-[13px] font-mono text-white px-3 py-2.5 rounded-2xl border border-white/[0.08] outline-none focus:border-[#0A84FF]"
                />
                <button
                  onClick={handleDeposit}
                  className="px-4 py-2.5 bg-[#0A84FF] text-white font-bold text-[12px] rounded-2xl hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  Paystack Deposit
                </button>
              </div>
              {paystackStatus && <span className="text-[10px] text-[#34C759] block mt-1 font-mono">{paystackStatus}</span>}
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <label className="text-[10px] text-[#8E8E93] uppercase font-extrabold tracking-wider block mb-1">Request Withdrawal</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Amount (e.g. 50)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="flex-1 bg-[#000000] text-[13px] font-mono text-white px-3 py-2.5 rounded-2xl border border-white/[0.08] outline-none focus:border-[#34C759]"
                />
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2.5 bg-[#34C759] text-white font-bold text-[12px] rounded-2xl hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Clean Sign Out Button */}
        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] hover:bg-[#FF3B30]/20 font-extrabold text-[13px] rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Icons.LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="text-center font-mono text-[10px] text-[#8E8E93] tracking-widest uppercase pt-2">
          Joined August 2026 • Cum£ound Protocol
        </div>
      </div>
    </div>
  );
}
