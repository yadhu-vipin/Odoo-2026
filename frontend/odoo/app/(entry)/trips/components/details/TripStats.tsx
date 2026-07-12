import React from "react";
import { Scale, Compass, Clock, CreditCard } from "lucide-react";

interface TripStatsProps {
  cargoWeight: string;
  cargoType: string;
  plannedDistance?: number;
  progress?: number;
  milesLeft?: string;
}

export default function TripStats({
  cargoWeight,
  cargoType,
  plannedDistance = 0,
  progress = 0,
  milesLeft = "",
}: TripStatsProps) {
  // Parse numeric weight for cost/load computations
  const numericWeight = parseInt(cargoWeight.replace(/[^0-9]/g, ""), 10) || 0;
  const weightTons = (numericWeight / 1000).toFixed(1);

  // Remaining miles computation
  let remainingMilesNum = plannedDistance;
  if (progress > 0 && progress < 100) {
    remainingMilesNum = Math.round(plannedDistance * (1 - progress / 100));
  } else if (progress === 100) {
    remainingMilesNum = 0;
  }

  // Estimated Travel Time remaining (assuming average highway speeds of ~55 mph)
  const remainingHours = remainingMilesNum / 55;
  const hours = Math.floor(remainingHours);
  const minutes = Math.round((remainingHours - hours) * 60);
  const travelTimeStr = progress === 100 ? "Completed" : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  // Fuel Cost remaining or total
  const estimatedFuelCost = (plannedDistance * 0.37 + numericWeight * 0.005).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Cargo Weight */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start gap-4 hover:translate-y-[-2px] transition-transform duration-200">
        <div className="bg-[#FFF1F3] p-2.5 rounded-xl border border-[#EEDADF]/50 text-[#9E003F]">
          <Scale className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[9px] font-black text-[#8A7578] uppercase tracking-wider block">
            Cargo Weight
          </span>
          <h4 className="text-lg font-black text-[#2B2325] mt-0.5">
            {weightTons} Tons
          </h4>
          <span className="text-[10px] text-[#8A7578] font-bold block mt-0.5">
            {cargoType} type
          </span>
        </div>
      </div>

      {/* Distance Remaining */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start gap-4 hover:translate-y-[-2px] transition-transform duration-200">
        <div className="bg-[#FFF1F3] p-2.5 rounded-xl border border-[#EEDADF]/50 text-[#9E003F]">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[9px] font-black text-[#8A7578] uppercase tracking-wider block">
            Distance Remaining
          </span>
          <h4 className="text-lg font-black text-[#2B2325] mt-0.5">
            {progress === 100 ? "0 mi" : `${remainingMilesNum} mi`}
          </h4>
          <span className="text-[10px] text-[#8A7578] font-bold block mt-0.5">
            {progress === 100 ? "Delivered" : `Total: ${plannedDistance} mi`}
          </span>
        </div>
      </div>

      {/* Est Travel Time */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start gap-4 hover:translate-y-[-2px] transition-transform duration-200">
        <div className="bg-[#FFF1F3] p-2.5 rounded-xl border border-[#EEDADF]/50 text-[#9E003F]">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[9px] font-black text-[#8A7578] uppercase tracking-wider block">
            Est. Travel Time
          </span>
          <h4 className="text-lg font-black text-[#2B2325] mt-0.5">
            {travelTimeStr}
          </h4>
          <span className="text-[10px] text-[#8A7578] font-bold block mt-0.5">
            {progress === 100 ? "Arrived" : "Avg speed: 55 mph"}
          </span>
        </div>
      </div>

      {/* Est Fuel Cost */}
      <div className="bg-white p-5 rounded-[24px] border border-[#EEDADF] shadow-sm flex items-start gap-4 hover:translate-y-[-2px] transition-transform duration-200">
        <div className="bg-[#FFF1F3] p-2.5 rounded-xl border border-[#EEDADF]/50 text-[#9E003F]">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[9px] font-black text-[#8A7578] uppercase tracking-wider block">
            Fuel Est. Cost
          </span>
          <h4 className="text-lg font-black text-[#2B2325] mt-0.5">
            ${estimatedFuelCost}
          </h4>
          <span className="text-[10px] text-[#8A7578] font-bold block mt-0.5">
            Market rate ($/mi)
          </span>
        </div>
      </div>
    </div>
  );
}
