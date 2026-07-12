import React from "react";
import { Truck, Scale, ShieldCheck } from "lucide-react";
import { Vehicle } from "../../types/trip";

interface VehicleInfoProps {
  vehicleDetails?: Vehicle;
  fallbackLabel?: string;
}

export default function VehicleInfo({ vehicleDetails, fallbackLabel }: VehicleInfoProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#FFF1F3] pb-2">
        <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
          Vehicle Info
        </h4>
        <Truck className="h-4 w-4 text-[#00677f]" />
      </div>

      <div className="flex items-center gap-4">
        {/* Mock Vehicle Silhouette Visual */}
        <div className="w-16 h-12 bg-[#FFF1F3] border border-[#EEDADF]/50 rounded-xl flex items-center justify-center text-[#9E003F]">
          <Truck className="h-6 w-6 stroke-[1.5]" />
        </div>

        <div>
          <h5 className="text-sm font-black text-[#2B2325]">
            {vehicleDetails?.label || fallbackLabel || "No Vehicle Assigned"}
          </h5>
          <p className="text-[10px] text-[#8A7578] font-bold">
            ID: {vehicleDetails?.id || "VH-XXXX"}
          </p>
        </div>
      </div>

      {vehicleDetails ? (
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          {/* Plate */}
          <div className="bg-[#FFF1F3]/40 border border-[#EEDADF]/40 p-2.5 rounded-2xl">
            <span className="text-[8px] font-black text-[#8A7578] uppercase tracking-wider block">
              Plate
            </span>
            <span className="text-xs font-black text-[#2B2325] block mt-0.5">
              {vehicleDetails.plate}
            </span>
          </div>

          {/* Odometer */}
          <div className="bg-[#FFF1F3]/40 border border-[#EEDADF]/40 p-2.5 rounded-2xl">
            <span className="text-[8px] font-black text-[#8A7578] uppercase tracking-wider block">
              Odometer
            </span>
            <span className="text-xs font-black text-[#2B2325] block mt-0.5">
              {vehicleDetails.odometer}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-[#8A7578] italic font-semibold pt-1">
          Vehicle details unavailable for this route.
        </p>
      )}
    </div>
  );
}
