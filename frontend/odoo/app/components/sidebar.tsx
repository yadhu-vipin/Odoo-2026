"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Route, 
  Wrench, 
  CreditCard, 
  BarChart3, 
  Plus, 
  HelpCircle, 
  Settings 
} from 'lucide-react';


function getUserTag(): number {
  if (typeof document === 'undefined') return 1;
  const match = document.cookie.match(/(^|;) ?user_tag=([^;]*)(;|$)/);
  return match ? parseInt(match[2], 10) : 1;
}

const ROLE_PERMISSIONS: Record<number, string[]> = {
  1: ['/dashboard', '/fleet', '/drivers', '/trips', '/maintenance', '/expenses', '/reports', '/help', '/settings'],
  2: ['/dashboard', '/fleet', '/drivers', '/trips', '/help', '/settings'],
  3: ['/dashboard', '/drivers', '/maintenance', '/help', '/settings'],
  4: ['/dashboard', '/fleet', '/expenses', '/reports', '/help', '/settings'],
};

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [userTag, setUserTag] = useState(1);
  
  useEffect(() => {
    setMounted(true);
    setUserTag(getUserTag());
  }, []);

  // Use fallback permissions until mounted to ensure SSR matches client initial render
  const allowed = ROLE_PERMISSIONS[mounted ? userTag : 1] || [];

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Fleet', icon: Truck, href: '/fleet' },
    { label: 'Drivers', icon: Users, href: '/drivers' },
    { label: 'Trips', icon: Route, href: '/trips' },
    { label: 'Maintenance', icon: Wrench, href: '/maintenance' },
    { label: 'Expenses', icon: CreditCard, href: '/expenses' },
    { label: 'Reports', icon: BarChart3, href: '/reports' },
  ].filter(item => allowed.includes(item.href));

  const bottomItems = [
    { label: 'Help', icon: HelpCircle, href: '/help' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ].filter(item => allowed.includes(item.href));

  // Replace your return block in Sidebar.tsx
  return (
    <aside className="w-64 bg-[#FFF1F3] border-r border-[#EEDADF] flex flex-col justify-between fixed h-screen left-0 top-0 z-20">
      <div className="p-5 space-y-7">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 bg-[#9E003F] rounded-xl flex items-center justify-center shadow-sm">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#9E003F] tracking-tight leading-none">
              TransitOps
            </h2>
            <span className="text-[9px] font-bold text-[#8A7578] uppercase tracking-wider block mt-1">
              Operational Core
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {mounted ? (
            navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition ${
                    isActive 
                      ? 'bg-[#FADEE4] text-[#9E003F] font-bold border-l-4 border-[#9E003F]' 
                      : 'text-[#5E4D50] hover:bg-[#FCE7EA] hover:text-[#2B2325] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-[#9E003F]' : 'text-[#8A7578]'}`} />
                    <span>{item.label}</span>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="space-y-2 px-3 py-2 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 bg-[#FADEE4]/40 rounded-xl" />
              ))}
            </div>
          )}
        </nav>

        {mounted && userTag === 1 && (
          <button className="w-full bg-[#9E003F] hover:bg-[#800032] text-white font-bold text-sm py-3 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition mt-4">
            <Plus className="h-4 w-4" />
            <span>Quick Action</span>
          </button>
        )}
      </div>

      <div className="p-5 border-t border-[#EEDADF] space-y-1">
        {mounted && bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a 
              key={item.label}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                isActive 
                  ? 'bg-[#FADEE4] text-[#9E003F] font-bold border-l-4 border-[#9E003F]' 
                  : 'text-[#5E4D50] hover:bg-[#FCE7EA] font-semibold'
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? 'text-[#9E003F]' : 'text-[#8A7578]'}`} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
