import React from "react";
import { Truck, UserCheck, Star, AlertCircle } from "lucide-react";
import { Driver, Vehicle } from "../../types/trip";
import { ValidationErrors } from "../../utils/tripValidation";

interface AssetAllocationCardProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  selectedVehicleId: string;
  selectedDriverId: string;
  errors: ValidationErrors;
  onChange: (field: string, value: string) => void;
}

export default function AssetAllocationCard({
  vehicles,
  drivers,
  selectedVehicleId,
  selectedDriverId,
  errors,
  onChange,
}: AssetAllocationCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-6">
      <h3 className="text-sm font-black text-[#2B2325] uppercase tracking-wider border-b border-[#FFF1F3] pb-2">
        Asset Allocation
      </h3>

      {/* Select Vehicle */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
          Select Vehicle (Available Only)
        </label>
        <div className="relative">
          <select
            value={selectedVehicleId}
            onChange={(e) => onChange("vehicleId", e.target.value)}
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
              errors.vehicleId
                ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
            }`}
          >
            <option value="">-- Choose a Vehicle --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.label} {!v.available ? "(In Shop / Busy)" : ""}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8A7578]">
            <Truck className="h-4 w-4" />
          </div>
        </div>
        {errors.vehicleId && (
          <p className="text-[10px] text-[#ba1a1a] font-bold ml-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.vehicleId}
          </p>
        )}
      </div>

      {/* Assign Driver */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
          Assign Driver (CDL-A Validation Check)
        </label>
        
        {errors.driverId && (
          <p className="text-[10px] text-[#ba1a1a] font-bold ml-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.driverId}
          </p>
        )}

        <div className="grid grid-cols-1 gap-2.5">
          {drivers.map((driver) => {
            const isSelected = selectedDriverId === driver.id;
            return (
              <label
                key={driver.id}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border transition-all ${
                  !driver.valid
                    ? "bg-[#FFF1F3] border-[#ba1a1a]/30 opacity-70 cursor-not-allowed"
                    : isSelected
                    ? "bg-[#FFF1F3] border-[#9E003F] shadow-sm"
                    : "bg-white border-[#EEDADF] hover:border-[#9E003F]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="driver"
                    value={driver.id}
                    checked={isSelected}
                    disabled={!driver.valid}
                    onChange={() => onChange("driverId", driver.id)}
                    className="text-[#9E003F] focus:ring-[#9E003F] h-4 w-4 border-[#EEDADF]"
                  />
                  {driver.avatar ? (
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className={`w-9 h-9 rounded-full object-cover border border-[#EEDADF] ${
                        !driver.valid ? "grayscale" : ""
                      }`}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#FFE9EA] text-[#9E003F] font-bold text-xs flex items-center justify-center border border-[#EEDADF]">
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className={`text-xs font-black ${!driver.valid ? "text-[#5E4D50]" : "text-[#2B2325]"}`}>
                      {driver.name}
                    </p>
                    <p className={`text-[10px] font-bold flex items-center gap-1 ${
                      driver.valid ? "text-[#00677f]" : "text-[#ba1a1a]"
                    }`}>
                      <Star className={`h-2.5 w-2.5 ${driver.valid ? "fill-[#00677f]" : ""}`} />
                      {driver.statusLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#8A7578] flex items-center gap-0.5">
                    Rating: {driver.safetyScore}/10
                  </span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase border ${
                      driver.statusTone === "ready"
                        ? "bg-[#E4F5EB] text-[#15803D] border-[#E4F5EB]"
                        : "bg-[#FFDAD6] text-[#93000a] border-[#FFDAD6]"
                    }`}
                  >
                    {driver.statusTone === "ready" ? "Ready" : "Invalid"}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
