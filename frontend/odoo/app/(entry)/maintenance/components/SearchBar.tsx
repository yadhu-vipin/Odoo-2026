import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex-1 min-w-[280px] relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7578]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Vehicle, Model, or Maintenance ID..."
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#EEDADF] bg-white text-xs font-bold text-[#2B2325] placeholder-[#8A7578] outline-none focus:border-[#9E003F] transition-all"
      />
    </div>
  );
}
