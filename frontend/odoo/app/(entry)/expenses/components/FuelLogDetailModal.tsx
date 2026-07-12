import React from "react";
import { X, Calendar, Fuel, MapPin, Gauge, Edit3 } from "lucide-react";
import { FuelLog } from "../types";
import { costCalculations } from "../utils";

interface FuelLogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  log?: FuelLog;
}

export default function FuelLogDetailModal({
  isOpen,
  onClose,
  onEdit,
  log,
}: FuelLogDetailModalProps) {
  if (!isOpen || !log) return null;

  const formattedDate = new Date(log.fuelDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Detail Card Container */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-[#EEDADF]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EEDADF]/30 flex justify-between items-center bg-[#FFF1F3]/40">
          <div>
            <h3 className="text-xs font-black text-[#9E003F] uppercase tracking-widest">
              Fuel Log Details
            </h3>
            <p className="text-[10px] text-[#8A7578] font-bold mt-1">
              ID: {log.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF1F3] rounded-full text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details Grid Body */}
        <div className="p-6 space-y-5 bg-white text-xs text-[#2B2325]">
          {/* Vehicle info banner */}
          <div className="p-4 bg-[#FFF1F3]/25 border border-[#EEDADF]/50 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE]/60 text-[#0369A1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] font-semibold">local_shipping</span>
            </div>
            <div>
              <p className="font-black text-sm text-[#2B2325]">{log.vehicleName}</p>
              <p className="font-mono text-[10px] text-[#8A7578] font-bold mt-0.5">
                Reg: {log.registration} | Trip ID: {log.tripId || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fuel Date */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#8A7578]" />
                Date
              </p>
              <p className="font-bold text-[#2B2325]">{formattedDate}</p>
            </div>

            {/* Fuel Station */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#8A7578]" />
                Station
              </p>
              <p className="font-bold text-[#2B2325] truncate">
                {log.fuelStation || "Unknown Station"}
              </p>
            </div>

            {/* Odometer */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <Gauge className="h-3 w-3 text-[#8A7578]" />
                Odometer
              </p>
              <p className="font-bold text-[#2B2325] font-mono">
                {log.odometer.toLocaleString()} mi
              </p>
            </div>

            {/* Liters */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <Fuel className="h-3 w-3 text-[#8A7578]" />
                Refuel Volume
              </p>
              <p className="font-bold text-[#2B2325]">
                {log.liters} L <span className="text-[10px] text-[#8A7578] font-bold">(@ ${log.pricePerLiter}/L)</span>
              </p>
            </div>
          </div>

          {/* Cost summary card */}
          <div className="p-4 bg-[#fff0f1]/60 border border-[#EEDADF]/50 rounded-2xl flex justify-between items-center">
            <span className="font-bold text-[#8A7578]">Total Transaction Cost:</span>
            <span className="font-black text-[#9E003F] text-base">
              {costCalculations.formatCurrency(log.totalCost)}
            </span>
          </div>

          {/* Remarks */}
          {log.remarks && (
            <div className="space-y-1">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Remarks</p>
              <p className="p-3 bg-[#FFF1F3]/15 border border-[#EEDADF]/30 rounded-xl italic text-[#5E4D50] leading-relaxed">
                "{log.remarks}"
              </p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EEDADF]/30 flex justify-end gap-3 bg-white">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-[#EEDADF] text-[#5E4D50] hover:bg-[#FFF1F3]/40 text-xs font-bold transition-all cursor-pointer uppercase"
            >
              Close
            </button>
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-5 py-2 bg-[#9E003F] text-white rounded-full font-bold shadow-md hover:bg-[#800032] active:scale-95 transition-all flex items-center gap-1 text-xs cursor-pointer uppercase"
              >
                <Edit3 className="h-3 w-3" />
                Edit Log
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
