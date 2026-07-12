"use client";

import React from "react";
import { usePathname } from "next/navigation";
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
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Vehicles", icon: Truck, href: "/vehicles" },
  { label: "Drivers", icon: Users, href: "/drivers" },
  { label: "Trips", icon: Route, href: "/trips" },
  { label: "Maintenance", icon: Wrench, href: "/maintenance" },
  { label: "Expenses", icon: CreditCard, href: "/expenses" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
];

export default function Sidebar() {
  const pathname = usePathname();

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
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition ${
                  isActive
                    ? "bg-[#FADEE4] text-[#9E003F] font-bold border-l-4 border-[#9E003F]"
                    : "text-[#5E4D50] hover:bg-[#FCE7EA] hover:text-[#2B2325]"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-[#9E003F]" : "text-[#8A7578]"}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <button className="w-full bg-[#9E003F] hover:bg-[#800032] text-white font-bold text-sm py-3 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition mt-4">
          <Plus className="h-4 w-4" />
          <span>Quick Action</span>
        </button>
      </div>

      <div className="p-5 border-t border-[#EEDADF] space-y-1">
        <a
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5E4D50] hover:bg-[#FCE7EA] font-semibold text-sm transition"
        >
          <HelpCircle className="h-4 w-4 text-[#8A7578]" />
          <span>Help</span>
        </a>
        <a
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5E4D50] hover:bg-[#FCE7EA] font-semibold text-sm transition"
        >
          <Settings className="h-4 w-4 text-[#8A7578]" />
          <span>Settings</span>
        </a>

        {pathname === "/trips" && (
          <div className="px-3 py-4 mt-3 bg-[#ffe9ea] rounded-2xl flex items-center gap-3 border border-[#e4bdc2]/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFUADwZbpXVme6MnkBh44jv-KyIIr0O_ckqdA61ws4XilqZlveUwIPoeqnYWUv0yvO38f25hpuMEMG-9tWk49WOUeztylGOqVgAI3XWBPhMyuESW-vi49Zg6k_K5TLKRc8MLZzX3f30IEhMv4CpcrATT9HsMdrs_mkB287cs1mko_EeJWagqfE4XtvZAZv1ZyOVs6ypn6KBH4bD7hoxLJJZD5hYsK4bzLLMWCCHo9mfew_MNIyKEDn2zfl96QRH3QGBCqa3aZhcfnr"
              alt="Alex Rivera"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate text-[#28171a]">Alex Rivera</p>
              <p className="text-[10px] text-[#5b3f43] uppercase">Dispatcher</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
