import React from "react";
import { Wrench, CheckCircle2, UserCheck, AlertTriangle } from "lucide-react";
import { Driver, Vehicle } from "../../types/trip";

interface FleetAvailabilityProps {
  vehicles: Vehicle[];
  drivers: Driver[];
}

export default function FleetAvailability({ vehicles, drivers }: FleetAvailabilityProps) {
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.available).length;
  const maintenanceVehicles = vehicles.filter((v) => !v.available).length;
  const totalDrivers = drivers.length;
  const validDrivers = drivers.filter((d) => d.valid).length;
  const invalidDrivers = drivers.filter((d) => !d.valid).length;

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-4">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
        Fleet Availability Checklist
      </h4>

      <div className="space-y-3.5">
        {/* Vehicles Available */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-[#5E4D50]">
            <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
            <span>Available Trucks</span>
          </div>
          <span className="font-black text-[#2B2325]">
            {availableVehicles} / {totalVehicles}
          </span>
        </div>

        {/* Vehicles in Shop */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-[#5E4D50]">
            <Wrench className="h-4 w-4 text-[#D97706]" />
            <span>In Maintenance Shop</span>
          </div>
          <span className="font-black text-[#2B2325]">{maintenanceVehicles}</span>
        </div>

        {/* CDL Valid */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-[#5E4D50]">
            <UserCheck className="h-4 w-4 text-[#00677f]" />
            <span>Active CDL-A Drivers</span>
          </div>
          <span className="font-black text-[#2B2325]">
            {validDrivers} / {totalDrivers}
          </span>
        </div>

        {/* License Expiring Alerts */}
        {invalidDrivers > 0 && (
          <div className="bg-[#FFDAD6] border border-[#FFDAD6] p-3 rounded-2xl flex items-start gap-2 mt-2">
            <AlertTriangle className="h-4 w-4 text-[#BA1A1A] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-black text-[#BA1A1A] uppercase">Licensing Notice</p>
              <p className="text-[10px] text-[#5E4D50] font-semibold mt-0.5 leading-normal">
                {invalidDrivers} driver{invalidDrivers > 1 ? "s are" : " is"} currently flagged with expired CDL status and locked from dispatches.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
