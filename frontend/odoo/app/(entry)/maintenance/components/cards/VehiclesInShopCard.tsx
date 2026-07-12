import React from "react";
import { Truck } from "lucide-react";

interface VehiclesInShopCardProps {
  value: number;
}

export default function VehiclesInShopCard({ value }: VehiclesInShopCardProps) {
  const impactPct = ((value / 150) * 100).toFixed(1);

  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#EEDADF] flex items-start gap-4 hover:shadow-md transition-all">
      <div className="p-3 bg-[#FEE2E2] text-[#991B1B] rounded-2xl border border-[#FCA5A5]/30">
        <Truck className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-1">
          Vehicles In Shop
        </p>
        <h3 className="text-3xl font-black text-[#2B2325] leading-none">{value}</h3>
        <div className="flex items-center gap-1 mt-2 font-bold text-[10px]">
          <span className="text-[#0369A1]">-1</span>
          <p className="text-[#8A7578]">Fleet impact: {impactPct}%</p>
        </div>
      </div>
    </div>
  );
}
