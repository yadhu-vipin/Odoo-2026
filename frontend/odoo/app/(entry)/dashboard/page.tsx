import React from 'react';
import { headers, cookies } from 'next/headers';
import { Truck, Users, Wrench, Activity, DollarSign, BarChart3, Calendar, Filter } from 'lucide-react';

export default async function DashboardPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const userTag = parseInt(headerList.get('x-user-tag') || cookieStore.get('user_tag')?.value || '1', 10);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm">
        <div>
          <span className="text-[10px] font-black text-[#9E003F] uppercase bg-[#FFF1F3] px-2.5 py-1 rounded-md border border-[#EEDADF]">
            Role Context: {userTag === 1 ? 'Fleet Manager' : userTag === 2 ? 'Dispatcher' : userTag === 3 ? 'Safety Officer' : 'Financial Analyst'}
          </span>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight mt-2">Central Control Center</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Real-time asset telemetry, resource tracking, and operational analytics matrix.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-[#5E4D50] bg-[#FDF8F8] border border-[#EEDADF] px-3 py-2 rounded-xl flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-[#9E003F]" />
            <span>Filters: All Types / Status</span>
          </div>
          <div className="text-xs font-bold text-[#5E4D50] bg-[#FDF8F8] border border-[#EEDADF] px-4 py-2 rounded-xl flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#9E003F]" />
            <span>Jul 2026</span>
          </div>
        </div>
      </div>
      
      {/* KPI Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Active', val: '53', icon: Activity },
          { label: 'Available', val: '42', icon: Truck },
          { label: 'In Shop', val: '05', icon: Wrench },
          { label: 'Active Trips', val: '18', icon: BarChart3 },
          { label: 'Pending Trips', val: '09', icon: Calendar },
          { label: 'On Duty', val: '26', icon: Users },
          { label: 'Utilization', val: '81%', icon: DollarSign, special: true }
        ].map((k, i) => (
          <div key={i} className="bg-white border border-[#EEDADF] p-4 rounded-2xl shadow-sm">
            <k.icon className="h-4 w-4 text-[#9E003F] mb-2" />
            <span className="text-[9px] uppercase font-bold text-[#8A7578] block">{k.label}</span>
            <h3 className="text-xl font-black text-[#2B2325] mt-0.5">{k.val}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}