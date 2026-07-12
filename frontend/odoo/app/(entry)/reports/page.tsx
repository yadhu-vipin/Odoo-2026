import React from 'react';
import { headers, cookies } from 'next/headers';
import { BarChart3, Download, TrendingUp, Fuel } from 'lucide-react';

export default async function ReportsPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const userTag = parseInt(headerList.get('x-user-tag') || cookieStore.get('user_tag')?.value || '1', 10);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Fleet efficiency curves, ROI analysis, and operational cost breakdown.</p>
        </div>
        {(userTag === 1 || userTag === 4) && (
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EEDADF] p-5 rounded-2xl shadow-sm">
          <Fuel className="h-4 w-4 text-[#9E003F] mb-2" />
          <span className="text-[9px] uppercase font-bold text-[#8A7578]">Fuel Efficiency</span>
          <h3 className="text-2xl font-black text-[#2B2325] mt-1">8.4 km/L</h3>
        </div>
        <div className="bg-white border border-[#EEDADF] p-5 rounded-2xl shadow-sm">
          <TrendingUp className="h-4 w-4 text-[#9E003F] mb-2" />
          <span className="text-[9px] uppercase font-bold text-[#8A7578]">Utilization Rate</span>
          <h3 className="text-2xl font-black text-[#2B2325] mt-1">81%</h3>
        </div>
        <div className="bg-white border border-[#EEDADF] p-5 rounded-2xl shadow-sm">
          <BarChart3 className="h-4 w-4 text-[#9E003F] mb-2" />
          <span className="text-[9px] uppercase font-bold text-[#8A7578]">Operating Cost</span>
          <h3 className="text-2xl font-black text-[#2B2325] mt-1">$34,070</h3>
        </div>
        <div className="bg-white border border-[#EEDADF] p-5 rounded-2xl shadow-sm">
          <span className="text-[9px] uppercase font-bold text-[#8A7578]">Fleet ROI %</span>
          <h3 className="text-2xl font-black text-[#2B2325] mt-1">14.2%</h3>
        </div>
      </div>
    </div>
  );
}