"use client";

import React from 'react';
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

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#FFF1F3] border-r border-[#EEDADF] flex flex-col justify-between fixed h-screen left-0 top-0 z-20">
      <div className="p-5 space-y-7">
        
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 bg-[#9E003F] rounded-xl flex items-center justify-center shadow-sm">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#9E003F] tracking-tight leading-none">TransitOps</h2>
            <span className="text-[9px] font-bold text-[#8A7578] uppercase tracking-wider block mt-1">Operational Core</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <a href="/dashboard" className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FADEE4] text-[#9E003F] font-bold text-sm border-l-4 border-[#9E003F] transition">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </a>

          {[
            { label: 'Vehicles', icon: Truck, href: '/vehicles' },
            { label: 'Drivers', icon: Users, href: '/drivers' },
            { label: 'Trips', icon: Route, href: '/trips' },
            { label: 'Maintenance', icon: Wrench, href: '/maintenance' },
            { label: 'Expenses', icon: CreditCard, href: '/expenses' },
            { label: 'Reports', icon: BarChart3, href: '/reports' },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5E4D50] hover:bg-[#FCE7EA] hover:text-[#2B2325] font-semibold text-sm transition"
            >
              <item.icon className="h-4 w-4 text-[#8A7578]" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Primary Action Button */}
        <button className="w-full bg-[#9E003F] hover:bg-[#800032] text-white font-bold text-sm py-3 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition mt-4">
          <Plus className="h-4 w-4" />
          <span>Quick Action</span>
        </button>
      </div>

      {/* Bottom Settings Navigation */}
      <div className="p-5 border-t border-[#EEDADF] space-y-1">
        <a href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5E4D50] hover:bg-[#FCE7EA] font-semibold text-sm transition">
          <HelpCircle className="h-4 w-4 text-[#8A7578]" />
          <span>Help</span>
        </a>
        <a href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5E4D50] hover:bg-[#FCE7EA] font-semibold text-sm transition">
          <Settings className="h-4 w-4 text-[#8A7578]" />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
}