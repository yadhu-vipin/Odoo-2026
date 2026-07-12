import React from 'react';
import { headers, cookies } from 'next/headers';
import { Truck, Plus, Filter, Wrench } from 'lucide-react';

export default async function VehiclesPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const userTag = parseInt(headerList.get('x-user-tag') || cookieStore.get('user_tag')?.value || '1', 10);

  const vehicles = [
    { reg: 'ADU-0072', name: 'MAN-05', type: 'Van', cap: '500 kg', odo: '74,000 km', cost: '$120,000', status: 'Available' },
    { reg: 'ADU-0073', name: 'TRUCK-01', type: 'Truck', cap: '2 Ton', odo: '112,000 km', cost: '$240,000', status: 'On Trip' },
    { reg: 'ADU-0081', name: 'MAN-03', type: 'Van', cap: '1 Ton', odo: '66,200 km', cost: '$150,000', status: 'In Shop' },
    { reg: 'ADU-0082', name: 'MAN-04', type: 'Van', cap: '750 kg', odo: '241,100 km', cost: '$110,000', status: 'Retired' },
  ];

  const visibleVehicles = vehicles.filter(v => userTag !== 2 || v.status !== 'In Shop');

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Vehicle Registry</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Master asset list and configuration tracking.</p>
        </div>
        {userTag === 1 && (
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        )}
      </div>

      <div className="bg-white border border-[#EEDADF] rounded-[32px] p-6 shadow-sm space-y-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-[10px] font-black text-[#8A7578] uppercase border-b border-[#EEDADF] bg-[#FFF1F3]/10">
              <th className="py-3 px-3">Registration No.</th>
              <th className="py-3 px-3">Model Name</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Max Capacity</th>
              <th className="py-3 px-3">Odometer</th>
              {userTag === 4 && <th className="py-3 px-3">Acquisition Cost</th>}
              <th className="py-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FDF8F8] font-bold text-[#2B2325]">
            {visibleVehicles.map((v, i) => (
              <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                <td className="py-4 px-3 font-mono text-[#9E003F]">{v.reg}</td>
                <td className="py-4 px-3">{v.name}</td>
                <td className="py-4 px-3"><span className="bg-[#FFF1F3] px-2 py-0.5 rounded text-[10px]">{v.type}</span></td>
                <td className="py-4 px-3 text-[#5E4D50]">{v.cap}</td>
                <td className="py-4 px-3 text-[#5E4D50]">{v.odo}</td>
                {userTag === 4 && <td className="py-4 px-3 font-mono">{v.cost}</td>}
                <td className="py-4 px-3 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] ${v.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : v.status === 'On Trip' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}