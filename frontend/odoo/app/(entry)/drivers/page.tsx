import React from 'react';
import { headers, cookies } from 'next/headers';
import { Users, Plus, ShieldAlert } from 'lucide-react';

export default async function DriversPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const userTag = parseInt(headerList.get('x-user-tag') || cookieStore.get('user_tag')?.value || '1', 10);

  const drivers = [
    { name: 'Alex', license: 'DL-88213', cat: 'LMV', expiry: '12/2026', contact: '+9715000000', score: 94, status: 'Available' },
    { name: 'John', license: 'DL-44120', cat: 'HMV', expiry: '03/2025', contact: '+9715600000', score: 87, status: 'Suspended' },
    { name: 'Priya', license: 'DL-11032', cat: 'LMV', expiry: '01/2027', contact: '+9715000000', score: 99, status: 'On Trip' },
  ];

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Driver Management</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Operator compliance metrics, safety indexes, and licensing records.</p>
        </div>
        {(userTag === 1 || userTag === 3) && (
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Plus className="h-4 w-4" /> Add Driver
          </button>
        )}
      </div>

      <div className="bg-white border border-[#EEDADF] rounded-[32px] p-6 shadow-sm space-y-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-[10px] font-black text-[#8A7578] uppercase border-b border-[#EEDADF] bg-[#FFF1F3]/10">
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">License No.</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Expiry</th>
              {userTag !== 4 && <th className="py-3 px-3">Safety Score</th>}
              <th className="py-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FDF8F8] font-bold text-[#2B2325]">
            {drivers.map((d, i) => (
              <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                <td className="py-4 px-3 font-black text-[#2B2325]">{d.name}</td>
                <td className="py-4 px-3 font-mono text-[#5E4D50]">{d.license}</td>
                <td className="py-4 px-3"><span className="bg-[#FFF1F3] px-2 py-0.5 rounded text-[10px]">{d.cat}</span></td>
                <td className="py-4 px-3 text-[#5E4D50]">{d.expiry}</td>
                {userTag !== 4 && (
                  <td className="py-4 px-3 font-mono">{d.score}%</td>
                )}
                <td className="py-4 px-3 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] ${d.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : d.status === 'On Trip' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                    {d.status}
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