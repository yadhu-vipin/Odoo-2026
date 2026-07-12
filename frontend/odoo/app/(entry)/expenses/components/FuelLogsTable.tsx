import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { FuelLog } from "../types";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";
import { costCalculations } from "../utils";

interface FuelLogsTableProps {
  fuelLogs: FuelLog[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onView: (log: FuelLog) => void;
  onEdit: (log: FuelLog) => void;
  onDelete: (id: string) => void;
}

export default function FuelLogsTable({
  fuelLogs,
  searchTerm,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
}: FuelLogsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EEDADF]/20 overflow-hidden">
      {/* Header section with search */}
      <div className="px-6 py-4 border-b border-[#EEDADF]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="text-[10px] font-black text-[#2B2325] tracking-wide uppercase">
          Fuel Logs
        </h4>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search fuel logs..."
        />
      </div>

      {fuelLogs.length === 0 ? (
        <div className="p-6">
          <EmptyState
            message="No matching fuel logs found."
            onReset={() => onSearchChange("")}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FFF1F3]/40 text-[#5E4D50] text-[10px] font-black uppercase border-b border-[#EEDADF]/60">
              <tr>
                <th className="px-6 py-3.5">Vehicle</th>
                <th className="px-6 py-3.5">Trip ID</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Liters</th>
                <th className="px-6 py-3.5 text-right">Fuel Cost</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEDADF]/10">
              {fuelLogs.map((log) => {
                // Formatting Date
                const formattedDate = new Date(log.fuelDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr
                    key={log.id}
                    className="hover:bg-[#FFF1F3]/20 transition-colors text-xs font-semibold text-[#2B2325]"
                  >
                    {/* Vehicle */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 bg-[#fff0f1] rounded text-[10px] font-black text-[#5E4D50]">
                          {log.registration}
                        </div>
                        <span className="font-bold">{log.vehicleName}</span>
                      </div>
                    </td>

                    {/* Trip ID */}
                    <td className="px-6 py-4 text-xs font-mono font-black text-[#9E003F]">
                      {log.tripId || "—"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-[#5E4D50] font-semibold">
                      {formattedDate}
                    </td>

                    {/* Liters */}
                    <td className="px-6 py-4 text-right font-mono font-black">
                      {log.liters} L
                    </td>

                    {/* Cost */}
                    <td className="px-6 py-4 text-right font-black">
                      {costCalculations.formatCurrency(log.totalCost)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button
                          onClick={() => onView(log)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
                          title="View Log Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEdit(log)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-[#0369A1] transition-colors cursor-pointer"
                          title="Edit Log"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(log.id)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-error transition-colors cursor-pointer"
                          title="Delete Log"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
