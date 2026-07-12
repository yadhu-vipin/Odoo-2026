import React from "react";
import { Calendar } from "lucide-react";
import { STATUS_LIST, PRIORITY_LIST, MAINTENANCE_TYPES } from "../constants/maintenance";

interface FilterBarProps {
  status: string;
  onStatusChange: (val: string) => void;
  priority: string;
  onPriorityChange: (val: string) => void;
  type: string;
  onTypeChange: (val: string) => void;
  startDate: string | null;
  endDate: string | null;
  onClearDateRange: () => void;
}

export default function FilterBar({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  type,
  onTypeChange,
  startDate,
  endDate,
  onClearDateRange,
}: FilterBarProps) {
  const isDateActive = !!(startDate || endDate);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 rounded-xl border border-[#EEDADF] bg-white text-xs font-bold text-[#5E4D50] cursor-pointer outline-none focus:border-[#9E003F]"
      >
        <option value="ALL">Status: All</option>
        {STATUS_LIST.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Priority filter */}
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="px-4 py-2 rounded-xl border border-[#EEDADF] bg-white text-xs font-bold text-[#5E4D50] cursor-pointer outline-none focus:border-[#9E003F]"
      >
        <option value="ALL">Priority: All</option>
        {PRIORITY_LIST.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Type filter */}
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-4 py-2 rounded-xl border border-[#EEDADF] bg-white text-xs font-bold text-[#5E4D50] cursor-pointer outline-none focus:border-[#9E003F]"
      >
        <option value="ALL">Type: All</option>
        {MAINTENANCE_TYPES.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Date button display */}
      <button
        type="button"
        onClick={() => {
          if (isDateActive) {
            onClearDateRange();
          }
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors text-xs font-bold ${
          isDateActive
            ? "text-[#9E003F] border-[#9E003F] bg-[#FFF1F3]"
            : "text-[#5E4D50] border-[#EEDADF] bg-white hover:bg-[#FDF8F8]"
        }`}
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>
          {startDate && endDate
            ? `${startDate} - ${endDate}`
            : startDate
            ? `From: ${startDate}`
            : "Oct 01 - Oct 31 (All)"}
        </span>
      </button>
    </div>
  );
}
