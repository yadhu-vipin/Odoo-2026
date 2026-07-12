import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Maintenance } from "../../types/maintenance";
import VehicleInfo from "./VehicleInfo";
import MaintenanceDetails from "./MaintenanceDetails";
import Timeline from "./Timeline";
import CostSummary from "./CostSummary";
import ActionButtons from "./ActionButtons";

interface MaintenanceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  maintenance?: Maintenance;
  onEdit: (id: string) => void;
  onCloseMaintenance: (id: string) => void;
}

export default function MaintenanceDrawer({
  isOpen,
  onClose,
  maintenance,
  onEdit,
  onCloseMaintenance,
}: MaintenanceDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !maintenance) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel content */}
      <aside className="w-[460px] bg-white h-screen shadow-2xl flex flex-col relative z-10 border-l border-[#EEDADF] transform translate-x-0 transition-transform duration-300 ease-in-out">
        {/* Drawer Header */}
        <div className="p-6 bg-[#FFF1F3]/40 border-b border-[#EEDADF] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9E003F] rounded-xl flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
            </div>
            <div>
              <h3 className="text-xs font-black text-[#9E003F] leading-none">
                Work Order Details
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-[#8A7578] font-bold mt-1.5">
                {maintenance.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF1F3] rounded-full text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white">
          {/* Vehicle Info */}
          <VehicleInfo
            vehicleName={maintenance.vehicleName}
            registration={maintenance.registration}
            vehicleClass={maintenance.class}
            odometer="142,502 mi" // default representation
          />

          {/* Details */}
          <MaintenanceDetails maintenance={maintenance} />

          {/* Cost Summary */}
          <CostSummary
            estimatedCost={maintenance.estimatedCost}
            actualCost={maintenance.actualCost}
          />

          {/* Timeline */}
          <Timeline timeline={maintenance.timeline} />
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#EEDADF] bg-[#FFF1F3]/25">
          <ActionButtons
            status={maintenance.status}
            onEdit={() => onEdit(maintenance.id)}
            onClose={() => onCloseMaintenance(maintenance.id)}
          />
        </div>
      </aside>
    </div>
  );
}
