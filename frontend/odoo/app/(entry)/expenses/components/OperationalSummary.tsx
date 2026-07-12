import React from "react";
import { OperationalCostSummary } from "../types";
import { costCalculations } from "../utils";

interface OperationalSummaryProps {
  summary: OperationalCostSummary;
}

export default function OperationalSummary({ summary }: OperationalSummaryProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EEDADF]/60">
      <h4 className="text-[10px] font-black text-[#8A7578] tracking-wide mb-6 uppercase">
        Operational Cost Summary
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fuel Cost card */}
        <div className="space-y-1.5 self-center">
          <p className="text-xs text-[#8A7578] font-bold">Total Fuel Cost</p>
          <p className="text-2xl font-black text-[#2B2325]">
            {costCalculations.formatCurrency(summary.totalFuelCost)}
          </p>
        </div>

        {/* Other Expenses card */}
        <div className="space-y-1.5 self-center">
          <p className="text-xs text-[#8A7578] font-bold">Total Other Expenses</p>
          <p className="text-2xl font-black text-[#2B2325]">
            {costCalculations.formatCurrency(summary.totalOtherExpenses)}
          </p>
        </div>

        {/* Aggregate card */}
        <div className="bg-[#9E003F] p-6 rounded-2xl text-white flex flex-col justify-center shadow-lg shadow-[#9E003F]/20 relative overflow-hidden group">
          {/* Subtle design element */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
          
          <p className="text-[10px] text-white/80 uppercase tracking-widest font-black mb-1.5">
            Total Operational Cost
          </p>
          <p className="text-3xl font-black leading-none">
            {costCalculations.formatCurrency(summary.totalOperationalCost)}
          </p>
        </div>
      </div>
    </div>
  );
}
