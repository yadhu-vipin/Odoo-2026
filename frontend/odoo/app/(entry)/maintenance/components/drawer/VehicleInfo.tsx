import React from "react";

interface VehicleInfoProps {
  vehicleName: string;
  registration: string;
  vehicleClass: string;
  odometer: string;
}

export default function VehicleInfo({
  vehicleName,
  registration,
  vehicleClass,
  odometer,
}: VehicleInfoProps) {
  return (
    <section className="mb-lg bg-white p-5 rounded-2xl border border-[#EEDADF] shadow-sm">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-widest mb-4">
        Vehicle Information
      </h4>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Model</p>
          <p className="text-[#2B2325] font-black mt-0.5">{vehicleName}</p>
        </div>
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Registration</p>
          <p className="text-[#2B2325] font-mono font-black mt-0.5">{registration}</p>
        </div>
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Class</p>
          <p className="text-[#2B2325] font-bold mt-0.5">{vehicleClass}</p>
        </div>
        <div>
          <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Odometer</p>
          <p className="text-[#2B2325] font-bold mt-0.5">{odometer}</p>
        </div>
      </div>
    </section>
  );
}
