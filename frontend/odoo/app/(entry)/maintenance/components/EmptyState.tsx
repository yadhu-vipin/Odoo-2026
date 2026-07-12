import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

export default function EmptyState({
  message = "No maintenance records match your filters.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#EEDADF] rounded-3xl text-center space-y-4 shadow-sm">
      <div className="p-3 bg-[#FFF1F3] rounded-full text-[#8A7578]">
        <AlertCircle className="h-6 w-6 stroke-[1.5]" />
      </div>
      <div>
        <p className="text-xs font-black text-[#2B2325]">{message}</p>
        <p className="text-[10px] text-[#8A7578] font-bold mt-1">
          Try resetting the search terms or adjustments.
        </p>
      </div>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 border border-[#EEDADF] bg-white hover:bg-[#FFF1F3]/40 rounded-xl text-[10px] font-black text-[#2B2325] transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
