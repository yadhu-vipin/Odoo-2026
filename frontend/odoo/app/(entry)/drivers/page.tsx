import React from 'react';
import { headers, cookies } from 'next/headers';
import { Users, ShieldAlert, Plus, CheckCircle2, AlertOctagon } from 'lucide-react';

export default async function DriversPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  
  const headerTag = headerList.get('x-user-tag');
  const cookieTag = cookieStore.get('user_tag')?.value;
  const userTag = parseInt(headerTag || cookieTag || '1', 10);

  const drivers = [
    { name: "Alex", id: "#DR-01", license: "TX-9921", cat: "Class A CDL", expiry: "Oct 12, 2026", score: 95, status: "AVAILABLE", dot: "bg-green-500" },
    { name: "Sarah Jenkins", id: "#DR-04", license: "NY-5510", cat: "Heavy Goods", expiry: "Sept 05, 2024", score: 82, status: "ON TRIP", dot: "bg-blue-500" },
    { name: "Amit Patel", id: "#DR-09", license: "IL-3382", cat: "Hazardous Mats", expiry: "Jan 14, 2025", score: 64, status: "SUSPENDED", dot: "bg-red-500" }
  ];

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Driver Roster Matrix</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Manage operator deployment constraints, verify active commercial licensing, and review compliance frameworks.</p>
        </div>
        {/* Only Safety Officers (Tag 3) and Fleet Managers (Tag 1) can append operator rows */}
        {(userTag === 1 || userTag === 3) && (
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Plus className="h-3.5 w-3.5" /> Register Operator Entry
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Roster Main Data Layer Viewport Grid */}
        <div className={(userTag === 3) ? "lg:col-span-8 bg-white border border-[#EEDADF] rounded-[32px] p-6 shadow-sm space-y-4" : "lg:col-span-12 bg-white border border-[#EEDADF] rounded-[32px] p-6 shadow-sm space-y-4"}>
          <h3 className="text-sm font-black text-[#2B2325] uppercase tracking-wider">Active Resource Roster</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[10px] font-black text-[#8A7578] tracking-wider uppercase border-b border-[#EEDADF] bg-[#FFF1F3]/10">
                  <th className="py-3 px-3">Operator Identifier</th>
                  <th className="py-3 px-3">License Code</th>
                  <th className="py-3 px-3">Classification</th>
                  {/* Financial Analysts (Tag 4) do not require granular tracking of safety scoring behaviors */}
                  {userTag !== 4 && <th className="py-3 px-3">Safety Metrics</th>}
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDF8F8] font-bold text-[#2B2325]">
                {drivers.map((d, i) => (
                  <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                    <td className="py-4 px-3">
                      <div>
                        <p className="font-black text-[#2B2325]">{d.name}</p>
                        <p className="text-[10px] font-semibold text-[#8A7578]">{d.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-3 font-mono text-[#5E4D50]">{d.license}</td>
                    <td className="py-4 px-3">
                      <span className="bg-[#FFF1F3] text-[#9E003F] text-[10px] font-black px-2 py-0.5 rounded border border-[#EEDADF]">{d.cat}</span>
                    </td>

                    {/* Conditional Safety Column Mask */}
                    {userTag !== 4 && (
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div className={`h-full ${d.score >= 90 ? 'bg-green-600' : 'bg-red-500'}`} style={{ width: `${d.score}%` }}></div>
                          </div>
                          <span className="font-mono">{d.score}%</span>
                        </div>
                      </td>
                    )}

                    <td className="py-4 px-3 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-[#FDF8F8] border border-[#EEDADF] px-2.5 py-1 rounded-full">
                        <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`}></span> {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SAFETY COMPLIANCE BLOCK - EXCLUSIVELY VISIBLE TO TAG 3    */}
        {/* ========================================================= */}
        {userTag === 3 && (
          <div className="lg:col-span-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-2">
              <ShieldAlert className="h-4 w-4 text-[#9E003F]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-[#2B2325]">Active Safety Validation Audit</h4>
            </div>
            
            <p className="text-[11px] font-semibold text-[#5E4D50]">
              The following operators require mandatory license verification and HOS review profiles before their next scheduled dispatch window.
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                <AlertOctagon className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-red-900">Amit Patel — Suspended Hold</h5>
                  <p className="text-[10px] text-red-700 font-semibold mt-0.5">License category validation lock flagged out for immediate medical recertification delays.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}