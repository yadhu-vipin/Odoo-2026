import React from "react";
import { Maintenance } from "../../types/maintenance";
import { MAINTENANCE_TYPES } from "../../constants/maintenance";

interface MaintenanceDetailsProps {
  maintenance: Maintenance;
}

export default function MaintenanceDetails({ maintenance }: MaintenanceDetailsProps) {
  const typeLabel =
    MAINTENANCE_TYPES.find((t) => t.value === maintenance.type)?.label ||
    maintenance.type;

  const isCompleted = maintenance.status === "COMPLETED";

  return (
    <section className="mb-lg space-y-4">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-widest mb-2 border-b border-[#EEDADF] pb-2">
        Work Order Details
      </h4>

      {/* Description */}
      <div>
        <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider mb-1">
          Description
        </p>
        <p className="text-xs bg-[#FFF1F3]/20 p-3.5 rounded-xl italic text-[#2B2325] leading-relaxed border border-[#EEDADF]/60">
          "{maintenance.description}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        {/* Technician */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Technician
          </p>
          <div className="flex items-center gap-2 mt-1">
            {maintenance.technicianAvatar ? (
              <img
                className="w-6 h-6 rounded-full object-cover border border-[#EEDADF]"
                src={maintenance.technicianAvatar}
                alt={maintenance.technician}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#FFF1F3] text-[#9E003F] font-black text-[9px] flex items-center justify-center border border-[#EEDADF]">
                {maintenance.technician
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <span className="font-bold text-[#2B2325]">{maintenance.technician}</span>
          </div>
        </div>

        {/* Priority */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Priority
          </p>
          <span className="text-[#9E003F] font-black block mt-1 uppercase">
            {maintenance.priority}
          </span>
        </div>

        {/* Start Date */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Start Date
          </p>
          <p className="font-bold text-[#2B2325] mt-1">{maintenance.startDate}</p>
        </div>

        {/* Expected Completion */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Expected Completion
          </p>
          <p className="font-bold text-[#2B2325] mt-1">
            {maintenance.expectedCompletionDate}
          </p>
        </div>

        {/* Type */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Job Type
          </p>
          <p className="font-bold text-[#2B2325] mt-1">{typeLabel}</p>
        </div>

        {/* Status */}
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">
            Work Status
          </p>
          <p
            className={`font-black mt-1 uppercase ${
              isCompleted ? "text-[#15803D]" : "text-[#B45309]"
            }`}
          >
            {maintenance.status}
          </p>
        </div>
      </div>
    </section>
  );
}
