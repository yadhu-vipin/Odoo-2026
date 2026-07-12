import React from "react";
import { Route, Clock, Users, ShieldAlert } from "lucide-react";

interface KPISectionProps {
  activeCount: number;
  driversReadyCount: number;
  avgDispatchTime?: string;
  cargoCapacity?: string;
}

export default function KPISection({
  activeCount,
  driversReadyCount,
  avgDispatchTime = "12.4m",
  cargoCapacity = "92%",
}: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Trips Card */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start justify-between hover:translate-y-[-2px] transition-transform duration-200">
        <div>
          <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-2">Active Trips</p>
          <h3 className="text-3xl font-black text-[#2B2325]">{activeCount}</h3>
          <p className="text-[11px] text-[#9E003F] mt-1.5 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#9E003F] rounded-full animate-ping" />
            +8% from yesterday
          </p>
        </div>
        <div className="bg-[#FFF1F3] p-2.5 rounded-xl border border-[#EEDADF]/50">
          <Route className="h-5 w-5 text-[#9E003F]" />
        </div>
      </div>

      {/* Avg. Dispatch Time Card */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start justify-between hover:translate-y-[-2px] transition-transform duration-200">
        <div>
          <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-2">Avg. Dispatch Time</p>
          <h3 className="text-3xl font-black text-[#2B2325]">{avgDispatchTime}</h3>
          <p className="text-[11px] text-[#00677f] mt-1.5 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#00677f] rounded-full" />
            Optimized flow
          </p>
        </div>
        <div className="bg-[#00677f]/5 p-2.5 rounded-xl border border-[#00677f]/10">
          <Clock className="h-5 w-5 text-[#00677f]" />
        </div>
      </div>

      {/* Drivers Ready Card */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start justify-between hover:translate-y-[-2px] transition-transform duration-200">
        <div>
          <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-2">Drivers Ready</p>
          <h3 className="text-3xl font-black text-[#2B2325]">{driversReadyCount}</h3>
          <p className="text-[11px] text-[#5E4D50] mt-1.5 font-bold">Across 4 operational hubs</p>
        </div>
        <div className="bg-[#FEF3C7] p-2.5 rounded-xl border border-[#FEF3C7]">
          <Users className="h-5 w-5 text-[#D97706]" />
        </div>
      </div>

      {/* Cargo Capacity Card */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start justify-between hover:translate-y-[-2px] transition-transform duration-200">
        <div>
          <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-2">Cargo Capacity</p>
          <h3 className="text-3xl font-black text-[#2B2325]">{cargoCapacity}</h3>
          <p className="text-[11px] text-[#ba1a1a] mt-1.5 font-bold flex items-center gap-1">
            <ShieldAlert className="h-3 w-3 text-[#ba1a1a]" />
            High load alert
          </p>
        </div>
        <div className="bg-[#FFDAD6] p-2.5 rounded-xl border border-[#FFDAD6]">
          <ShieldAlert className="h-5 w-5 text-[#BA1A1A]" />
        </div>
      </div>
    </div>
  );
}
