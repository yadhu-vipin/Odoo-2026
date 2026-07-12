import React from "react";
import { CheckCircle2 } from "lucide-react";

interface CompletedMaintenanceCardProps {
  value: number;
}

export default function CompletedMaintenanceCard({ value }: CompletedMaintenanceCardProps) {
  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EEDADF] flex items-start gap-4 hover:shadow-md transition-all">
      <div className="p-3 bg-[#E4F5EB] text-[#15803D] rounded-2xl border border-[#A7F3D0]/30">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-1">
          Completed This Month
        </p>
        <h3 className="text-3xl font-black text-[#2B2325] leading-none">{value}</h3>
        <div className="flex items-center gap-1 mt-2 font-bold text-[10px]">
          <span className="text-[#15803D]">+12%</span>
          <p className="text-[#8A7578]">On schedule</p>
        </div>
      </div>
    </div>
  );
}
