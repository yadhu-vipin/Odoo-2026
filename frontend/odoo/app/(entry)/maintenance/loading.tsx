"use client";

import React from "react";
import { CardSkeleton, TableSkeleton } from "../trips/components/common/LoadingState";

export default function MaintenanceLoading() {
  return (
    <div className="max-w-[1500px] w-full mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 py-sm mb-lg">
        <div className="space-y-2">
          <div className="h-7 w-52 bg-gray-200 rounded-lg" />
          <div className="h-3 w-80 bg-gray-200 rounded" />
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-surface-container-low p-gutter rounded-2xl h-16 border border-outline-variant" />

      {/* Table Skeleton */}
      <TableSkeleton rows={4} />
    </div>
  );
}
