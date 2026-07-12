import React from "react";
import { Info } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

export default function EmptyState({
  message = "No matching records found.",
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-[#EEDADF]/20 rounded-xl text-center space-y-3">
      <div className="p-2.5 bg-[#FFF1F3] rounded-full text-[#8A7578]">
        <Info className="h-5 w-5 stroke-[1.5]" />
      </div>
      <div>
        <p className="text-xs font-black text-[#2B2325]">{message}</p>
        <p className="text-[10px] text-[#8A7578] font-bold mt-1">
          Reset filters or check search spelling.
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-1.5 border border-[#EEDADF] bg-white hover:bg-[#FFF1F3]/40 rounded-xl text-[10px] font-black text-[#2B2325] transition-colors cursor-pointer"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
