import React from "react";

interface CostSummaryProps {
  estimatedCost: number;
  actualCost?: number;
}

export default function CostSummary({ estimatedCost, actualCost }: CostSummaryProps) {
  const actual = actualCost || 0;
  const difference = estimatedCost - actual;
  const isPositive = difference >= 0;

  return (
    <section className="mb-lg bg-[#FFF1F3]/20 p-5 rounded-2xl border border-[#EEDADF] shadow-sm">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-widest mb-4">
        Budget &amp; Cost Summary
      </h4>
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center font-bold text-[#8A7578]">
          <span>Estimated Budget:</span>
          <span className="font-black text-[#2B2325]">${estimatedCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-[#8A7578]">
          <span>Actual Cost spent:</span>
          <span className="font-black text-[#9E003F]">${actual.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-2.5 border-t border-[#EEDADF] font-bold">
          <span>Difference:</span>
          <span
            className={`font-black ${
              isPositive ? "text-[#15803D]" : "text-[#991B1B]"
            }`}
          >
            {isPositive ? "+" : ""}${difference.toLocaleString()} {isPositive ? "(Under Budget)" : "(Over Budget)"}
          </span>
        </div>
      </div>
    </section>
  );
}
