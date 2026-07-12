import React from "react";
import { MapPin, Flag, Scale, Box } from "lucide-react";
import { ValidationErrors } from "../../utils/tripValidation";

interface RouteCargoCardProps {
  source: string;
  destination: string;
  plannedDistance: number;
  cargoWeight: number;
  cargoType: string;
  errors: ValidationErrors;
  onChange: (field: string, value: any) => void;
}

export default function RouteCargoCard({
  source,
  destination,
  plannedDistance,
  cargoWeight,
  cargoType,
  errors,
  onChange,
}: RouteCargoCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-6">
      <h3 className="text-sm font-black text-[#2B2325] uppercase tracking-wider border-b border-[#FFF1F3] pb-2">
        Route & Cargo Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source City */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
            Source City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-[#8A7578]" />
            <input
              type="text"
              value={source}
              onChange={(e) => onChange("source", e.target.value)}
              placeholder="Chicago, IL"
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all ${
                errors.source
                  ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                  : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
              }`}
            />
          </div>
          {errors.source && (
            <p className="text-[10px] text-[#ba1a1a] font-bold ml-1">{errors.source}</p>
          )}
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
            Destination
          </label>
          <div className="relative">
            <Flag className="absolute left-3.5 top-3 h-4 w-4 text-[#8A7578]" />
            <input
              type="text"
              value={destination}
              onChange={(e) => onChange("destination", e.target.value)}
              placeholder="Enter destination..."
              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all ${
                errors.destination
                  ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                  : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
              }`}
            />
          </div>
          {errors.destination && (
            <p className="text-[10px] text-[#ba1a1a] font-bold ml-1">{errors.destination}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Planned Distance */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
            Distance (mi)
          </label>
          <input
            type="number"
            value={plannedDistance || ""}
            onChange={(e) => onChange("plannedDistance", parseInt(e.target.value, 10) || 0)}
            placeholder="850"
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all ${
              errors.plannedDistance
                ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
            }`}
          />
          {errors.plannedDistance && (
            <p className="text-[10px] text-[#ba1a1a] font-bold ml-1">{errors.plannedDistance}</p>
          )}
        </div>

        {/* Cargo Weight */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
            Weight (kg)
          </label>
          <div className="relative">
            <Scale className="absolute left-3.5 top-3 h-4 w-4 text-[#8A7578]" style={{ display: 'none' }} />
            <input
              type="number"
              value={cargoWeight || ""}
              onChange={(e) => onChange("cargoWeight", parseInt(e.target.value, 10) || 0)}
              placeholder="18500"
              className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all ${
                errors.cargoWeight
                  ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                  : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
              }`}
            />
          </div>
          {errors.cargoWeight && (
            <p className="text-[10px] text-[#ba1a1a] font-bold ml-1">{errors.cargoWeight}</p>
          )}
        </div>

        {/* Cargo Type */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#8A7578] uppercase ml-1 block">
            Cargo Type
          </label>
          <input
            type="text"
            value={cargoType}
            onChange={(e) => onChange("cargoType", e.target.value)}
            placeholder="Electronics, Medical..."
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 transition-all ${
              errors.cargoType
                ? "border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]"
                : "border-[#EEDADF] focus:ring-[#9E003F] focus:border-[#9E003F]"
            }`}
          />
          {errors.cargoType && (
            <p className="text-[10px] text-[#ba1a1a] font-bold ml-1">{errors.cargoType}</p>
          )}
        </div>
      </div>
    </div>
  );
}
