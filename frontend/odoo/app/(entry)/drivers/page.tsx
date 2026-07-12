"use client";

import React, { useState } from 'react';
import { 
  Download, 
  Plus, 
  MoreVertical, 
  ShieldAlert, 
  Search, 
  Filter, 
  CalendarClock, 
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function DriversPage() {
  // State management for driver ledger search and filter pipeline
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const drivers = [
    { name: "Marcus Chen", id: "#TR-9821", license: "TX-22910-91", cat: "Class A CDL", expiry: "Oct 12, 2026", score: 98, status: "ON TRIP", dot: "bg-blue-500", scoreColor: "bg-[#15803D]" },
    { name: "Sarah Jenkins", id: "#TR-4412", license: "NY-55102-00", cat: "Heavy Goods", expiry: "Sep 05, 2026", expiryAlert: true, score: 82, status: "OFF DUTY", dot: "bg-gray-400", scoreColor: "bg-amber-600" },
    { name: "David Miller", id: "#TR-1198", license: "CA-90210-44", cat: "Class A CDL", expiry: "Dec 22, 2026", score: 95, status: "AVAILABLE", dot: "bg-green-500", scoreColor: "bg-[#15803D]" },
    { name: "Amit Patel", id: "#TR-6772", license: "IL-33829-11", cat: "Hazardous Mats", expiry: "Jan 14, 2027", score: 64, status: "SUSPENDED", dot: "bg-red-500", scoreColor: "bg-red-600" }
  ];

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      
      {/* Header Block Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Driver Management</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Oversee operator safety scores, medical validation deadlines, and live duty profiles.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="bg-white border border-[#EEDADF] text-xs font-bold px-3 py-2 rounded-xl text-[#2B2325] flex items-center gap-1.5 shadow-sm">
            <Download className="h-3.5 w-3.5" /> Export Data
          </button>
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032]">
            <Plus className="h-3.5 w-3.5" /> Add New Driver
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[115px]">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Total Operators</span>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">142</h3>
        </div>
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[115px]">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Active On-Duty</span>
          <h3 className="text-3xl font-black text-[#0369A1] mt-2">89</h3>
        </div>
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[115px]">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Avg Safety Score</span>
          <h3 className="text-3xl font-black text-[#15803D] mt-2">94.2%</h3>
        </div>
        <div className="bg-[#FFF1F3] border border-[#EEDADF] p-5 rounded-3xl shadow-sm flex flex-col justify-between min-h-[115px]">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Compliance Holds</span>
          <h3 className="text-3xl font-black text-[#9E003F] mt-2">12</h3>
        </div>
      </div>

      {/* Main Interactive Fleet Roster Stack */}
      <div className="bg-white border border-[#EEDADF] rounded-[32px] overflow-hidden shadow-sm">
        
        {/* Dynamic Controls Sub-Header Panel */}
        <div className="p-5 border-b border-[#FDF8F8] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-b from-white to-[#FFF1F3]/10">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            
            {/* Real-time Operator Search Field */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8A7578]" />
              <input 
                type="text" 
                placeholder="Search Name, Operator ID, License..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#EEDADF] pl-9 pr-4 py-1.5 rounded-xl text-xs font-bold text-[#2B2325] placeholder-[#8A7578] outline-none focus:border-[#9E003F]"
              />
            </div>

            {/* Interactive Dropdown Status Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-[#EEDADF] px-3 py-1.5 rounded-xl text-xs font-bold text-[#2B2325]">
              <Filter className="h-3.5 w-3.5 text-[#8A7578]" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[#2B2325]"
              >
                <option value="All">All Operator Statuses</option>
                <option value="AVAILABLE">Available</option>
                <option value="ON TRIP">On Trip</option>
                <option value="OFF DUTY">Off Duty</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>

          {/* Simple Context Pagination Controls */}
          <div className="flex items-center gap-3 justify-between lg:justify-end border-t lg:border-t-0 border-[#FDF8F8] pt-3 lg:pt-0">
            <span className="text-[11px] font-semibold text-[#8A7578]">Showing 1-4 of 142 operators</span>
            <div className="flex gap-1">
              <button className="p-1.5 border border-[#EEDADF] bg-white rounded-lg text-[#8A7578] hover:bg-[#FDF8F8]"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 border border-[#EEDADF] bg-white rounded-lg text-[#8A7578] hover:bg-[#FDF8F8]"><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Data View Table Element */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-[#8A7578] tracking-wider uppercase border-b border-[#EEDADF] bg-[#FFF1F3]/20 py-4">
                <th className="py-4 px-6">Driver Identity</th>
                <th className="py-4 px-4">License Reference</th>
                <th className="py-4 px-4">Endorsement Class</th>
                <th className="py-4 px-4">Validation Expiry</th>
                <th className="py-4 px-4 w-52">Safety Record Matrix</th>
                <th className="py-4 px-6 text-right">Status Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF8F8] text-xs font-bold text-[#2B2325]">
              {drivers.map((d, i) => {
                const isSafetyHold = d.status === "SUSPENDED" || d.score < 70;
                return (
                  <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EEDADF] text-[#9E003F] font-black text-[11px] flex items-center justify-center overflow-hidden border border-[#EEDADF]">
                          {d.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-black text-[#2B2325]">{d.name}</p>
                          <p className="text-[10px] font-semibold text-[#8A7578] mt-0.5">System ID: {d.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#5E4D50] font-mono tracking-tight">{d.license}</td>
                    <td className="py-4 px-4">
                      <span className="bg-[#FFF1F3] text-[#9E003F] text-[10px] font-black px-2 py-0.5 rounded border border-[#EEDADF]">{d.cat}</span>
                    </td>
                    <td className={`py-4 px-4 ${d.expiryAlert ? 'text-[#9E003F] font-black' : 'text-[#5E4D50] font-semibold'}`}>
                      <div className="flex items-center gap-1">
                        {d.expiryAlert && <CalendarClock className="h-3.5 w-3.5 text-[#9E003F]" />}
                        <span>{d.expiry}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-28 h-1.5 bg-[#FFF1F3] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${d.scoreColor}`} style={{ width: `${d.score}%` }}></div>
                        </div>
                        <span className="text-[11px] font-black text-[#2B2325]">{d.score}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {isSafetyHold && (
                          <div className="flex items-center gap-1 text-[9px] text-[#991B1B] font-black bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FCA5A5]" title="Dispatch Restricted: Safety limits violation or manual system block.">
                            <ShieldAlert className="h-3 w-3" />
                            <span>DISPATCH LOCKED</span>
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-wide bg-[#FDF8F8] border border-[#EEDADF] px-2.5 py-1 rounded-full">
                          <span className={`w-1.5 h-1.5 rounded-full ${d.dot}`}></span> {d.status}
                        </span>
                        <button className="text-[#8A7578] hover:text-[#2B2325]">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lower Dashboard Split: Visual Safety Trends & Compliance Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Weekly Safety Score Bar Chart Layer */}
        <div className="lg:col-span-8 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-md font-black text-[#2B2325]">Safety Score Performance Trends</h3>
              <p className="text-[11px] text-[#8A7578] font-semibold mt-0.5">Aggregate rolling performance across all current logistics cycles.</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-[#9E003F] bg-[#FFF1F3] border border-[#EEDADF] px-2 py-1 rounded-lg">
              <Award className="h-3.5 w-3.5" />
              <span>94.2% Aggregate Target</span>
            </div>
          </div>
          
          <div className="grid grid-cols-8 gap-3 items-end h-44 pt-4 px-2 border-b border-[#FDF8F8]">
            {[35, 45, 30, 40, 50, 65, 85, 94].map((h, i) => (
              <div key={i} className="bg-[#FFF1F3] hover:bg-[#FCE7EA] rounded-t-md transition-all relative flex items-end overflow-hidden group" style={{ height: `${h}%` }}>
                {i === 7 ? (
                  <div className="w-full h-full bg-[#9E003F]"></div>
                ) : (
                  <div className="w-full h-1 bg-[#EEDADF] group-hover:bg-[#9E003F]/50 transition-all"></div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 text-center text-[10px] font-black text-[#8A7578] pt-2">
            <span>WEEK 1</span><span>WEEK 2</span><span>WEEK 3</span><span>WEEK 4</span>
          </div>
        </div>

        {/* Actionable Urgent Compliance Auditing Block */}
        <div className="lg:col-span-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#FDF8F8]">
              <ShieldAlert className="h-4 w-4 text-[#9E003F]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-[#2B2325]">Active Validation Audit</h4>
            </div>
            <p className="text-[11px] font-bold text-[#5E4D50]">Critical items requiring automated/manual verification pipelines.</p>

            <div className="space-y-2">
              <div className="border-l-4 border-l-amber-500 bg-[#FFF1F3] p-3 rounded-r-xl border border-[#EEDADF]">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h5 className="font-black text-[#2B2325]">James O'Brien</h5>
                    <p className="text-[10px] text-[#8A7578] mt-0.5">DOT Medical Certification</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-amber-600 block">3 Days Left</span>
                    <button className="text-[10px] font-black text-[#9E003F] underline mt-1 block hover:text-[#800032]">RENEW</button>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-l-[#9E003F] bg-[#FFF1F3] p-3 rounded-r-xl border border-[#EEDADF]">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <h5 className="font-black text-[#2B2325]">Sarah Jenkins</h5>
                    <p className="text-[10px] text-[#8A7578] mt-0.5">Commercial Endorsement</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-[#9E003F] block">9 Days Left</span>
                    <button className="text-[10px] font-black text-[#2B2325] underline mt-1 block">REVIEW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="text-xs font-bold text-[#9E003F] hover:text-[#800032] flex items-center justify-center gap-1 mt-4 pt-2 border-t border-[#FDF8F8] w-full text-center transition">
            View All Pending Audits &rarr;
          </button>
        </div>

      </div>

    </div>
  );
}