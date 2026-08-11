'use client';
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/app/compound/lib/supabase";
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
    let isSubscribed = true;

    async function checkAuthStatus() {
      // Stage 0: Public routes that bypass auth guard blocking
      if (
        pathname === "/compound/login" ||
        pathname === "/compound/onboarding" ||
        pathname === "/compound/terms" ||
        pathname.startsWith("/compound/login") ||
        pathname.startsWith("/compound/onboarding") ||
        pathname.startsWith("/compound/terms")
      ) {
        if (isSubscribed) {
          setIsAuthorized(true);
          setIsChecking(false);
        }
        return;
      }

      // Stage 1: Check Authentication & Supabase OAuth Token Hash
      let sessionExp = localStorage.getItem("cum_session_exp");
      let now = Date.now();
      let isAuthenticated = Boolean(sessionExp && parseInt(sessionExp, 10) > now);

      if (!isAuthenticated) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const exp = String(Date.now() + 7 * 86400 * 1000);
          localStorage.setItem("cum_session_exp", exp);
          if (session.user.email) localStorage.setItem("cum_user_email", session.user.email);
          if (session.user.user_metadata?.full_name) {
            localStorage.setItem("cum_user_name", session.user.user_metadata.full_name);
          }
          isAuthenticated = true;
        }
      }

      if (!isAuthenticated) {
        if (isSubscribed) {
          router.push("/compound/login");
          setIsChecking(false);
        }
        return;
      }

      // Stage 2: Check Terms & Conditions Acceptance
      const rulesAccepted = localStorage.getItem("cum_rules_accepted") === "true";
      if (!rulesAccepted) {
        if (isSubscribed) {
          setShowRulesModal(true);
          setIsChecking(false);
        }
        return;
      }

      // Stage 3: Protect Settings Page for Waitlist Users
      const isLocalhostDev = typeof window !== "undefined" && (
        window.location.hostname === "localhost" || 
        window.location.hostname === "127.0.0.1"
      );

      // Settings page is strictly locked for waitlist users (Unlocked on Monday Aug 17 WAT)
      if (pathname.startsWith("/compound/settings") && !isLocalhostDev) {
        if (isSubscribed) {
          router.push("/compound");
          setIsChecking(false);
        }
        return;
      }

      // Free waitlist access granted to view dashboard, charts, trade positions, and history!
      if (isSubscribed) {
        setIsAuthorized(true);
        setIsChecking(false);
      }
    }

    checkAuthStatus();

    return () => {
      isSubscribed = false;
    };
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
