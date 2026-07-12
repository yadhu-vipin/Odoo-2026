"use client";

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 w-full bg-white border-b border-[#EEDADF] px-8 flex items-center justify-between sticky top-0 z-10">
      
      {/* Dynamic Filter Search Field */}
      <div className="w-96 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7578]" />
        <input 
          type="text" 
          placeholder='Try searching "insights"'
          className="w-full bg-[#FDF8F8] border border-[#EEDADF] rounded-full pl-10 pr-4 py-2 text-xs font-medium text-[#2B2325] outline-none focus:border-[#9E003F] focus:bg-white transition"
        />
      </div>

      {/* Global Context Profile Actions */}
      <div className="flex items-center gap-4">
        <button className="bg-[#9E003F] hover:bg-[#800032] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition">
          Add New
        </button>
        
        <div className="h-6 w-px bg-[#EEDADF]"></div>

        {/* Operator Profile Selector */}
        <div className="flex items-center gap-2 bg-[#FDF8F8] border border-[#EEDADF] py-1 pl-1 pr-3 rounded-full shadow-sm cursor-pointer hover:bg-[#FCE7EA] transition">
          <div className="w-7 h-7 rounded-full bg-[#9E003F] text-white font-black text-xs flex items-center justify-center overflow-hidden">
            AD
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-[#5E4D50]" />
        </div>

        {/* Real-time Alert Notification Center Anchor */}
        <button className="h-9 w-9 border border-[#EEDADF] bg-white rounded-full flex items-center justify-center hover:bg-[#FDF8F8] transition text-[#2B2325] relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#9E003F] rounded-full"></span>
        </button>
      </div>

    </header>
  );
}