import React from "react";
import { AlertTriangle } from "lucide-react";
import { Maintenance } from "../../types/maintenance";

interface DeleteMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  maintenance?: Maintenance;
}

export default function DeleteMaintenanceDialog({
  isOpen,
  onClose,
  onConfirm,
  maintenance,
}: DeleteMaintenanceDialogProps) {
  if (!isOpen || !maintenance) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Box */}
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative z-10 border border-[#EEDADF] text-center">
        <div className="mx-auto w-12 h-12 bg-error/10 text-error rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-black text-[#2B2325]">Delete Work Order?</h3>
        <p className="text-xs text-[#8A7578] font-medium mt-2 leading-relaxed">
          Are you sure you want to permanently delete work order **{maintenance.id}** for **{maintenance.vehicleName}**? This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-[#EEDADF] rounded-xl text-xs font-bold text-[#5E4D50] hover:bg-[#FFF1F3]/40 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-error text-white hover:bg-error/90 rounded-xl text-xs font-black uppercase shadow-lg shadow-error/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}
