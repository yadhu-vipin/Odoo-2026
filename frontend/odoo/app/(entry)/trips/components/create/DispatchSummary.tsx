import React from "react";
import { CreditCard, Route, Compass, Scale, Check } from "lucide-react";
import { Driver, Vehicle } from "../../types/trip";

interface DispatchSummaryProps {
  source: string;
  destination: string;
  plannedDistance: number;
  cargoWeight: number;
  cargoType: string;
  selectedVehicle?: Vehicle;
  selectedDriver?: Driver;
  weightExceeded: boolean;
  onSaveDraft: () => void;
  onDispatch: () => void;
  isSubmitting: boolean;
}

export default function DispatchSummary({
  source,
  destination,
  plannedDistance,
  cargoWeight,
  cargoType,
  selectedVehicle,
  selectedDriver,
  weightExceeded,
  onSaveDraft,
  onDispatch,
  isSubmitting,
}: DispatchSummaryProps) {
  // Fuel estimation calculation: approx $0.37 per mile, or weight ratio
  const fuelEst = plannedDistance ? (plannedDistance * 0.37 + cargoWeight * 0.01).toFixed(2) : "0.00";
  const canDispatch =
    source.trim() &&
    destination.trim() &&
    plannedDistance > 0 &&
    cargoWeight > 0 &&
    selectedVehicle &&
    selectedVehicle.available &&
    selectedDriver &&
    selectedDriver.valid &&
    !weightExceeded;

  return (
    <div className="bg-[#FFF1F3] p-6 rounded-3xl border border-[#EEDADF] shadow-sm flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-black text-[#9E003F] uppercase tracking-wider border-b border-[#EEDADF] pb-2">
          Dispatch Summary
        </h3>

        {/* Detailed specs */}
        <div className="space-y-3.5 text-xs font-bold text-[#5E4D50]">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5"><Route className="h-3.5 w-3.5 text-[#8A7578]" /> Route</span>
            <span className="text-[#2B2325] text-right font-black">
              {source || "—"} to {destination || "—"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5"><Compass className="h-3.5 w-3.5 text-[#8A7578]" /> Total Distance</span>
            <span className="text-[#2B2325] font-black">{plannedDistance ? `${plannedDistance} mi` : "—"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-[#8A7578]" /> Cargo weight</span>
            <span className={`font-black ${weightExceeded ? "text-[#ba1a1a]" : "text-[#2B2325]"}`}>
              {cargoWeight ? `${cargoWeight.toLocaleString()} kg` : "—"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5">Cargo Type</span>
            <span className="text-[#2B2325] font-black">{cargoType || "—"}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#EEDADF]/50">
            <span className="flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5 text-[#8A7578]" /> Est. Fuel Cost</span>
            <span className="text-[#9E003F] text-sm font-black">${fuelEst}</span>
          </div>
        </div>

        {/* Asset confirmation badge */}
        <div className="bg-white/70 p-3 rounded-2xl border border-[#EEDADF]/40 space-y-2">
          <p className="text-[9px] font-black text-[#8A7578] uppercase tracking-wider">Assigned Assets</p>
          <div className="space-y-1 text-[11px] font-bold text-[#2B2325]">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${selectedVehicle ? "bg-[#15803D]" : "bg-gray-300"}`} />
              <span>Truck: {selectedVehicle ? selectedVehicle.label.split(" - ")[0] : "None Assigned"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${selectedDriver ? "bg-[#15803D]" : "bg-gray-300"}`} />
              <span>Driver: {selectedDriver ? selectedDriver.name : "None Assigned"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button deck */}
      <div className="space-y-3.5 pt-4 border-t border-[#EEDADF]">
        <button
          type="button"
          disabled={isSubmitting || !source.trim() || !destination.trim()}
          onClick={onSaveDraft}
          className="w-full py-3 bg-white border border-[#EEDADF] rounded-xl text-xs font-black uppercase text-[#5E4D50] hover:bg-[#FCE7EA] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSubmitting || !canDispatch}
          onClick={onDispatch}
          className="w-full py-3 bg-[#9E003F] text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-[#9E003F]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-1.5"
        >
          <Check className="h-4 w-4" />
          Submit &amp; Dispatch
        </button>
      </div>
    </div>
  );
}
