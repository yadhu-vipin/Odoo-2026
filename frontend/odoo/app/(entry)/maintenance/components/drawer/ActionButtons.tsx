import React from "react";
import { Edit2, CheckCircle2 } from "lucide-react";
import { MaintenanceStatus } from "../../types/maintenance";

interface ActionButtonsProps {
  status: MaintenanceStatus;
  onEdit: () => void;
  onClose: () => void;
}

export default function ActionButtons({ status, onEdit, onClose }: ActionButtonsProps) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={onEdit}
        className="flex-1 py-3 border border-[#EEDADF] bg-white hover:bg-[#FFF1F3]/40 text-[#2B2325] rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Edit2 className="h-3.5 w-3.5" />
        Edit Details
      </button>

      {status === "ACTIVE" && (
        <button
          onClick={onClose}
          className="flex-[1.2] py-3 bg-[#9E003F] hover:bg-[#800032] text-white rounded-xl text-xs font-black uppercase transition shadow-md shadow-[#9E003F]/20 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Close Order
        </button>
      )}
    </div>
  );
}
