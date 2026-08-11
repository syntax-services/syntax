'use client';
import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans max-w-2xl mx-auto p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 pt-safe">
        <Link href="/compound" className="text-[#0A84FF] text-[13px] font-mono font-bold hover:underline mb-4 block">
          ← Back to cum£ound Protocol
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Terms of Service & Risk Disclosure
        </h1>
        <p className="text-[12px] text-[#8E8E93] font-mono mt-1">
          Effective Date: August 10, 2026 | Version 2.4 Neural
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6 text-[13px] text-[#8E8E93] leading-relaxed font-mono">
        {/* Section 1 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-[#0A84FF] uppercase tracking-wider">
            1. Email Verification Requirement
          </h2>
          <p>
            All registered users must confirm their email address via the verification link sent by Supabase Authentication before gaining access to platform features, terms acceptance, or trading execution. Accounts with unverified emails remain strictly restricted.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-[#34C759] uppercase tracking-wider">
            2. Cent Account Compounding Mechanics ($10 USD = 1,000 Cents)
          </h2>
          <p>
            cum£ound Protocol utilizes <strong>MetaTrader 5 Cent Accounts</strong> for all automated trading compounding. A minimum deposit of <strong>$10.00 USD</strong> is converted into <strong>1,000 Cent Units</strong> on MT5 server infrastructure.
          </p>
          <p>
            <em>Why Cent Accounts?</em> Cent accounts enable micro-lot scaling (0.01 cent lot = $0.0001 per point). This mathematical precision allows our Smart Money Concept (SMC) algorithm to manage risk on micro balances, flip small accounts safely, and prevent margin call liquidations during volatile XAUUSD news sweeps.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-[#0A84FF] uppercase tracking-wider">
            3. Hardcoded Institutional Risk Rules
          </h2>
          <p>
            Bot execution parameters are hardcoded in our core Python engine:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white font-bold">
            <li>Fixed Risk Per Trade: Maximum 1.5% of total account equity.</li>
            <li>Maximum Daily Drawdown Cap: 5.0% total daily equity limit.</li>
            <li>Automated Stop-Loss Vectors: Applied to 100% of open positions.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-[#FF3B30] uppercase tracking-wider">
            4. Paystack Gateway Processing Fees Policy
          </h2>
          <p>
            To keep cum£ound Protocol 100% free for base usage, all Paystack payment processing fees (1.5% + ₦100 per deposit transaction) are added on top of your deposit total and paid by the user. Your full net deposit amount (e.g. $10.00) is credited to your trading account.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            5. Physical Device & Multi-Account Limit
          </h2>
          <p>
            To preserve server bandwidth and prevent network abuse, a maximum of 2 registered accounts are permitted per physical device hardware fingerprint. Violations result in automatic session suspension.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-5 bg-[#1C1C1E]/80 backdrop-blur-2xl rounded-3xl border border-white/[0.08] space-y-2">
          <h2 className="text-sm font-extrabold text-[#FF3B30] uppercase tracking-wider">
            6. Financial Liability Waiver
          </h2>
          <p>
            Trading financial instruments involves significant risk. cum£ound Protocol provides automated execution algorithms. Users retain sole legal and financial responsibility for their trading capital and account decisions.
          </p>
        </section>
      </div>

      {/* Footer Back Link */}
      <div className="pt-6 border-t border-white/[0.08] text-center">
        <Link href="/compound" className="py-3.5 px-8 bg-[#0A84FF] text-white font-extrabold text-[13px] rounded-2xl shadow-lg inline-block">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
