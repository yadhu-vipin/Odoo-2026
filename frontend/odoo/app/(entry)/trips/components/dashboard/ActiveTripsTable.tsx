import React from "react";
import Link from "next/link";
import { ArrowRight, UserPlus, FileDown, SlidersHorizontal, Eye } from "lucide-react";
import { Trip } from "../../types/trip";
import StatusBadge from "../common/StatusBadge";

interface ActiveTripsTableProps {
  trips: Trip[];
  onAssignClick?: (tripId: string) => void;
}

export default function ActiveTripsTable({ trips, onAssignClick }: ActiveTripsTableProps) {
  return (
    <div className="bg-white border border-[#EEDADF] rounded-3xl shadow-sm flex flex-col overflow-hidden">
      {/* Header Controls */}
      <div className="px-6 py-5 border-b border-[#EEDADF] flex items-center justify-between">
        <h4 className="text-md font-black text-[#2B2325]">Active & Planned Trips</h4>
        <div className="flex gap-2">
          <button className="p-2 border border-[#EEDADF] rounded-xl hover:bg-[#FCE7EA] text-[#5E4D50] transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button className="p-2 border border-[#EEDADF] rounded-xl hover:bg-[#FCE7EA] text-[#5E4D50] transition-colors">
            <FileDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#FFF1F3] text-[#5E4D50]">
            <tr>
              <th className="px-6 py-3 text-xs font-black uppercase tracking-wider">TRIP ID / STATUS</th>
              <th className="px-6 py-3 text-xs font-black uppercase tracking-wider">DRIVER & VEHICLE</th>
              <th className="px-6 py-3 text-xs font-black uppercase tracking-wider">ROUTE</th>
              <th className="px-6 py-3 text-xs font-black uppercase tracking-wider">CARGO</th>
              <th className="px-6 py-3 text-xs font-black uppercase tracking-wider">TIMELINE</th>
              <th className="px-6 py-3 w-[80px]" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEDADF]/30">
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="hover:bg-[#FFF1F3]/40 transition-colors group cursor-pointer"
              >
                {/* ID & Status */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="font-bold text-[#9E003F] hover:underline"
                    >
                      #{trip.id}
                    </Link>
                    <StatusBadge status={trip.status} className="mt-1" />
                  </div>
                </td>

                {/* Driver & Vehicle */}
                <td className="px-6 py-4">
                  {trip.driverName ? (
                    <div className="flex items-center gap-3">
                      {trip.driverAvatar ? (
                        <img
                          src={trip.driverAvatar}
                          alt={trip.driverName}
                          className="w-8 h-8 rounded-full object-cover border border-[#EEDADF]"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#FFE9EA] text-[#9E003F] font-bold text-[10px] flex items-center justify-center border border-[#EEDADF]">
                          {trip.driverName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-[#2B2325]">
                          {trip.driverName}
                        </span>
                        <span className="text-[10px] text-[#8A7578] font-bold">
                          {trip.vehicle || "Unspecified truck"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-dashed border-[#EEDADF] flex items-center justify-center">
                        <UserPlus className="h-3.5 w-3.5 text-[#8A7578]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#8A7578] italic font-semibold">
                          Unassigned
                        </span>
                        <span className="text-[10px] text-[#8A7578]">—</span>
                      </div>
                    </div>
                  )}
                </td>

                {/* Route */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#2B2325]">{trip.source}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#8A7578]" />
                    <span className="text-xs font-semibold text-[#2B2325]">
                      {trip.destination}
                    </span>
                  </div>
                </td>

                {/* Cargo */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#2B2325]">
                      {trip.cargoWeight}
                    </span>
                    <span className="text-[10px] text-[#8A7578] font-bold">
                      {trip.cargoType}
                    </span>
                  </div>
                </td>

                {/* Timeline & Progress */}
                <td className="px-6 py-4">
                  {trip.status === "DISPATCHED" && trip.progress !== undefined ? (
                    <div className="space-y-1 max-w-[120px]">
                      <div className="w-full bg-[#EEDADF]/50 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#9E003F] h-full transition-all"
                          style={{ width: `${trip.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#8A7578] font-bold block">
                        {trip.milesLeft || `${trip.progress}% en route`}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#8A7578] italic font-bold">
                      {trip.status === "DRAFT"
                        ? "Awaiting dispatch"
                        : trip.status === "COMPLETED"
                        ? "Delivered"
                        : "Cancelled"}
                    </span>
                  )}
                </td>

                {/* Action button */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {trip.status === "DRAFT" && onAssignClick ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssignClick(trip.id);
                        }}
                        className="bg-[#9E003F]/10 text-[#9E003F] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase hover:bg-[#9E003F] hover:text-white transition-all shadow-sm"
                      >
                        Assign
                      </button>
                    ) : (
                      <Link
                        href={`/trips/${trip.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-[#FCE7EA] rounded-xl text-[#8A7578] hover:text-[#9E003F] transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-xs font-semibold text-[#8A7578]">
                  No active or planned trips found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
