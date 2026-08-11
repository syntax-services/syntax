'use client';
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RulesAcceptanceModal } from "@/app/compound/components/auth/RulesAcceptanceModal";
import { SetupChoiceModal } from "@/app/compound/components/auth/SetupChoiceModal";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isChecking, setIsChecking] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Stage 0: Public routes that bypass auth guard blocking
    if (
      pathname === "/compound/login" ||
      pathname === "/compound/onboarding" ||
      pathname === "/compound/terms" ||
      pathname.startsWith("/compound/login") ||
      pathname.startsWith("/compound/onboarding") ||
      pathname.startsWith("/compound/terms")
    ) {
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    // Stage 1: Check Authentication
    const sessionExp = localStorage.getItem("cum_session_exp");
    const now = Date.now();
    const isAuthenticated = sessionExp && parseInt(sessionExp, 10) > now;

    if (!isAuthenticated) {
      router.push("/compound/login");
      setIsChecking(false);
      return;
    }

    // Stage 2: Check Terms & Conditions Acceptance
    const rulesAccepted = localStorage.getItem("cum_rules_accepted") === "true";
    if (!rulesAccepted) {
      setShowRulesModal(true);
      setIsChecking(false);
      return;
    }

    // Stage 3: Check Payment / Subscription Status (EXEMPTED FOR DEVELOPER ON LOCALHOST ONLY)
    const isLocalhostDev = typeof window !== "undefined" && (
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1"
    );

    const paymentCompleted = localStorage.getItem("cum_payment_completed") === "true";
    if (!paymentCompleted && !isLocalhostDev) {
      setShowPaymentModal(true);
      setIsChecking(false);
      return;
    }

    // All Checks Passed
    setIsAuthorized(true);
    setIsChecking(false);
  }, [router, pathname]);

  const handleRulesAccept = () => {
    localStorage.setItem("cum_rules_accepted", "true");
    setShowRulesModal(false);

    const isLocalhostDev = typeof window !== "undefined" && (
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1"
    );
    const paymentCompleted = localStorage.getItem("cum_payment_completed") === "true";

    if (!paymentCompleted && !isLocalhostDev) {
      setShowPaymentModal(true);
    } else {
      setIsAuthorized(true);
    }
  };

  const handlePaymentComplete = () => {
    localStorage.setItem("cum_payment_completed", "true");
    setShowPaymentModal(false);
    setIsAuthorized(true);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-[#0A84FF] border-t-transparent animate-spin mb-3" />
        <span className="text-[12px] text-[#8E8E93] font-mono">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <RulesAcceptanceModal
        isOpen={showRulesModal}
        onAccept={handleRulesAccept}
      />

      <SetupChoiceModal
        isOpen={showPaymentModal}
        onComplete={handlePaymentComplete}
      />

      {isAuthorized && children}
    </>
  );
};
