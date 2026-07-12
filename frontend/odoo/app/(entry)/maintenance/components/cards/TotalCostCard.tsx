import React from "react";
import { DollarSign } from "lucide-react";

interface TotalCostCardProps {
  value: number;
}

export default function TotalCostCard({ value }: TotalCostCardProps) {
  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EEDADF] flex items-start gap-4 hover:shadow-md transition-all">
      <div className="p-3 bg-[#FEF3C7] text-[#B45309] rounded-2xl border border-[#FDE68A]/30">
        <DollarSign className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-1">
          Total Maintenance Cost
        </p>
        <h3 className="text-3xl font-black text-[#2B2325] leading-none">
          ${value.toLocaleString()}
        </h3>
        <div className="flex items-center gap-1 mt-2 font-bold text-[10px]">
          <span className="text-[#15803D]">-5%</span>
          <p className="text-[#8A7578]">MTD Expenditure</p>
        </div>
      </div>
    </div>
  );
}
