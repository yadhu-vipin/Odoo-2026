import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search logs...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7578] h-4 w-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#fff0f1] border-none rounded-lg py-1.5 pl-9 pr-3 text-xs font-bold text-[#2B2325] placeholder-[#8A7578] outline-none focus:ring-1 focus:ring-[#9E003F]/20 w-48"
      />
    </div>
  );
}
