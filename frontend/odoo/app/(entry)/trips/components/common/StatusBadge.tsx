import React from "react";
import { TripStatus } from "../../types/trip";

interface StatusBadgeProps {
  status: TripStatus;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "DISPATCHED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#00677f]/10 text-[#00677f] border border-[#00677f]/20 w-fit ${className}`}
        >
          <span className="w-1.5 h-1.5 bg-[#00677f] rounded-full animate-pulse" />
          Dispatched
        </span>
      );
    case "DRAFT":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#FFE9EA] text-[#9E003F] border border-[#EEDADF] w-fit ${className}`}
        >
          <span className="w-1.5 h-1.5 bg-[#9E003F] rounded-full" />
          Draft
        </span>
      );
    case "COMPLETED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#E4F5EB] text-[#15803D] border border-[#E4F5EB] w-fit ${className}`}
        >
          <span className="w-1.5 h-1.5 bg-[#15803D] rounded-full" />
          Completed
        </span>
      );
    case "CANCELLED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#FFDAD6] text-[#BA1A1A] border border-[#FFDAD6] w-fit ${className}`}
        >
          <span className="w-1.5 h-1.5 bg-[#BA1A1A] rounded-full" />
          Cancelled
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-gray-100 text-gray-800 border border-gray-200 w-fit ${className}`}
        >
          {status}
        </span>
      );
  }
}
