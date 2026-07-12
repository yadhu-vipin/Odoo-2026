import React, { useState } from "react";
import { Eye, Edit2, Trash2, CheckCircle2, MoreVertical } from "lucide-react";
import { Maintenance } from "../types/maintenance";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { MAINTENANCE_TYPES } from "../constants/maintenance";

interface MaintenanceRowProps {
  maintenance: Maintenance;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MaintenanceRow({
  maintenance,
  onView,
  onEdit,
  onClose,
  onDelete,
}: MaintenanceRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const typeLabel =
    MAINTENANCE_TYPES.find((t) => t.value === maintenance.type)?.label ||
    maintenance.type;

  return (
    <tr
      onClick={() => onView(maintenance.id)}
      className="hover:bg-[#FFF1F3]/25 transition-colors cursor-pointer group bg-white border-b border-[#EEDADF]/60"
    >
      {/* ID */}
      <td className="px-6 py-4 text-xs font-black text-[#9E003F]">
        {maintenance.id}
      </td>

      {/* Vehicle Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0F2FE]/60 flex items-center justify-center text-[#0369A1]">
            <span className="material-symbols-outlined text-sm font-semibold">local_shipping</span>
          </div>
          <span className="text-xs font-bold text-[#2B2325]">
            {maintenance.vehicleName}
          </span>
        </div>
      </td>

      {/* Registration */}
      <td className="px-6 py-4 text-xs font-mono font-black text-[#8A7578]">
        {maintenance.registration}
      </td>

      {/* Type */}
      <td className="px-6 py-4 text-xs font-semibold text-[#5E4D50]">
        {typeLabel}
      </td>

      {/* Priority */}
      <td className="px-6 py-4">
        <PriorityBadge priority={maintenance.priority} />
      </td>

      {/* Est. Cost */}
      <td className="px-6 py-4 text-xs font-black text-[#2B2325]">
        ${maintenance.estimatedCost.toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={maintenance.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end items-center gap-1.5 relative">
          {/* Quick View Button */}
          <button
            onClick={() => onView(maintenance.id)}
            title="View Details"
            className="p-1.5 hover:bg-[#FFF1F3] rounded-lg transition-colors text-[#8A7578] hover:text-[#9E003F]"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Quick Edit Button */}
          <button
            onClick={() => onEdit(maintenance.id)}
            title="Edit Work Order"
            className="p-1.5 hover:bg-[#FFF1F3] rounded-lg transition-colors text-[#8A7578] hover:text-[#9E003F]"
          >
            <Edit2 className="h-4 w-4" />
          </button>

          {/* More Actions Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-1.5 hover:bg-[#FFF1F3] rounded-lg transition-colors text-[#8A7578] hover:text-[#9E003F]"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {showMenu && (
              <>
                {/* Overlay backdrop to dismiss dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                
                {/* Popover */}
                <div className="absolute right-0 mt-1 w-32 bg-white border border-[#EEDADF] rounded-xl shadow-xl z-20 py-1.5 text-left text-[11px] font-black text-[#5E4D50] flex flex-col">
                  {maintenance.status === "ACTIVE" && (
                    <button
                      onClick={() => {
                        onClose(maintenance.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 hover:bg-[#FFF1F3]/50 transition-colors flex items-center gap-1.5 text-[#0369A1]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Close Order
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDelete(maintenance.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-[#FFF1F3]/50 hover:text-error transition-colors flex items-center gap-1.5 text-error"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
