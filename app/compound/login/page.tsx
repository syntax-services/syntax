'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/compound/lib/supabase";
import { RulesAcceptanceModal } from "@/app/compound/components/auth/RulesAcceptanceModal";

export default function LoginPage() {
  const router = useRouter();

  // Auth State
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  // Modal State
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  // Auto-Redirect if user is already logged in & confirmed
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        if (session.user.email_confirmed_at || session.user.app_metadata?.provider === "google") {
          const rulesAccepted = localStorage.getItem("cum_rules_accepted");
          if (rulesAccepted === "true") {
            router.push("/compound");
          }
        }
      }
    });
  }, [router]);

  // Handle Email & Password Signup / Login
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setErrorMsg("");
    setNeedsEmailConfirm(false);
    setResendStatus("");

    try {
      if (isSignUp) {
        // Stage 1 Auth: Supabase SignUp
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });

        if (error) {
          throw error;
        }

        // Always enforce email confirmation check
        if (data?.user && !data.user.email_confirmed_at) {
          setNeedsEmailConfirm(true);
          setIsAuthLoading(false);
          return;
        }

        localStorage.setItem("cum_session_exp", String(Date.now() + 7 * 86400 * 1000));
        localStorage.setItem("cum_user_email", email);
        if (fullName) localStorage.setItem("cum_user_name", fullName);
        setIsRulesModalOpen(true);
      } else {
        // Stage 1 Auth: Supabase SignIn
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          if (error.message.includes("Email not confirmed")) {
            setNeedsEmailConfirm(true);
            setIsAuthLoading(false);
            return;
          }
          throw error;
        }

        // Block Sign In if Email Not Confirmed
        if (data?.user && !data.user.email_confirmed_at && data.user.app_metadata?.provider !== "google") {
          setNeedsEmailConfirm(true);
          setIsAuthLoading(false);
          return;
        }

        localStorage.setItem("cum_session_exp", String(Date.now() + 7 * 86400 * 1000));
        localStorage.setItem("cum_user_email", email);
        const rulesAccepted = localStorage.getItem("cum_rules_accepted");
        if (rulesAccepted !== "true") {
          setIsRulesModalOpen(true);
        } else {
          router.push("/compound");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Could not authenticate");
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Handle Google OAuth Sign-In (Auto-verified by Google)
  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign-in failed. Please verify Google OAuth Provider keys in Supabase Dashboard.");
      setIsAuthLoading(false);
    }
  };

  // Handle Resend Confirmation Email
  const handleResendConfirmation = async () => {
    if (!email) {
      setErrorMsg("Please enter your email address to resend confirmation.");
      return;
    }
    setResendStatus("Sending email...");
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });
      if (error) throw error;
      setResendStatus("Confirmation email resent! Check your inbox or spam folder.");
    } catch (err: any) {
      setResendStatus(err.message || "Could not resend confirmation email.");
    }
  };

  const handleModalAccept = () => {
    localStorage.setItem("cum_rules_accepted", "true");
    setIsRulesModalOpen(false);
    router.push("/compound");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0A84FF]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#1C1C1E]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-7 space-y-6 shadow-2xl z-10 relative">
        {/* Brand Header with Official Logo */}
        <div className="flex justify-start pb-1">
          <Image src="/logo.jpg" alt="Cum£ound Logo" width={220} height={55} className="h-11 w-auto object-contain" priority />
        </div>

        {/* Strict Email Confirmation Banner */}
        {needsEmailConfirm && (
          <div className="p-4 bg-[#FF9500]/10 border border-[#FF9500]/30 rounded-2xl space-y-2 text-center font-mono">
            <div className="w-8 h-8 rounded-full bg-[#FF9500]/20 text-[#FF9500] flex items-center justify-center mx-auto text-sm font-bold">
              ✉
            </div>
            <h3 className="text-sm font-extrabold text-[#FF9500]">Confirmation Email Required</h3>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed">
              {isSignUp
                ? "Account created! We are waiting for email confirmation. Please check your email inbox or spam folder for your confirmation link."
                : "Your account has not been confirmed yet. We are waiting for email confirmation before you can sign in. Please check your email inbox or spam folder."}
            </p>
            <button
              onClick={handleResendConfirmation}
              className="mt-2 text-[11px] text-[#0A84FF] font-bold underline hover:text-white transition-colors cursor-pointer"
            >
              Resend Confirmation Email
            </button>
            {resendStatus && (
              <p className="text-[10px] text-[#34C759] font-bold mt-1">{resendStatus}</p>
            )}
          </div>
        )}

        {/* Dual Mode Switcher Tab Bar */}
        <div className="flex bg-[#000000]/60 p-1 rounded-2xl border border-white/[0.08]">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(""); setNeedsEmailConfirm(false); }}
            className={`flex-1 py-2 rounded-xl text-[12px] font-extrabold transition-all ${
              !isSignUp ? "bg-[#0A84FF] text-white shadow-lg" : "text-[#8E8E93] hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(""); setNeedsEmailConfirm(false); }}
            className={`flex-1 py-2 rounded-xl text-[12px] font-extrabold transition-all ${
              isSignUp ? "bg-[#0A84FF] text-white shadow-lg" : "text-[#8E8E93] hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Feedback Banner */}
        {errorMsg && (
          <div className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-2xl text-[12px] text-[#FF3B30] text-center font-mono font-bold">
            {errorMsg}
          </div>
        )}

        {/* Email & Password Authentication Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-[10px] text-[#8E8E93] uppercase font-mono font-bold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Protocol Trader"
                className="w-full bg-[#000000] border border-white/[0.08] rounded-2xl p-3 text-white font-mono text-sm outline-none focus:border-[#0A84FF] transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] text-[#8E8E93] uppercase font-mono font-bold block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@domain.com"
              className="w-full bg-[#000000] border border-white/[0.08] rounded-2xl p-3 text-white font-mono text-sm outline-none focus:border-[#0A84FF] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] text-[#8E8E93] uppercase font-mono font-bold block mb-1">
              Account Security Key (Password)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#000000] border border-white/[0.08] rounded-2xl p-3 text-white font-mono text-sm outline-none focus:border-[#0A84FF] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isAuthLoading}
            className="w-full py-3.5 bg-[#0A84FF] text-white font-extrabold text-[13px] rounded-2xl shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:opacity-90 transition-all cursor-pointer flex justify-center items-center gap-2"
          >
            {isAuthLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Processing...</span>
              </>
            ) : isSignUp ? (
              "Create Trader Account"
            ) : (
              "Sign In to Terminal"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-white/[0.08] flex-1" />
          <span className="text-[10px] text-[#8E8E93] font-mono uppercase tracking-wider">OR</span>
          <div className="h-px bg-white/[0.08] flex-1" />
        </div>

        {/* Google OAuth 3rd-Party Sign-In (Auto-Verified) */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isAuthLoading}
          className="w-full py-3 bg-[#000000] border border-white/[0.12] rounded-2xl text-white font-mono font-bold text-xs flex justify-center items-center gap-3 hover:bg-white/[0.05] transition-all cursor-pointer shadow-lg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Sign In with Google</span>
        </button>

        <p className="text-[10px] text-center text-[#8E8E93] font-mono leading-relaxed">
          By signing in, you agree to our Protocol Terms & Institutional Risk Rules.
        </p>
      </div>

      {/* Mandatory Terms & Conditions Modal */}
      <RulesAcceptanceModal
        isOpen={isRulesModalOpen}
        onAccept={handleModalAccept}
      />
    </div>
  );
}
