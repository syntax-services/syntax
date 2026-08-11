'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateDeviceFingerprint, activateAdminBypass } from "@/app/compound/lib/fingerprint";

const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || "";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "syntaxservices25@gmail.com";

export default function AdminPage() {
  const [emailInput, setEmailInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [waitlistActive, setWaitlistActive] = useState(true);
  const [devOverride, setDevOverride] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Fingerprint Security Controls
  const [deviceFp, setDeviceFp] = useState("");
  const [isBypassed, setIsBypassed] = useState(false);
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    // Read global waitlist status
    const savedWaitlist = localStorage.getItem("cum_waitlist_active");
    if (savedWaitlist !== null) {
      setWaitlistActive(savedWaitlist === "true");
    }

    // Read local dev override status
    const savedOverride = localStorage.getItem("cum_dev_override");
    if (savedOverride !== null) {
      setDevOverride(savedOverride === "true");
    }

    // Check if previously logged in
    const authState = localStorage.getItem("cum_admin_authenticated");
    if (authState === "true") {
      setIsAuthenticated(true);
    }

    const fp = generateDeviceFingerprint();
    setDeviceFp(fp);
    setIsBypassed(localStorage.getItem("cum_device_bypass") === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() === ADMIN_EMAIL && tokenInput.trim() === ADMIN_TOKEN) {
      setIsAuthenticated(true);
      localStorage.setItem("cum_admin_authenticated", "true");
      setStatusMessage("Authenticated successfully.");
    } else {
      setStatusMessage("Invalid Admin Credentials or Security Token.");
    }
  };

  const toggleWaitlist = () => {
    const nextState = !waitlistActive;
    setWaitlistActive(nextState);
    localStorage.setItem("cum_waitlist_active", String(nextState));
    window.dispatchEvent(new Event("waitlist-state-changed"));
    setStatusMessage(`Global Waitlist Mode is now ${nextState ? "ACTIVE (Public visitors see countdown)" : "OFF (App unlocked)"}`);
  };

  const toggleDevOverride = () => {
    const nextState = !devOverride;
    setDevOverride(nextState);
    localStorage.setItem("cum_dev_override", String(nextState));
    window.dispatchEvent(new Event("waitlist-state-changed"));
    setStatusMessage(`Local Laptop Override is now ${nextState ? "ENABLED" : "DISABLED"}`);
  };

  const handleAdminBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (activateAdminBypass(secretInput)) {
      setIsBypassed(true);
      setStatusMessage("Admin Device Account Override ENABLED! Unlimited accounts allowed on this device.");
    } else {
      setStatusMessage("Invalid Bypass Key.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("cum_admin_authenticated");
  };

  return (
    <div className="min-h-[100dvh] bg-[#000000] text-white flex flex-col items-center justify-center p-6 font-sans">
      {!isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-6">
            <span className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-widest mb-1">Control Center</span>
            <h1 className="text-2xl font-bold tracking-tight">Admin Authentication</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] text-[#8E8E93] font-semibold uppercase tracking-wider block mb-1">Admin Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter Admin Email"
                className="w-full bg-[#000000] text-[14px] text-white px-4 py-3 rounded-xl border border-[#2C2C2E] outline-none focus:border-[#0A84FF] transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-[11px] text-[#8E8E93] font-semibold uppercase tracking-wider block mb-1">Security Token</label>
              <textarea
                rows={3}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste ADMIN_API_TOKEN"
                className="w-full bg-[#000000] text-[12px] font-mono text-white px-4 py-3 rounded-xl border border-[#2C2C2E] outline-none focus:border-[#0A84FF] transition-colors resize-none"
                required
              />
            </div>

            {statusMessage && (
              <p className="text-[12px] text-[#FF3B30] text-center font-medium">{statusMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0A84FF] text-white font-bold rounded-full active:opacity-80 transition-opacity mt-2 cursor-pointer"
            >
              Verify Credentials
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-[#1C1C1E] border border-[#2C2C2E] rounded-3xl p-6 shadow-2xl space-y-6"
        >
          <div className="flex justify-between items-center border-b border-[#2C2C2E] pb-4">
            <div>
              <span className="text-[10px] text-[#34C759] uppercase font-bold tracking-widest">Authenticated</span>
              <h1 className="text-xl font-bold tracking-tight text-white">{ADMIN_EMAIL}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-[#2C2C2E] text-[11px] text-[#FF3B30] font-semibold rounded-full hover:bg-[#FF3B30]/10 transition-colors"
            >
              Lock Panel
            </button>
          </div>

          {/* Switch 1: Global Live Waitlist Mode */}
          <div className="bg-[#141415] border border-[#2C2C2E] rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[15px] font-bold text-white">Global Live Waitlist Mode</h2>
                <p className="text-[11px] text-[#8E8E93] mt-0.5">
                  {waitlistActive
                    ? "Active: Public domain visitors see countdown."
                    : "Off: Live site is fully unlocked for all users."}
                </p>
              </div>

              <button
                onClick={toggleWaitlist}
                className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                  waitlistActive ? "bg-[#34C759]" : "bg-[#2C2C2E]"
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: waitlistActive ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Switch 2: Local Laptop Dev Override */}
          <div className="bg-[#141415] border border-[#0A84FF]/30 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-white">Local Laptop Dev Override</h2>
                  <span className="text-[9px] bg-[#0A84FF]/20 text-[#0A84FF] px-2 py-0.5 rounded-full font-bold uppercase">Laptop Only</span>
                </div>
                <p className="text-[11px] text-[#8E8E93] mt-0.5">
                  {devOverride
                    ? "Enabled: Full access on localhost."
                    : "Disabled: Localhost follows global waitlist."}
                </p>
              </div>

              <button
                onClick={toggleDevOverride}
                className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                  devOverride ? "bg-[#0A84FF]" : "bg-[#2C2C2E]"
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: devOverride ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Admin Device Fingerprint & Security Section */}
          <div className="bg-[#141415] border border-[#2C2C2E] rounded-2xl p-5 space-y-3">
            <h2 className="text-[15px] font-bold text-white">Admin Device Security & Bypass</h2>
            <div className="text-[11px] font-mono text-[#8E8E93]">
              <div>Current Device Hash: <span className="text-white font-bold">{deviceFp}</span></div>
              <div>Bypass Status: <span className={isBypassed ? "text-[#34C759] font-bold" : "text-[#8E8E93]"}>{isBypassed ? "UNLIMITED ACCOUNTS (Bypass Active)" : "Restricted (Max 2)"}</span></div>
            </div>

            <form onSubmit={handleAdminBypass} className="flex gap-2 pt-2">
              <input
                type="password"
                placeholder="Enter DEV_ADMIN_BYPASS"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                className="flex-1 bg-[#000000] text-[12px] font-mono text-white px-3 py-2 rounded-xl border border-[#2C2C2E] outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-[#0A84FF] text-white font-bold text-[11px] rounded-xl">
                Activate Bypass
              </button>
            </form>
          </div>

          {statusMessage && (
            <p className="text-[12px] text-[#34C759] font-mono text-center">{statusMessage}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
