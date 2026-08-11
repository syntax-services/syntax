'use client';
import React, { useState, useEffect } from "react";
import { supabase } from "@/app/compound/lib/supabase";

interface TransactionLog {
  id: string;
  netAmount: number;
  fee: number;
  totalPaid: number;
  date: string;
  status: string;
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<TransactionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear legacy mock transaction entries from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cum_transactions");
    }

    // Query Real Confirmed Transactions from Supabase Database
    const fetchUserTransactions = async () => {
      setIsLoading(true);
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          const { data } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", authData.user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            const formatted: TransactionLog[] = data.map((t) => ({
              id: t.id || `TX_${t.created_at}`,
              netAmount: Number(t.net_amount) || 0.00,
              fee: Number(t.fee) || 0.00,
              totalPaid: Number(t.total_paid) || Number(t.net_amount) || 0.00,
              date: new Date(t.created_at).toLocaleString(),
              status: t.status || "Completed (Paystack Gateway)"
            }));
            setTransactions(formatted);
          } else {
            setTransactions([]);
          }
        } else {
          setTransactions([]);
        }
      } catch (e) {
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTransactions();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans flex flex-col pb-32 max-w-md mx-auto relative">
      {/* 100% Fixed Top Header Bar with Official Logo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-2xl px-4 pt-safe pt-3 pb-3 border-b border-white/[0.08] flex justify-between items-center max-w-md mx-auto">
        <h1 className="text-[17px] font-extrabold text-white tracking-wide">Transaction & Fee History</h1>
      </header>

      {/* Top Header Spacer */}
      <div className="h-14 flex-shrink-0" />

      <div className="p-4 space-y-4 flex-1">
        {isLoading ? (
          <div className="p-8 text-center text-[#8E8E93] font-mono text-xs">
            Loading real transaction logs...
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-[#1C1C1E]/60 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-8 text-center space-y-2 shadow-lg my-auto">
            <div className="w-12 h-12 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto text-[#8E8E93] text-xl font-bold font-mono">
              £
            </div>
            <h2 className="text-base font-extrabold text-white">No Transaction History Yet</h2>
            <p className="text-[12px] text-[#8E8E93] font-mono leading-relaxed">
              Deposits and transaction fee logs will appear here once executed and verified via Paystack.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-[#1C1C1E]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-5 space-y-3 shadow-xl font-mono text-[12px]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider block">Transaction ID</span>
                    <span className="text-white font-extrabold text-[13px]">{tx.id}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2.5 py-0.5 rounded-full uppercase">
                    {tx.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
                  <div className="p-2 bg-[#000000]/60 rounded-xl border border-white/[0.08]">
                    <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">Net Trading Credit</span>
                    <span className="text-[#34C759] font-extrabold">${tx.netAmount.toFixed(2)}</span>
                  </div>
                  <div className="p-2 bg-[#000000]/60 rounded-xl border border-white/[0.08]">
                    <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">Paystack Fee</span>
                    <span className="text-[#FF3B30] font-extrabold">${tx.fee.toFixed(2)}</span>
                  </div>
                  <div className="p-2 bg-[#000000]/60 rounded-xl border border-white/[0.08]">
                    <span className="text-[#8E8E93] text-[8px] uppercase font-bold block">Total Billed</span>
                    <span className="text-white font-extrabold">${tx.totalPaid.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-right text-[10px] text-[#8E8E93]">
                  Date: {tx.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
