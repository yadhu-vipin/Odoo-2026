"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Fuel, 
  BarChart2, 
  DollarSign, 
  ChevronDown, 
  Truck, 
  FileSpreadsheet, 
  FileText,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function ReportsPage() {
  // State management for view switching and temporal filtering
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeFrame, setTimeFrame] = useState('Last 6 Months');

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      
      {/* Header and View Controls Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Real-time performance metrics and cross-sectional cost distribution.</p>
        </div>

        {/* View Selection Segmented Controls */}
        <div className="bg-[#FFF1F3] border border-[#EEDADF] p-1 rounded-full flex items-center self-start sm:self-auto shadow-sm">
          {['Overview', 'Vehicle ROI', 'Utilization'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-black px-4 py-1.5 rounded-full transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-[#9E003F] text-white shadow-sm' 
                  : 'text-[#5E4D50] hover:text-[#2B2325]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Control Utility Filter Bar */}
      <div className="bg-white border border-[#EEDADF] p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Matrix Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-[#EEDADF] px-3 py-1.5 rounded-xl text-xs font-bold text-[#2B2325]">
            <Calendar className="h-3.5 w-3.5 text-[#8A7578]" />
            <select 
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-[#2B2325]"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year (FY26)">This Year (FY26)</option>
            </select>
          </div>

          {/* Fleet Class Segment Context */}
          <div className="flex items-center gap-1.5 bg-white border border-[#EEDADF] px-3 py-1.5 rounded-xl text-xs font-bold text-[#2B2325]">
            <Layers className="h-3.5 w-3.5 text-[#8A7578]" />
            <select className="bg-transparent outline-none cursor-pointer text-[#2B2325]">
              <option>All Fleet Segments</option>
              <option>Heavy Duty (Class 8)</option>
              <option>Medium Duty (Box Trucks)</option>
              <option>Light Duty (Cargo Vans)</option>
            </select>
          </div>
        </div>

        <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">
          Data Engine Status: Live Sync (Active)
        </span>
      </div>

      {/* --- ROW 1: PERFORMANCE KPI CARDS DECK --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        
        {/* Card 1: Avg. Fuel Efficiency */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-[28px] shadow-sm flex flex-col justify-between min-h-[150px]">
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 bg-[#E0F2FE] text-[#0369A1] rounded-xl flex items-center justify-center">
              <Fuel className="h-4 w-4" />
            </div>
            <span className="bg-[#E4F5EB] text-[#15803D] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="h-2.5 w-2.5" /> 12%
            </span>
          </div>
          <div className="my-2">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider block">Avg. Fuel Efficiency</span>
            <h3 className="text-3xl font-black text-[#2B2325] tracking-tight mt-0.5">18.4 <span className="text-xs font-bold text-[#8A7578]">MPG</span></h3>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-[#FFF1F3] rounded-full overflow-hidden">
              <div className="bg-[#0284C7] h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-[10px] text-[#8A7578] font-bold">Fleet average up from 16.2 MPG last month</p>
          </div>
        </div>

        {/* Card 2: Fleet Utilization */}
        <div className="bg-white border border-[#EEDADF] p-5 rounded-[28px] shadow-sm flex flex-col justify-between min-h-[150px]">
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 bg-[#FFF1F3] text-[#9E003F] rounded-xl flex items-center justify-center">
              <BarChart2 className="h-4 w-4" />
            </div>
            <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingDown className="h-2.5 w-2.5" /> 3%
            </span>
          </div>
          <div className="my-2">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider block">Fleet Utilization</span>
            <h3 className="text-3xl font-black text-[#2B2325] tracking-tight mt-0.5">84.2 <span className="text-xs font-bold text-[#8A7578]">%</span></h3>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="flex gap-1 flex-1">
              <div className="h-4 bg-[#FFF1F3] rounded flex-1"></div>
              <div className="h-4 bg-[#FADEE4] rounded flex-1"></div>
              <div className="h-4 bg-[#FCE7EA] rounded flex-1"></div>
              <div className="h-4 bg-[#EEDADF] rounded flex-1"></div>
              <div className="h-4 bg-[#9E003F] rounded flex-1"></div>
              <div className="h-4 bg-[#FFF1F3] rounded flex-1"></div>
            </div>
            <p className="text-[10px] text-[#8A7578] font-bold whitespace-nowrap pl-2">Peak load on Thursday</p>
          </div>
        </div>

        {/* Card 3: Projected Vehicle ROI */}
        <div className="bg-[#2B2325] text-white p-5 rounded-[28px] shadow-sm flex flex-col justify-between min-h-[150px]">
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 bg-[#FEF3C7] text-[#B45309] rounded-xl flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-[#2B2325] fill-current" />
            </div>
            <div className="text-[10px] font-black text-[#4ADE80] bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              Target Met
            </div>
          </div>
          <div className="my-2">
            <span className="text-[10px] font-black text-[#A6999B] uppercase tracking-wider block">Projected Vehicle ROI</span>
            <h3 className="text-3xl font-black tracking-tight text-white mt-0.5">$4.2M <span className="text-xs font-bold text-[#A6999B]">FY26</span></h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-[#A6999B]">Freightliner Asset Subclass</span>
              <span className="text-[#4ADE80]">+14.2%</span>
            </div>
            <div className="w-full h-1 bg-[#EAB308] rounded-full"></div>
          </div>
        </div>

      </div>

      {/* --- ROW 2: GRAPH TIMELINE AND ACTION CARDS SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Main Cost Analysis Chart Card Container */}
        <div className="lg:col-span-8 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-md font-black text-[#2B2325]">Cost Analysis Over Time</h3>
              <p className="text-[11px] text-[#8A7578] font-medium mt-0.5">Operating expenditures vs aggregate preventive maintenance investment.</p>
            </div>
            <span className="text-[10px] font-black bg-[#FFF1F3] text-[#9E003F] px-2.5 py-1 rounded-lg border border-[#EEDADF]">
              {timeFrame}
            </span>
          </div>

          {/* High Fidelity Native Line Chart SVG Render Layer */}
          <div className="relative w-full h-52 my-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#FDF8F8" strokeWidth="2" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#FDF8F8" strokeWidth="2" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#FDF8F8" strokeWidth="2" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#FDF8F8" strokeWidth="2" />

              {/* Shaded Area Region Gradient Fill underneath Operational Line */}
              <path 
                d="M 10 160 L 100 145 L 180 155 L 270 120 L 360 140 L 450 110 L 590 80 L 590 190 L 10 190 Z" 
                fill="#FFF1F3" 
                opacity="0.6"
              />

              {/* Baseline Trend 2: Maintenance Investment (Dotted Blue Line) */}
              <path 
                d="M 10 170 Q 100 165, 185 162 T 360 155 T 590 145" 
                fill="none" 
                stroke="#0284C7" 
                strokeWidth="2.5" 
                strokeDasharray="4,4" 
              />

              {/* Trend Line 1: Operational Costs (Continuous Crimson Line) */}
              <path 
                d="M 10 160 L 100 145 L 180 155 L 270 120 L 360 140 L 450 110 L 590 80" 
                fill="none" 
                stroke="#9E003F" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Accent Vertex Node Plots */}
              <circle cx="270" cy="120" r="4" fill="#9E003F" />
              <circle cx="450" cy="110" r="4" fill="#9E003F" />
              <circle cx="590" cy="80" r="4" fill="#9E003F" />
            </svg>
          </div>

          {/* Graph Legend Base Row */}
          <div className="flex items-center gap-4 text-[10px] font-black text-[#5E4D50] border-t border-[#FDF8F8] pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9E003F]"></span>
              <span>OPERATIONAL COSTS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
              <span>MAINTENANCE BASELINE</span>
            </div>
          </div>
        </div>

        {/* Right Action and Aggregates Context Bar Stack */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-5">
          
          {/* Sub Panel 1: Model Comparison Registry Stack */}
          <div className="bg-[#FFF1F3]/40 border border-[#EEDADF] p-5 rounded-[32px] shadow-sm flex-1 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider block mb-3">Model Lifecycle Efficiency</span>
              <div className="space-y-2">
                
                {/* Row 1 */}
                <div className="bg-white border border-[#EEDADF]/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-[#FFF1F3] border border-[#EEDADF] flex items-center justify-center text-[#9E003F]">
                      <Truck className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h5 className="font-black text-[#2B2325]">Hino L6</h5>
                      <p className="text-[10px] text-[#8A7578] mt-0.5">Box Truck Class</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#2B2325]">$0.42/mi</p>
                    <span className="text-[10px] font-bold text-[#15803D] block mt-0.5">-2% efficiency</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="bg-white border border-[#EEDADF]/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0369A1] border border-blue-100 flex items-center justify-center">
                      <Truck className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h5 className="font-black text-[#2B2325]">Ford F-550</h5>
                      <p className="text-[10px] text-[#8A7578] mt-0.5">Utility Class</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#2B2325]">$0.58/mi</p>
                    <span className="text-[10px] font-bold text-[#991B1B] block mt-0.5">+5% cost leak</span>
                  </div>
                </div>

              </div>
            </div>

            <button className="w-full text-center border border-[#9E003F] text-[#9E003F] font-black text-xs py-2.5 rounded-xl hover:bg-[#9E003F] hover:text-white transition flex items-center justify-center gap-1.5">
              <span>Generate Target Report Matrix</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Sub Panel 2: Export Processing Actions Block */}
          <div className="bg-[#FFF1F3]/40 border border-[#EEDADF] p-5 rounded-[32px] shadow-sm space-y-3">
            <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider block">Pipeline Dispatch Exports</span>
            
            {/* Export Action Card 1 */}
            <div className="bg-white border border-[#EEDADF]/60 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/80 transition group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFF1F3] text-[#9E003F] border border-[#EEDADF] rounded-xl">
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <span className="text-xs font-black text-[#2B2325]">Export Lifecycle Ledger (.CSV)</span>
              </div>
              <Download className="h-4 w-4 text-[#8A7578] group-hover:text-[#2B2325] transition" />
            </div>

            {/* Export Action Card 2 */}
            <div className="bg-white border border-[#EEDADF]/60 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/80 transition group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E0F2FE] text-[#0369A1] border border-blue-100 rounded-xl">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-black text-[#2B2325]">Compile Audited PDF Executive Summary</span>
              </div>
              <Download className="h-4 w-4 text-[#8A7578] group-hover:text-[#2B2325] transition" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}