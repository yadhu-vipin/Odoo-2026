import React from "react";
import { ExpenseType } from "../types";

interface ExpenseBadgeProps {
  type: ExpenseType;
  className?: string;
}

export default function ExpenseBadge({ type, className = "" }: ExpenseBadgeProps) {
  switch (type) {
    case "Toll":
      return (
        <span
          className={`px-3 py-1 bg-[#00677f]/10 text-[#00677f] rounded-full text-[11px] font-bold ${className}`}
        >
          Road Tolls
        </span>
      );
    case "Repair":
      return (
        <span
          className={`px-3 py-1 bg-[#9E003F]/10 text-[#9E003F] rounded-full text-[11px] font-bold ${className}`}
        >
          Repairs
        </span>
      );
    case "Maintenance":
      return (
        <span
          className={`px-3 py-1 bg-[#705d00]/10 text-[#705d00] rounded-full text-[11px] font-bold ${className}`}
        >
          Maintenance
        </span>
      );
    case "Parking":
      return (
        <span
          className={`px-3 py-1 bg-[#0369A1]/10 text-[#0369A1] rounded-full text-[11px] font-bold ${className}`}
        >
          Parking
        </span>
      );
    case "Insurance":
      return (
        <span
          className={`px-3 py-1 bg-[#15803D]/10 text-[#15803D] rounded-full text-[11px] font-bold ${className}`}
        >
          Insurance
        </span>
      );
    case "Washing":
      return (
        <span
          className={`px-3 py-1 bg-[#9E003F]/5 text-[#9E003F] border border-[#EEDADF]/50 rounded-full text-[11px] font-bold ${className}`}
        >
          Washing
        </span>
      );
    default:
      return (
        <span
          className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-[11px] font-bold ${className}`}
        >
          {type}
        </span>
      );
  }
}
