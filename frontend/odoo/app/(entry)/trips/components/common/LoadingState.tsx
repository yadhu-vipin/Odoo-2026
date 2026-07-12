import React from "react";

export function CardSkeleton() {
  return (
    <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />
      </div>
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-[#EEDADF]/50">
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-12 bg-gray-200 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-24 bg-gray-200 rounded" />
            <div className="h-2.5 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-16 bg-gray-200 rounded" />
          <div className="h-3.5 w-4 bg-gray-200 rounded" />
          <div className="h-3.5 w-16 bg-gray-200 rounded" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-3.5 w-16 bg-gray-200 rounded mb-1" />
        <div className="h-2.5 w-12 bg-gray-200 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-1.5 w-24 bg-gray-200 rounded mb-1" />
        <div className="h-2.5 w-16 bg-gray-200 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-8 w-12 bg-gray-200 rounded-lg ml-auto" />
      </td>
    </tr>
  );
}

export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="bg-white border border-[#EEDADF] rounded-2xl shadow-sm flex flex-col overflow-hidden">
      <div className="px-6 py-5 border-b border-[#EEDADF] flex items-center justify-between">
        <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#FFF1F3] text-[#5E4D50]">
          <tr>
            <th className="px-6 py-3 text-xs font-bold w-1/6">TRIP ID / STATUS</th>
            <th className="px-6 py-3 text-xs font-bold w-1/4">DRIVER & VEHICLE</th>
            <th className="px-6 py-3 text-xs font-bold w-1/4">ROUTE</th>
            <th className="px-6 py-3 text-xs font-bold w-1/8">CARGO</th>
            <th className="px-6 py-3 text-xs font-bold w-1/8">TIMELINE</th>
            <th className="px-6 py-3 w-10" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <TableRowSkeleton key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="bg-white border border-[#EEDADF] p-6 rounded-3xl shadow-sm animate-pulse space-y-4">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-24 bg-gray-200 rounded" />
                <div className="h-2.5 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-3 w-3 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-6 max-w-[1500px] mx-auto animate-pulse pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-64 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded-xl" />
          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      <div className="bg-white border border-[#EEDADF] p-6 rounded-[32px] h-24" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#EEDADF] p-6 rounded-[32px] h-80" />
        <div className="space-y-4">
          <div className="bg-white border border-[#EEDADF] p-6 rounded-[32px] h-36" />
          <div className="bg-white border border-[#EEDADF] p-6 rounded-[32px] h-36" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
