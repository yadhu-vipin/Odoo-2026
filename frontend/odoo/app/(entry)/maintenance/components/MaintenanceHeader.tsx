import React from "react";
import { Plus } from "lucide-react";

interface MaintenanceHeaderProps {
  onCreateClick: () => void;
}

export default function MaintenanceHeader({ onCreateClick }: MaintenanceHeaderProps) {
  return (
    <header className="w-full sticky top-0 z-45 bg-[#FDF8F8]/80 backdrop-blur-md py-sm mb-lg border-b border-[#EEDADF] flex justify-between items-center rounded-2xl">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#2B2325] tracking-tight">Maintenance Management</h2>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">
            Real-time shop schedules, vehicle repairs, and expenditures log
          </p>
        </div>
        <div className="h-8 w-px bg-[#EEDADF] mx-2" />
        <button
          onClick={onCreateClick}
          className="bg-[#9E003F] hover:bg-[#800032] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Maintenance</span>
        </button>
      </div>
    </header>
  );
}
