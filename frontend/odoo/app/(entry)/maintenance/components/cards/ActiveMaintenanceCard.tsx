import React from "react";
import { Wrench } from "lucide-react";

interface ActiveMaintenanceCardProps {
  value: number;
}

export default function ActiveMaintenanceCard({ value }: ActiveMaintenanceCardProps) {
  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EEDADF] flex items-start gap-4 hover:shadow-md transition-all">
      <div className="p-3 bg-[#E0F2FE] text-[#0369A1] rounded-2xl border border-[#B3E0FF]/30">
        <Wrench className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-1">
          Active Maintenance
        </p>
        <h3 className="text-3xl font-black text-[#2B2325] leading-none">{value}</h3>
        <div className="flex items-center gap-1 mt-2 font-bold text-[10px]">
          <span className="text-[#B45309]">+2</span>
          <p className="text-[#8A7578]">Currently in repair</p>
        </div>
      </div>
    </div>
  );
}
