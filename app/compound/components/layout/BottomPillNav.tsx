'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Icons = {
  Quotes: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18"></path>
      <path d="M3 7v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7"></path>
      <path d="M9 11v10"></path>
      <path d="M15 11v10"></path>
    </svg>
  ),
  Chart: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18"></path>
      <path d="M18 9l-5-5-4 4-6-6"></path>
      <path d="M18 9v4"></path>
      <path d="M18 9h-4"></path>
    </svg>
  ),
  Trade: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
  History: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 16 14"></polyline>
    </svg>
  ),
  Settings: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
};

const FULL_NAV_ITEMS = [
  { name: "cum£", href: "/", icon: Icons.Quotes },
  { name: "Chart", href: "/chart", icon: Icons.Chart },
  { name: "Trade", href: "/trade", icon: Icons.Trade }, 
  { name: "History", href: "/history", icon: Icons.History },
  { name: "Settings", href: "/settings", icon: Icons.Settings },
];

const WAITLIST_NAV_ITEMS = [
  { name: "Trade", href: "/trade", icon: Icons.Trade }, 
  { name: "Chart", href: "/chart", icon: Icons.Chart },
  { name: "History", href: "/history", icon: Icons.History },
];

export default function BottomPillNav() {
  const pathname = usePathname();
  const [isHighEnd, setIsHighEnd] = useState(true);
  const [isWaitlist, setIsWaitlist] = useState(true);

  const checkWaitlistState = () => {
    // Automatically bypass waitlist if we are on localhost
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      setIsWaitlist(false);
      return;
    }

    // If Dev Override is enabled on local laptop, bypass waitlist view
    const devOverride = localStorage.getItem("cum_dev_override") === "true";
    if (devOverride) {
      setIsWaitlist(false);
      return;
    }

    const saved = localStorage.getItem("cum_waitlist_active");
    if (saved !== null) {
      setIsWaitlist(saved === "true");
    } else {
      setIsWaitlist(true); // Default to waitlist mode
    }
  };

  useEffect(() => {
    checkWaitlistState();

    window.addEventListener("waitlist-state-changed", checkWaitlistState);

    // Hardware detection: apply extreme liquid glass only if RAM >= 4GB
    // @ts-ignore
    if (typeof navigator !== 'undefined' && navigator.deviceMemory) {
      // @ts-ignore
      if (navigator.deviceMemory < 4) {
        setIsHighEnd(false);
      }
    }

    return () => {
      window.removeEventListener("waitlist-state-changed", checkWaitlistState);
    };
  }, []);

  // If user is on /admin page, don't show pill nav
  if (pathname === "/admin") return null;

  const currentNavItems = isWaitlist ? WAITLIST_NAV_ITEMS : FULL_NAV_ITEMS;

  const glassmorphismClass = isHighEnd 
    ? "bg-[#1C1C1E]/40 backdrop-blur-[40px] border-white/10" 
    : "bg-[#1C1C1E] border-[#2C2C2E]";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50">
      <nav className={`flex items-center justify-between px-3 py-2 rounded-full border ${glassmorphismClass} shadow-2xl`}>
        {currentNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-12"
            >
              {isActive && (
                <motion.div
                  layoutId="pill-bubble"
                  className="absolute inset-0 bg-[#2C2C2E]/60 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${isActive ? "text-[#0A84FF]" : "text-[#8E8E93]"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                <span className="text-[9px] font-medium tracking-wide">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
