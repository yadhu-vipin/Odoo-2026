import React from "react";
import { MaintenancePriority } from "../types/maintenance";

interface PriorityBadgeProps {
  priority: MaintenancePriority;
  className?: string;
}

export default function PriorityBadge({ priority, className = "" }: PriorityBadgeProps) {
  switch (priority) {
    case "LOW":
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#E0F2FE] text-[#0369A1] border border-[#B3E0FF] ${className}`}
        >
          Low
        </span>
      );
    case "MEDIUM":
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] ${className}`}
        >
          Medium
        </span>
      );
    case "HIGH":
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FFF1F3] text-[#9E003F] border border-[#FBCFE8] ${className}`}
        >
          High
        </span>
      );
    case "CRITICAL":
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] ${className}`}
        >
          Critical
        </span>
      );
    default:
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-800 border border-gray-200 ${className}`}
        >
          {priority}
        </span>
      );
  }
}
