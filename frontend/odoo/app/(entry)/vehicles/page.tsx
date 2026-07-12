import React from 'react';
import { headers, cookies } from 'next/headers';
import { Truck, Wrench, Trash2, Plus } from 'lucide-react';

export default async function VehiclesPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  
  const headerTag = headerList.get('x-user-tag');
  const cookieTag = cookieStore.get('user_tag')?.value;
  const userTag = parseInt(headerTag || cookieTag || '1', 10);

  // Fleet Asset Registry Mock containing Capacity (Step 1) and State markers (Step 5, 8)
  const initialVehicles = [
    { reg: "Van-05", model: "Delivery Van", type: "Cargo", cap: 500, odo: 12400, value: 32000, status: "AVAILABLE", color: "bg-green-500" },
    { reg: "TR-8821-XP", model: "Kenworth T680", type: "Class 8 Heavy", cap: 20000, odo: 142502, value: 145000, status: "ON TRIP", color: "bg-blue-500" },
    { reg: "FL-4402", model: "Freightliner M2", type: "Box Truck", cap: 4500, odo: 89310, value: 68000, status: "IN SHOP", color: "bg-amber-500" },
    { reg: "Van-12", model: "Ford Transit", type: "Cargo", cap: 600, odo: 43100, value: 38000, status: "AVAILABLE", color: "bg-green-500" }
  ];

  // STEP 8 PIPELINE: Drivers/Dispatchers (Tag 2) must never see 'IN SHOP' units in their selection views
  const filteredVehicles = initialVehicles.filter(v => {
    if (userTag === 2) {
      return v.status !== "IN SHOP";
    }
    return true; // Fleet Managers, Safety Officers, Financial Analysts see full lifecycle assets
  });

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Fleet Asset Inventory</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Track volumetric constraints, active maintenance triggers, and total asset valuation logs.</p>
        </div>
        {/* Only Fleet Managers (Tag 1) can add new vehicles to the fleet layout */}
        {userTag === 1 && (
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Plus className="h-3.5 w-3.5" /> Register New Asset
          </button>
        )}
      </div>

      {/* Main Grid View */}
      <div className="bg-white border border-[#EEDADF] rounded-[32px] p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[#8A7578] tracking-wider uppercase border-b border-[#EEDADF] bg-[#FFF1F3]/10">
                <th className="py-3 px-4">Registration</th>
                <th className="py-3 px-4">Model Spec</th>
                <th className="py-3 px-4">Max Capacity (Step 1)</th>
                <th className="py-3 px-4">Odometer Log</th>
                {/* Financial Analysts (Tag 4) see unique monetary valuation profiles */}
                {userTag === 4 && <th className="py-3 px-4">Asset Capital Value</th>}
                <th className="py-3 px-4">Status</th>
                {userTag === 1 && <th className="py-3 px-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF8F8] text-xs font-bold text-[#2B2325]">
              {filteredVehicles.map((v, i) => (
                <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                  <td className="py-4 px-4 text-[#9E003F] font-black">{v.reg}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-black text-[#2B2325]">{v.model}</p>
                      <p className="text-[10px] text-[#8A7578] font-semibold">{v.type}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-[#5E4D50]">{v.cap} kg</td>
                  <td className="py-4 px-4 font-mono text-[#5E4D50]">{v.odo.toLocaleString('en-US')} mi</td>
                  
                  {/* Financial Metrics column injection with fixed locale */}
                  {userTag === 4 && (
                    <td className="py-4 px-4 text-green-700 font-mono">${v.value.toLocaleString('en-US')}</td>
                  )}

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-[#FDF8F8] border border-[#EEDADF] px-2.5 py-1 rounded-full">
                      <span className={`w-1.5 h-1.5 rounded-full ${v.color}`}></span> {v.status}
                    </span>
                  </td>

                  {/* Step 8 Maintenance Trigger Levers: Gated exclusively for Fleet Managers */}
                  {userTag === 1 && (
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {v.status === "AVAILABLE" && (
                          <button className="text-amber-600 border border-amber-200 bg-amber-50 hover:bg-amber-100 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1" title="Flag Maintenance Lifecycle">
                            <Wrench className="h-3 w-3" /> Push to Shop
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-red-600 p-1">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}