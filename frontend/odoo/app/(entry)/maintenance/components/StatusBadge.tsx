import React from "react";
import { MaintenanceStatus } from "../types/maintenance";

interface StatusBadgeProps {
  status: MaintenanceStatus;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return (
        <span className={`flex items-center gap-1.5 text-[#B45309] font-black text-xs ${className}`}>
          <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
          Active
        </span>
      );
    case "COMPLETED":
      return (
        <span className={`flex items-center gap-1.5 text-[#15803D] font-black text-xs ${className}`}>
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span className={`flex items-center gap-1.5 text-[#991B1B] font-black text-xs ${className}`}>
          <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className={`flex items-center gap-1.5 text-[#8A7578] font-black text-xs ${className}`}>
          <span className="w-2 h-2 rounded-full bg-[#8A7578]" />
          {status}
        </span>
      );
  }
}
