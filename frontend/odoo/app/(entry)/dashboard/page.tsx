"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Plus,
  Truck,
  Wrench,
  Navigation,
  Clock,
  UserCheck,
  Percent,
  Layers,
  MapPin
} from 'lucide-react';

export default function DashboardPage() {
  // State management for specified 3.2 filter architecture
  const [vehicleType, setVehicleType] = useState('All');
  const [status, setStatus] = useState('All');
  const [region, setRegion] = useState('All');

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      
      {/* Title Header Block */}
      <div>
        <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Fleet Overview</h1>
        <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Real-time operational status and metrics</p>
      </div>

      {/* --- SPEC 3.2: FILTER CONTROLS BAR --- */}
      <div className="bg-white border border-[#EEDADF] p-4 rounded-2xl shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-black text-[#5E4D50] mr-2">
          <span>FILTERS:</span>
        </div>
        
        {/* Vehicle Type Filter */}
        <div className="flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-[#8A7578]" />
          <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)} 
            className="bg-white border border-[#EEDADF] text-xs font-bold px-3 py-1.5 rounded-xl text-[#2B2325] outline-none cursor-pointer"
          >
            <option value="All">All Vehicle Types</option>
            <option value="Class 8 Truck">Class 8 Trucks</option>
            <option value="Box Truck">Box Trucks</option>
            <option value="Cargo Van">Cargo Vans</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#8A7578]" />
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className="bg-white border border-[#EEDADF] text-xs font-bold px-3 py-1.5 rounded-xl text-[#2B2325] outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#8A7578]" />
          <select 
            value={region} 
            onChange={(e) => setRegion(e.target.value)} 
            className="bg-white border border-[#EEDADF] text-xs font-bold px-3 py-1.5 rounded-xl text-[#2B2325] outline-none cursor-pointer"
          >
            <option value="All">All Regions</option>
            <option value="North">North Region</option>
            <option value="South">South Region</option>
            <option value="East">East Region</option>
            <option value="West">West Region</option>
          </select>
        </div>
      </div>

      {/* --- SPEC 3.2: ROW 1 - 7 MANDATORY KPI CARDS DECK --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Vehicles */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Active Vehicles</span>
            <div className="p-1.5 rounded-lg text-[#0369A1] bg-[#E0F2FE]"><Truck className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">142</h3>
        </div>

        {/* KPI 2: Available Vehicles */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Available Vehicles</span>
            <div className="p-1.5 rounded-lg text-[#15803D] bg-[#E4F5EB]"><CheckCircle2 className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">18</h3>
        </div>

        {/* KPI 3: Vehicles in Maintenance */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Vehicles In Maintenance</span>
            <div className="p-1.5 rounded-lg text-[#B45309] bg-[#FEF3C7]"><Wrench className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">9</h3>
        </div>

        {/* KPI 4: Active Trips */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Active Trips</span>
            <div className="p-1.5 rounded-lg text-[#6B21A8] bg-[#F3E8FF]"><Navigation className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">84</h3>
        </div>

        {/* KPI 5: Pending Trips */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Pending Trips</span>
            <div className="p-1.5 rounded-lg text-[#4B5563] bg-[#F3F4F6]"><Clock className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">26</h3>
        </div>

        {/* KPI 6: Drivers On Duty */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Drivers On Duty</span>
            <div className="p-1.5 rounded-lg text-[#0F766E] bg-[#CCFBF1]"><UserCheck className="h-3.5 w-3.5" /></div>
          </div>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">138</h3>
        </div>

        {/* KPI 7: Fleet Utilization (%) */}
        <div className="bg-[#2B2325] text-white p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[125px] col-span-2 xl:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#A6999B] uppercase tracking-wider">Fleet Utilization</span>
            <div className="p-1.5 rounded-lg text-[#9E003F] bg-[#FFF1F3]"><Percent className="h-3.5 w-3.5" /></div>
          </div>
          <div className="flex items-baseline gap-4 mt-1">
            <h3 className="text-3xl font-black tracking-tight text-white">92.4%</h3>
            <span className="text-[11px] font-bold text-[#4ADE80] flex items-center gap-1">
              Optimal Performance
            </span>
          </div>
        </div>

      </div>

      {/* --- ROW 2: GRAPH AND FINANCIAL SUMMARY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        
        {/* Performance Stacked Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-md font-black text-[#2B2325]">Fleet Dynamic Performance</h3>
              <p className="text-[11px] text-[#8A7578] font-medium mt-0.5">Trip Volume vs Capacity (Weekly View)</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-[#5E4D50]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E003F]"></span><span>Trips</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FCE7EA]"></span><span>Capacity</span>
              </div>
            </div>
          </div>

          {/* High Fidelity Native CSS Chart Layout */}
          <div className="grid grid-cols-7 gap-4 items-end h-56 pt-6 px-2 border-b border-[#FDF8F8]">
            {[
              { day: 'MON', cap: 'h-32', trip: 'h-16' },
              { day: 'TUE', cap: 'h-40', trip: 'h-24' },
              { day: 'WED', cap: 'h-44', trip: 'h-32' },
              { day: 'THU', cap: 'h-36', trip: 'h-20' },
              { day: 'FRI', cap: 'h-48', trip: 'h-36' },
              { day: 'SAT', cap: 'h-24', trip: 'h-12' },
              { day: 'SUN', cap: 'h-16', trip: 'h-4' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end relative group">
                <div className="w-full bg-[#FFF1F3] rounded-t-lg relative flex items-end justify-center overflow-hidden transition-all duration-300 group-hover:bg-[#FCE7EA]" style={{ height: '85%' }}>
                  <div className={`w-full bg-[#9E003F] rounded-t-lg transition-all ${bar.trip}`} style={{ opacity: 0.9 }}></div>
                </div>
                <span className="text-[10px] font-black text-[#8A7578] mt-1">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Deep Crimson Solid Panel Card */}
        <div className="bg-[#9E003F] text-white p-7 rounded-[32px] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-6 bottom-6 h-12 w-12 bg-[#800032] rounded-full flex items-center justify-center">
            <FileText className="h-5 w-5 text-white opacity-80" />
          </div>

          <div>
            <h3 className="text-lg font-black tracking-tight">Financial Summary</h3>
            
            <div className="mt-6 space-y-1">
              <span className="text-[9px] font-black uppercase text-[#FADEE4] tracking-wider block">Total Revenue</span>
              <h4 className="text-4xl font-black tracking-tight">$284,500</h4>
            </div>

            <div className="mt-4 space-y-1">
              <span className="text-[9px] font-black uppercase text-[#FADEE4] tracking-wider block">Operating Cost</span>
              <h5 className="text-xl font-black text-[#FFF1F3]">$156,220</h5>
            </div>
          </div>

          <div className="pt-4 border-t border-[#B31A53] mt-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black uppercase text-[#FADEE4] tracking-wider block">Efficiency Ratio</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-black">1.82</span>
                <span className="bg-[#B31A53] text-[#FFF1F3] text-[9px] font-black px-1.5 py-0.5 rounded">OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- ROW 3: ALERTS AND TIMELINE ACTIVITY SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Critical Operations Alerts Module */}
        <div className="lg:col-span-7 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#FDF8F8]">
            <h3 className="text-md font-black text-[#2B2325]">Critical Alerts</h3>
            <span className="bg-[#FFF1F3] text-[#9E003F] border border-[#EEDADF] text-[9px] font-black px-2.5 py-0.5 rounded-md">
              2 ACTION REQUIRED
            </span>
          </div>

          <div className="space-y-3">
            {/* Alert Item 1 */}
            <div className="bg-[#FFF1F3] border border-[#EEDADF] p-4 rounded-2xl flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAFAFA] border border-[#EEDADF] rounded-xl text-[#9E003F] mt-0.5">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-[#2B2325]">Vehicle TR-4022: Overdue Maintenance</h5>
                  <p className="text-[11px] text-[#5E4D50] font-medium mt-0.5">Brake pad inspection exceeded by 450 miles. Status updated to: In Shop.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#9E003F] underline whitespace-nowrap hover:text-[#800032]">
                Resolve
              </button>
            </div>

            {/* Alert Item 2 */}
            <div className="bg-[#FFF1F3] border border-[#EEDADF] p-4 rounded-2xl flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAFAFA] border border-[#EEDADF] rounded-xl text-[#2B2325] mt-0.5">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-[#2B2325]">Driver License Expiring: Elias Thorne</h5>
                  <p className="text-[11px] text-[#5E4D50] font-medium mt-0.5">Class B CDL expires in 14 days (Dec 28, 2026). Triggers automated email reminder.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#2B2325] underline whitespace-nowrap">
                Notify
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Activity Feed */}
        <div className="lg:col-span-5 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm flex flex-col justify-between min-h-[310px] relative">
          <div>
            <div className="flex items-center justify-between mb-4 pb-1 border-b border-[#FDF8F8]">
              <h3 className="text-md font-black text-[#2B2325]">Activity Feed</h3>
              <button className="text-xs font-bold text-[#9E003F] hover:underline">View all</button>
            </div>

            {/* Vertical Timeline Container */}
            <div className="relative space-y-5 pl-6">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#EEDADF]"></div>

              {/* Activity Step 1 */}
              <div className="relative flex items-start justify-between text-xs">
                <div className="absolute -left-6 mt-0.5 w-3.5 h-3.5 bg-[#4ADE80] rounded-full border-2 border-white"></div>
                <div>
                  <h6 className="font-black text-[#2B2325]">Trip Completed</h6>
                  <p className="text-[11px] text-[#8A7578] mt-0.5">Vehicle TR-9021 and Driver back to Available.</p>
                </div>
                <span className="text-[9px] font-bold text-[#8A7578] uppercase whitespace-nowrap ml-2">12 min ago</span>
              </div>

              {/* Activity Step 2 */}
              <div className="relative flex items-start justify-between text-xs">
                <div className="absolute -left-6 mt-0.5 w-3.5 h-3.5 bg-[#9E003F] rounded-full border-2 border-white"></div>
                <div>
                  <h6 className="font-black text-[#2B2325]">Fuel Expense Added</h6>
                  <p className="text-[11px] text-[#8A7578] mt-0.5">$412.50 logged for TR-4402 by Driver Mika A.</p>
                </div>
                <span className="text-[9px] font-bold text-[#8A7578] uppercase whitespace-nowrap ml-2">45 min ago</span>
              </div>

              {/* Activity Step 3 */}
              <div className="relative flex items-start justify-between text-xs">
                <div className="absolute -left-6 mt-0.5 w-3.5 h-3.5 bg-[#DBCBB7] rounded-full border-2 border-white"></div>
                <div>
                  <h6 className="font-black text-[#2B2325]">New Trip Dispatched</h6>
                  <p className="text-[11px] text-[#8A7578] mt-0.5">Vehicle and Driver statuses updated to On Trip automatically.</p>
                </div>
                <span className="text-[9px] font-bold text-[#8A7578] uppercase whitespace-nowrap ml-2">2 hrs ago</span>
              </div>
            </div>
          </div>

          {/* Floating Absolute Circular Plus Action Context */}
          <button className="absolute bottom-6 right-6 h-10 w-10 bg-[#9E003F] hover:bg-[#800032] text-white rounded-full flex items-center justify-center shadow-md transition">
            <Plus className="h-5 w-5" />
          </button>
        </div>

      </div>

    </div>
  );
}