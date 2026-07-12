import React from "react";
import { ShieldCheck, User, Phone, Award } from "lucide-react";
import { Driver } from "../../types/trip";

interface DriverInfoProps {
  driverDetails?: Driver;
  fallbackName?: string;
  fallbackAvatar?: string;
}

export default function DriverInfo({
  driverDetails,
  fallbackName,
  fallbackAvatar,
}: DriverInfoProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#FFF1F3] pb-2">
        <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
          Driver Profile
        </h4>
        <ShieldCheck className="h-4 w-4 text-[#9E003F]" />
      </div>

      <div className="flex items-center gap-3.5">
        {/* Avatar */}
        {driverDetails?.avatar || fallbackAvatar ? (
          <img
            src={driverDetails?.avatar || fallbackAvatar}
            alt={driverDetails?.name || fallbackName || "Driver"}
            className="w-11 h-11 rounded-full object-cover border border-[#EEDADF]"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#FFE9EA] text-[#9E003F] font-bold text-xs flex items-center justify-center border border-[#EEDADF]">
            {(driverDetails?.name || fallbackName || "U")
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}

        <div>
          <h5 className="text-sm font-black text-[#2B2325]">
            {driverDetails?.name || fallbackName || "No Driver Assigned"}
          </h5>
          {driverDetails?.phone && (
            <p className="text-[10px] text-[#8A7578] font-bold flex items-center gap-1.5 mt-0.5">
              <Phone className="h-3 w-3" />
              {driverDetails.phone}
            </p>
          )}
        </div>
      </div>

      {driverDetails ? (
        <div className="bg-[#FFF1F3]/40 border border-[#EEDADF]/40 p-3.5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[8px] font-black text-[#8A7578] uppercase tracking-wider block">
              Safety Score
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs font-black text-[#BA1A1A]">★</span>
              <span className="text-sm font-black text-[#2B2325]">
                {driverDetails.safetyScore}
              </span>
              <span className="text-[10px] text-[#8A7578] font-bold">/ 10</span>
            </div>
          </div>

          {driverDetails.safetyScore >= 9.0 && (
            <span className="bg-[#00677f]/10 text-[#00677f] border border-[#00677f]/20 text-[9px] font-black px-2.5 py-1 rounded-md uppercase flex items-center gap-1">
              <Award className="h-3 w-3" />
              Top Rated
            </span>
          )}
        </div>
      ) : (
        <p className="text-xs text-[#8A7578] italic font-semibold pt-1">
          No driver allocated to this route.
        </p>
      )}
    </div>
  );
}
