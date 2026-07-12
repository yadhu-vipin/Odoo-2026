"use client";

import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CardSkeleton, TableSkeleton } from "../trips/components/common/LoadingState";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ExpensesLoading() {
  return (
    <div className={`${plusJakartaSans.className} max-w-7xl mx-auto w-full space-y-8 pb-12 animate-pulse`}>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between py-sm">
        <div className="space-y-2">
          <div className="h-7 w-60 bg-gray-200 rounded-lg" />
          <div className="h-3.5 w-96 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Tables Skeleton */}
      <TableSkeleton rows={3} />
      <TableSkeleton rows={3} />

      {/* Summary Widget Skeleton */}
      <div className="bg-white p-8 rounded-3xl border border-[#EEDADF]/40 h-44" />
    </div>
  );
}
