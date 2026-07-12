import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Maintenance } from "../../types/maintenance";
import { maintenanceValidation, MaintenanceValidationErrors } from "../../utils/maintenanceValidation";

interface CloseMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (actualCost: number, remarks: string) => void;
  maintenance?: Maintenance;
}

export default function CloseMaintenanceDialog({
  isOpen,
  onClose,
  onSubmit,
  maintenance,
}: CloseMaintenanceDialogProps) {
  const [actualCost, setActualCost] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<MaintenanceValidationErrors>({});

  useEffect(() => {
    if (maintenance) {
      setActualCost(maintenance.estimatedCost);
      setRemarks("");
      setErrors({});
    }
  }, [maintenance]);

  if (!isOpen || !maintenance) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: valErrors } = maintenanceValidation.validateCloseForm({
      actualCost,
      remarks,
    });

    if (!isValid) {
      setErrors(valErrors);
      return;
    }

    onSubmit(actualCost, remarks);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Box */}
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col border border-[#EEDADF]">
        {/* Header */}
        <div className="p-6 border-b border-[#EEDADF] flex justify-between items-center bg-[#FFF1F3]/40">
          <div>
            <h3 className="text-sm font-black text-[#2B2325]">Close Work Order: {maintenance.id}</h3>
            <p className="text-[10px] text-[#8A7578] font-semibold mt-1">
              Confirm cost parameters to release {maintenance.vehicleName} back to service.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#FFF1F3] rounded-full transition-colors text-[#8A7578] cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          {/* Final Cost */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
              Final Cost ($)
            </label>
            <input
              type="number"
              value={actualCost || ""}
              onChange={(e) => {
                setActualCost(Number(e.target.value) || 0);
                if (errors.actualCost) setErrors((prev) => ({ ...prev, actualCost: undefined }));
              }}
              placeholder="4200"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                errors.actualCost ? "border-error" : "border-[#EEDADF]"
              }`}
            />
            {errors.actualCost && (
              <p className="text-[10px] text-error font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.actualCost}
              </p>
            )}
            <p className="text-[9px] text-[#8A7578] font-bold">
              Estimated cost was: ${maintenance.estimatedCost.toLocaleString()}
            </p>
          </div>

          {/* Closure Remarks */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
              Completion Remarks / Resolution Notes
            </label>
            <textarea
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
                if (errors.remarks) setErrors((prev) => ({ ...prev, remarks: undefined }));
              }}
              rows={3}
              placeholder="E.g. Cylinder 4 replaced, test run completed successfully."
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium bg-white outline-none focus:border-[#9E003F] ${
                errors.remarks ? "border-error" : "border-[#EEDADF]"
              }`}
            />
            {errors.remarks && (
              <p className="text-[10px] text-error font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.remarks}
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EEDADF] flex justify-end gap-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-[#8A7578] hover:bg-[#FFF1F3]/40 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#9E003F] hover:bg-[#800032] text-white rounded-xl text-xs font-bold uppercase shadow-lg shadow-[#9E003F]/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Complete Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
