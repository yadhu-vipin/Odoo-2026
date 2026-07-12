import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { MNT_Vehicle } from "../../types/maintenance";
import { MAINTENANCE_TYPES, PRIORITY_LIST } from "../../constants/maintenance";
import { maintenanceValidation, MaintenanceValidationErrors } from "../../utils/maintenanceValidation";

interface CreateMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  vehicles: MNT_Vehicle[];
}

export default function CreateMaintenanceDialog({
  isOpen,
  onClose,
  onSubmit,
  vehicles,
}: CreateMaintenanceDialogProps) {
  const [vehicleId, setVehicleId] = useState("");
  const [type, setType] = useState("PREVENTIVE");
  const [priority, setPriority] = useState("LOW");
  const [description, setDescription] = useState("");
  const [technician, setTechnician] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [expectedCompletionDate, setExpectedCompletionDate] = useState("");

  const [errors, setErrors] = useState<MaintenanceValidationErrors>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: valErrors } = maintenanceValidation.validateCreateForm({
      vehicleId,
      type,
      priority,
      description,
      technician,
      estimatedCost,
      expectedCompletionDate,
    });

    if (!isValid) {
      setErrors(valErrors);
      return;
    }

    onSubmit({
      vehicleId,
      type,
      priority,
      description,
      technician,
      estimatedCost,
      expectedCompletionDate,
    });

    // Reset Form
    setVehicleId("");
    setType("PREVENTIVE");
    setPriority("LOW");
    setDescription("");
    setTechnician("");
    setEstimatedCost(0);
    setExpectedCompletionDate("");
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Box */}
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col border border-[#EEDADF]">
        {/* Header */}
        <div className="p-6 border-b border-[#EEDADF] flex justify-between items-center bg-[#FFF1F3]/40">
          <div>
            <h3 className="text-sm font-black text-[#2B2325]">New Maintenance Request</h3>
            <p className="text-[10px] text-[#8A7578] font-semibold mt-1">
              Select an available vehicle and fill in job details.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#FFF1F3] rounded-full transition-colors text-[#8A7578] cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh] custom-scrollbar bg-white">
          {/* Select Vehicle */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
              Select Vehicle
            </label>
            <select
              value={vehicleId}
              onChange={(e) => {
                setVehicleId(e.target.value);
                if (errors.vehicleId) setErrors((prev) => ({ ...prev, vehicleId: undefined }));
              }}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                errors.vehicleId ? "border-error" : "border-[#EEDADF]"
              }`}
            >
              <option value="">-- Choose a Vehicle --</option>
              {vehicles.map((v) => {
                const isDisabled = v.status !== "Available";
                return (
                  <option key={v.id} value={v.id} disabled={isDisabled}>
                    {v.name} ({v.registration}) — {v.status} {isDisabled ? "🚫" : "✅"}
                  </option>
                );
              })}
            </select>
            {errors.vehicleId && (
              <p className="text-[10px] text-error font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.vehicleId}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Maintenance Type */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
                Maintenance Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADF] text-xs font-semibold bg-white outline-none focus:border-[#9E003F]"
              >
                {MAINTENANCE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EEDADF] text-xs font-semibold bg-white outline-none focus:border-[#9E003F]"
              >
                {PRIORITY_LIST.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
              Issue Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              rows={3}
              placeholder="Describe the diagnostics details..."
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                errors.description ? "border-error" : "border-[#EEDADF]"
              }`}
            />
            {errors.description && (
              <p className="text-[10px] text-error font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Technician */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
                Assigned Technician
              </label>
              <input
                type="text"
                value={technician}
                onChange={(e) => {
                  setTechnician(e.target.value);
                  if (errors.technician) setErrors((prev) => ({ ...prev, technician: undefined }));
                }}
                placeholder="Carlos Ruiz"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                  errors.technician ? "border-error" : "border-[#EEDADF]"
                }`}
              />
              {errors.technician && (
                <p className="text-[10px] text-error font-bold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.technician}
                </p>
              )}
            </div>

            {/* Estimated Cost */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
                Estimated Cost ($)
              </label>
              <input
                type="number"
                value={estimatedCost || ""}
                onChange={(e) => {
                  setEstimatedCost(Number(e.target.value) || 0);
                  if (errors.estimatedCost) setErrors((prev) => ({ ...prev, estimatedCost: undefined }));
                }}
                placeholder="4500"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                  errors.estimatedCost ? "border-error" : "border-[#EEDADF]"
                }`}
              />
              {errors.estimatedCost && (
                <p className="text-[10px] text-error font-bold flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.estimatedCost}
                </p>
              )}
            </div>
          </div>

          {/* Expected Completion Date */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
              Expected Completion Date
            </label>
            <input
              type="date"
              value={expectedCompletionDate}
              onChange={(e) => {
                setExpectedCompletionDate(e.target.value);
                if (errors.expectedCompletionDate)
                  setErrors((prev) => ({ ...prev, expectedCompletionDate: undefined }));
              }}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-white outline-none focus:border-[#9E003F] ${
                errors.expectedCompletionDate ? "border-error" : "border-[#EEDADF]"
              }`}
            />
            {errors.expectedCompletionDate && (
              <p className="text-[10px] text-error font-bold flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.expectedCompletionDate}
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
              Create Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
