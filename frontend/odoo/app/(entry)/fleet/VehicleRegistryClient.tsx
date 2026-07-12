'use client';

import React, { useState } from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Truck, Plus, Wrench, ShieldCheck, LayoutGrid, Activity, X } from 'lucide-react';

/* ---------- Layout UI Sub-Primitives ---------- */
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A7578]">{subtitle}</p>
        <h1 className="text-2xl md:text-3xl font-black text-[#2B2325] tracking-tight mt-1">{title}</h1>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function KpiCard({ label, value, icon: Icon, delta, deltaUp, hint }: { label: string; value: string; icon: LucideIcon; delta?: string; deltaUp?: boolean; hint?: string }) {
  return (
    <div className="bg-white border border-[#EEDADF] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#8A7578] uppercase tracking-wide">{label}</span>
        <div className="h-8 w-8 rounded-xl bg-[#FFF1F3] flex items-center justify-center">
          <Icon className="h-4 w-4 text-[#9E003F]" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl md:text-3xl font-black text-[#2B2325] tracking-tight">{value}</span>
        {delta && (
          <span className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${deltaUp ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FADEE4] text-[#9E003F]'}`}>
            {deltaUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] font-medium text-[#8A7578]">{hint}</p>}
    </div>
  );
}

export function FilterPill({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-bold px-4 py-1.5 rounded-full border transition ${active ? 'bg-[#9E003F] border-[#9E003F] text-white' : 'bg-white border-[#EEDADF] text-[#5E4D50] hover:bg-[#FCE7EA]'}`}
    >
      {label}
    </button>
  );
}

interface Vehicle {
  reg: string;
  name: string;
  type: string;
  cap: string;
  odo: string;
  cost: string;
  status: string;
}

/* ---------- Main Interactive View Implementation ---------- */
export function VehicleRegistryClient({ initialVehicles, userTag }: { initialVehicles: Vehicle[]; userTag: number }) {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(initialVehicles);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Field Tracking State
  const [formData, setFormData] = useState({
    reg: '',
    name: '',
    type: 'Van',
    cap: '',
    odo: '',
    cost: '$0',
    status: 'Available'
  });

  const filters = ['All', 'Available', 'On Trip', 'In Shop', 'Retired'];

  const filteredVehicles = vehiclesList.filter(v => {
    if (activeFilter === 'All') return true;
    return v.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const totalCount = vehiclesList.length;
  const availableCount = vehiclesList.filter(v => v.status === 'Available').length;
  const onTripCount = vehiclesList.filter(v => v.status === 'On Trip').length;
  const inShopCount = vehiclesList.filter(v => v.status === 'In Shop').length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reg || !formData.name) return;

    const newVehicle: Vehicle = {
      reg: formData.reg,
      name: formData.name,
      type: formData.type,
      cap: formData.cap || 'N/A',
      odo: formData.odo ? `${formData.odo} km` : '0 km',
      cost: formData.cost.startsWith('$') ? formData.cost : `$${formData.cost}`,
      status: formData.status
    };

    setVehiclesList([newVehicle, ...vehiclesList]);
    setIsModalOpen(false);
    setFormData({ reg: '', name: '', type: 'Van', cap: '', odo: '', cost: '$0', status: 'Available' });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 relative">
      <PageHeader
        title="Vehicle Registry"
        subtitle="Fleet Architecture"
        actions={
          userTag === 1 && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#9E003F] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#800032] transition"
            >
              <Plus className="h-4 w-4" /> Add Vehicle
            </button>
          )
        }
      />

      {/* Structured Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Registered Assets" value={totalCount.toString()} icon={Truck} delta="Live" deltaUp />
        <KpiCard label="Active Deployments" value={onTripCount.toString()} icon={Activity} />
        <KpiCard label="Available Nodes" value={availableCount.toString()} icon={ShieldCheck} />
        <KpiCard label="In Maintenance" value={inShopCount.toString()} icon={Wrench} hint="Requires hardware cycle" />
      </div>

      {/* Control View Filtering Row */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => {
              setActiveFilter(filter);
              setSelectedVehicle(null);
            }}
          />
        ))}
      </div>

      {/* Split Screen Master-Detail Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white border border-[#EEDADF] rounded-[24px] p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-black text-[#2B2325] tracking-tight">Assets Available ({filteredVehicles.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left border-collapse text-xs">
              <thead>
                <tr className="text-[10px] font-black text-[#8A7578] uppercase border-b border-[#EEDADF]">
                  <th className="py-3 px-2">Registration No.</th>
                  <th className="py-3 px-2">Model</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Capacity</th>
                  <th className="py-3 px-2">Odometer</th>
                  {userTag === 4 && <th className="py-3 px-2">Acquisition Cost</th>}
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDF8F8] font-bold text-[#2B2325]">
                {filteredVehicles.map((v, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedVehicle(v)}
                    className={`hover:bg-[#FFF1F3]/40 cursor-pointer transition ${selectedVehicle?.reg === v.reg ? 'bg-[#FFF1F3]/60' : ''}`}
                  >
                    <td className="py-4 px-2 font-mono text-[#9E003F]">{v.reg}</td>
                    <td className="py-4 px-2">{v.name}</td>
                    <td className="py-4 px-2">
                      <span className="bg-[#FFF1F3] px-2 py-0.5 rounded text-[10px] font-bold text-[#9E003F]">{v.type}</span>
                    </td>
                    <td className="py-4 px-2 text-[#5E4D50]">{v.cap}</td>
                    <td className="py-4 px-2 text-[#5E4D50]">{v.odo}</td>
                    {userTag === 4 && <td className="py-4 px-2 font-mono">{v.cost}</td>}
                    <td className="py-4 px-2 text-right">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        v.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : v.status === 'On Trip' ? 'bg-[#FADEE4] text-[#9E003F]' : 'bg-amber-50 text-amber-700'
                      }`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Detail Inspector Side Panel */}
        <div className="bg-white border border-[#EEDADF] rounded-[24px] p-6 shadow-sm min-h-[320px] flex flex-col justify-between sticky top-6">
          {selectedVehicle ? (
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#8A7578] uppercase">Asset Telemetry Profile</span>
                <h2 className="text-xl font-black text-[#2B2325] tracking-tight mt-0.5">{selectedVehicle.name}</h2>
                <p className="font-mono text-sm text-[#9E003F] mt-1">{selectedVehicle.reg}</p>
              </div>

              <div className="border-t border-b border-[#FDF8F8] py-4 space-y-3 text-xs font-bold">
                <div className="flex justify-between"><span className="text-[#8A7578]">Classification</span><span>{selectedVehicle.type}</span></div>
                <div className="flex justify-between"><span className="text-[#8A7578]">Payload limit</span><span>{selectedVehicle.cap}</span></div>
                <div className="flex justify-between"><span className="text-[#8A7578]">Odometer Pathing</span><span>{selectedVehicle.odo}</span></div>
                {userTag === 4 && <div className="flex justify-between"><span className="text-[#8A7578]">Asset Cost</span><span className="font-mono">{selectedVehicle.cost}</span></div>}
              </div>

              <button className="w-full py-2.5 bg-[#FFF1F3] hover:bg-[#FCE7EA] text-[#9E003F] text-xs font-bold rounded-xl transition">
                Request Maintenance Cycle
              </button>
            </div>
          ) : (
            <div className="my-auto text-center py-12 flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#FFF1F3] flex items-center justify-center text-[#9E003F]">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#2B2325] tracking-tight">Select an asset node</h4>
                <p className="text-gray-400 text-xs mt-1 max-w-[200px] mx-auto font-medium leading-relaxed">
                  Click any platform asset row to inspect line analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inline Add Asset Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2B2325]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white border border-[#EEDADF] rounded-[28px] max-w-md w-full p-6 shadow-xl relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#8A7578] uppercase">Infrastructure Provision</span>
                <h3 className="text-lg font-black text-[#2B2325] tracking-tight mt-0.5">Register New Asset</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs font-bold text-gray-700">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Registration No *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ADU-0000"
                    value={formData.reg}
                    onChange={e => setFormData({...formData, reg: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Model Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. TRUCK-02"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Asset Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]"
                  >
                    <option>Van</option>
                    <option>Truck</option>
                    <option>Trailer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Max Capacity</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2 Ton" 
                    value={formData.cap}
                    onChange={e => setFormData({...formData, cap: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Odometer Reading (km)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={formData.odo}
                    onChange={e => setFormData({...formData, odo: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-[#8A7578]">Acquisition Cost</label>
                  <input 
                    type="text" 
                    placeholder="$0" 
                    value={formData.cost}
                    onChange={e => setFormData({...formData, cost: e.target.value})}
                    className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#8A7578]">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#9E003F]"
                >
                  <option>Available</option>
                  <option>On Trip</option>
                  <option>In Shop</option>
                  <option>Retired</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#9E003F] hover:bg-[#800032] text-white rounded-xl transition font-bold shadow-sm"
                >
                  Commit Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}