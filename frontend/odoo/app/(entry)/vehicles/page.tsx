"use client";

import React, { useState } from 'react';
import { 
  Download, 
  Truck, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  ArrowUpDown, 
  ShieldAlert, 
  Plus,
  Wrench,
  MoreVertical
} from 'lucide-react';

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const vehicles = [
    { reg: "TR-8821-XP", model: "Kenworth T680 Next Gen", vin: "1XK2D3E4F5G6H7J8K", type: "Class 8 Truck", cap: "45,000 lbs", odo: "142,502 mi", cost: "$182,400", status: "AVAILABLE", color: "bg-[#E4F5EB] text-[#15803D]" },
    { reg: "BT-4402-LV", model: "Ford Transit E-Hybrid", vin: "1FT3W3D7X9B2C4N6M", type: "Cargo Van", cap: "3,500 lbs", odo: "28,914 mi", cost: "$42,500", status: "ON TRIP", color: "bg-[#E0F2FE] text-[#0369A1]" },
    { reg: "XP-9912-SA", model: "Freightliner M2 106", vin: "2FU1H3K5L7P9Q2R4S", type: "Box Truck", cap: "26,000 lbs", odo: "82,110 mi", cost: "$98,750", status: "IN SHOP", color: "bg-[#FEF3C7] text-[#B45309]" },
    { reg: "LD-0115-QM", model: "Volvo VNL 860", vin: "4V4N5W6Y7Z8B9C0D1", type: "Sleeper Cab", cap: "52,000 lbs", odo: "492,019 mi", cost: "$215,000", status: "RETIRED", color: "bg-[#FEE2E2] text-[#991B1B]" },
    { reg: "MS-7711-BR", model: "Mercedes Sprinter", vin: "7WD2E3R4T5Y6U7I8O", type: "Passenger Van", cap: "15 Seats", odo: "12,440 mi", cost: "$64,200", status: "AVAILABLE", color: "bg-[#E4F5EB] text-[#15803D]" }
  ];

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight">Vehicle Registry</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">Master ledger tracking unique IDs, physical load limits, and validation parameters.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="bg-white border border-[#EEDADF] text-xs font-bold px-4 py-2 rounded-xl shadow-sm text-[#2B2325] hover:bg-[#FDF8F8] flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-[#800032] flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* KPI Cards Aggregates Deck */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm min-h-[120px] flex flex-col justify-between">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Total Fleet Assets</span>
          <h3 className="text-3xl font-black text-[#2B2325] mt-2">1,284</h3>
        </div>

        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm min-h-[120px] flex flex-col justify-between">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Available for Dispatch</span>
          <h3 className="text-3xl font-black text-[#15803D] mt-2">1,181</h3>
        </div>

        <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm min-h-[120px] flex flex-col justify-between">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Active In Shop</span>
          <h3 className="text-3xl font-black text-[#B45309] mt-2">42</h3>
        </div>

        <div className="bg-[#FFF1F3] border border-[#EEDADF] p-5 rounded-3xl shadow-sm min-h-[120px] flex flex-col justify-between">
          <span className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider">Retired Vehicles</span>
          <h3 className="text-3xl font-black text-[#9E003F] mt-2">08</h3>
        </div>
      </div>

      {/* Main Filtering & Data Architecture Grid */}
      <div className="bg-white border border-[#EEDADF] rounded-[32px] overflow-hidden shadow-sm">
        
        {/* Controls Layout Block: Search, Filter & Sort */}
        <div className="p-5 border-b border-[#FDF8F8] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-b from-white to-[#FFF1F3]/10">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            
            {/* Contextual Live Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8A7578]" />
              <input 
                type="text" 
                placeholder="Search Reg, Model, or VIN..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#EEDADF] pl-9 pr-4 py-1.5 rounded-xl text-xs font-bold text-[#2B2325] placeholder-[#8A7578] outline-none focus:border-[#9E003F]"
              />
            </div>

            {/* Type Pill Matrix */}
            <div className="flex bg-[#FFF1F3] border border-[#EEDADF] p-1 rounded-full">
              <button 
                onClick={() => setTypeFilter('All')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${typeFilter === 'All' ? 'bg-[#9E003F] text-white shadow-sm' : 'text-[#5E4D50]'}`}
              >
                All Type
              </button>
              <button 
                onClick={() => setTypeFilter('Truck')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${typeFilter === 'Truck' ? 'bg-[#9E003F] text-white shadow-sm' : 'text-[#5E4D50]'}`}
              >
                Trucks
              </button>
              <button 
                onClick={() => setTypeFilter('Van')}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${typeFilter === 'Van' ? 'bg-[#9E003F] text-white shadow-sm' : 'text-[#5E4D50]'}`}
              >
                Vans
              </button>
            </div>

            {/* Status Dropdown */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#EEDADF] text-xs font-bold px-3 py-1.5 rounded-xl text-[#2B2325] outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="AVAILABLE">Available</option>
              <option value="ON TRIP">On Trip</option>
              <option value="IN SHOP">In Shop</option>
              <option value="RETIRED">Retired</option>
            </select>

            {/* Sort Engine Dropdown Trigger */}
            <div className="flex items-center gap-1.5 bg-white border border-[#EEDADF] px-3 py-1.5 rounded-xl text-xs font-bold text-[#2B2325]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#8A7578]" />
              <select className="bg-transparent outline-none cursor-pointer">
                <option>Sort By: Registration</option>
                <option>Sort By: Odometer</option>
                <option>Sort By: Cost</option>
              </select>
            </div>
          </div>

          {/* Pagination Context Row */}
          <div className="flex items-center gap-3 justify-between lg:justify-end border-t lg:border-t-0 border-[#FDF8F8] pt-3 lg:pt-0">
            <span className="text-[11px] font-semibold text-[#8A7578]">Showing 1-5 of 1,284 assets</span>
            <div className="flex gap-1">
              <button className="p-1.5 border border-[#EEDADF] bg-white rounded-lg text-[#8A7578] hover:bg-[#FDF8F8]"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 border border-[#EEDADF] bg-white rounded-lg text-[#8A7578] hover:bg-[#FDF8F8]"><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Data View Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEDADF] bg-[#FFF1F3]/20 text-[10px] font-black text-[#8A7578] tracking-wider uppercase">
                <th className="py-4 px-6">Registration (Unique)</th>
                <th className="py-4 px-4">Vehicle Model / VIN</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Max Weight Capacity</th>
                <th className="py-4 px-4">Odometer</th>
                <th className="py-4 px-4">Acquisition Cost</th>
                <th className="py-4 px-6 text-right">Status / Dispatch Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF8F8] text-xs font-bold text-[#2B2325]">
              {vehicles.map((v, i) => {
                const isBlockedFromDispatch = v.status === "IN SHOP" || v.status === "RETIRED";
                return (
                  <tr key={i} className="hover:bg-[#FFF1F3]/5 transition">
                    <td className="py-4 px-6 font-black text-[#9E003F]">{v.reg}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#FFF1F3] border border-[#EEDADF] flex items-center justify-center text-[#9E003F]">
                          <Truck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-black text-[#2B2325]">{v.model}</p>
                          <p className="text-[10px] font-semibold text-[#8A7578] uppercase mt-0.5 tracking-tight">VIN: {v.vin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#5E4D50] font-semibold">{v.type}</td>
                    <td className="py-4 px-4 text-[#5E4D50] font-semibold">{v.cap}</td>
                    <td className="py-4 px-4 text-[#2B2325]">{v.odo}</td>
                    <td className="py-4 px-4 font-black">{v.cost}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {isBlockedFromDispatch && (
                          <div className="flex items-center gap-1 text-[10px] text-[#B45309] font-black bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#FDE3B7]" title="Validation Requirement: Retired or In Shop assets are locked out of dispatch selectors.">
                            <ShieldAlert className="h-3 w-3" />
                            <span>BLOCKED FROM TRIP</span>
                          </div>
                        )}
                        <span className={`text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full inline-block ${v.color}`}>
                          {v.status}
                        </span>
                        <button className="text-[#8A7578] hover:text-[#2B2325] p-1 rounded-lg">
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
    </div>
  );
}