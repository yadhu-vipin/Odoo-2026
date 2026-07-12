import React from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

interface MaintenanceToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
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

export default function MaintenanceToolbar({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  type,
  onTypeChange,
  startDate,
  endDate,
  onClearDateRange,
}: MaintenanceToolbarProps) {
  return (
    <div className="bg-[#FFF1F3]/20 p-5 rounded-2xl mb-gutter flex flex-col lg:flex-row gap-4 items-center border border-[#EEDADF]">
      <SearchBar value={searchTerm} onChange={onSearchChange} />
      <FilterBar
        status={status}
        onStatusChange={onStatusChange}
        priority={priority}
        onPriorityChange={onPriorityChange}
        type={type}
        onTypeChange={onTypeChange}
        startDate={startDate}
        endDate={endDate}
        onClearDateRange={onClearDateRange}
      />
    </div>
  );
}
