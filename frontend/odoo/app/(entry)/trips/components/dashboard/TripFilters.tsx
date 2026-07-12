import React from "react";
import { Search } from "lucide-react";

type TabFilter = "all" | "active" | "planned";

interface TripFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  tabFilter: TabFilter;
  onTabFilterChange: (value: TabFilter) => void;
}

export default function TripFilters({
  searchTerm,
  onSearchChange,
  tabFilter,
  onTabFilterChange,
}: TripFiltersProps) {
  return (
    <div className="bg-white border border-[#EEDADF] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8A7578]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search trips, drivers, locations..."
          className="w-full pl-9 pr-4 py-2 border border-[#EEDADF] rounded-xl text-xs font-bold text-[#2B2325] outline-none placeholder-[#8A7578] focus:border-[#9E003F] focus:ring-1 focus:ring-[#9E003F] transition-all bg-white"
        />
      </div>

      {/* Tab Triggers */}
      <div className="flex items-center gap-1.5 bg-[#FFF1F3] rounded-xl p-1 border border-[#EEDADF]/50 w-full md:w-auto overflow-x-auto">
        {([
          { key: "all", label: "All Trips" },
          { key: "active", label: "Active" },
          { key: "planned", label: "Planned" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabFilterChange(tab.key)}
            className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              tabFilter === tab.key
                ? "bg-white shadow-sm text-[#9E003F] border border-[#EEDADF]/30"
                : "text-[#5E4D50] hover:bg-[#FCE7EA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
