'use client';
import './compound-globals.css';
import BottomPillNav from './components/layout/BottomPillNav';
import { AuthGuard } from './components/auth/AuthGuard';

export default function CompoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-[#000000] text-white flex flex-col overflow-hidden font-sans gpu-accelerated content-contain">
        <main className="flex-1 overflow-y-auto pb-28 scroll-smooth">
          {children}
        </main>
        <BottomPillNav />
      </div>
    </AuthGuard>
  );
}
