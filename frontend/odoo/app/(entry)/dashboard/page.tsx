import React from 'react';
import { headers, cookies } from 'next/headers';
import { 
  Truck, Users, ShieldAlert, DollarSign, Wrench, 
  TrendingUp, MapPin, Activity, Calendar, AlertTriangle, 
  CheckCircle2, Gauge, Scale, Fuel, BarChart3
} from 'lucide-react';

export default async function DashboardPage() {
  // Read role context instantly from middleware header or fallback to cookie store
  const headerList = await headers();
  const cookieStore = await cookies();
  
  const headerTag = headerList.get('x-user-tag');
  const cookieTag = cookieStore.get('user_tag')?.value;
  const userTag = parseInt(headerTag || cookieTag || '1', 10);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      
      {/* Dynamic Subheader Based on Role Matrix */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] shadow-sm">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#9E003F] uppercase bg-[#FFF1F3] px-2.5 py-1 rounded-md border border-[#EEDADF]">
            {userTag === 1 && "Role Context: Fleet Manager"}
            {userTag === 2 && "Role Context: Operator / Dispatcher"}
            {userTag === 3 && "Role Context: Safety & Compliance Officer"}
            {userTag === 4 && "Role Context: Financial Analyst"}
          </span>
          <h1 className="text-3xl font-black text-[#2B2325] tracking-tight mt-2">Central Control Center</h1>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">
            {userTag === 1 && "Manage global lifecycle tracking, asset health vectors, and yard optimization schedules."}
            {userTag === 2 && "Execute active payload verification sequences, match operators, and initiate road dispatches."}
            {userTag === 3 && "Audit operator behavior compliance indexes, medical flags, and licensing hold limits."}
            {userTag === 4 && "Inspect rolling operating expenditures, fuel log margin curves, and system ROI models."}
          </p>
        </div>
        <div className="text-xs font-bold text-[#5E4D50] bg-[#FDF8F8] border border-[#EEDADF] px-4 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <Calendar className="h-4 w-4 text-[#9E003F]" />
          <span>Operational Cycle: Jul 2026</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. DYNAMIC KPI BLOCKS (NO INTER-ROLE LAYOUT OVERLAPS)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {userTag === 1 && (
          <>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Total Assets Logged</span><h3 className="text-3xl font-black text-[#2B2325] mt-2">1,240</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Global Fleet Uptime</span><h3 className="text-3xl font-black text-[#15803D] mt-2">94.8%</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Active Garage Backlog</span><h3 className="text-3xl font-black text-amber-600 mt-2">14 Units</h3></div>
            <div className="bg-[#FFF1F3] border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Decommission Cycles</span><h3 className="text-3xl font-black text-[#9E003F] mt-2">3 Pending</h3></div>
          </>
        )}

        {userTag === 2 && (
          <>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Available Vectors</span><h3 className="text-3xl font-black text-green-700 mt-2">42 Units</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Active Transits</span><h3 className="text-3xl font-black text-[#0369A1] mt-2">89 Trips</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Unassigned Payloads</span><h3 className="text-3xl font-black text-amber-600 mt-2">7 Cargoes</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Completed (Today)</span><h3 className="text-3xl font-black text-[#2B2325] mt-2">31</h3></div>
          </>
        )}

        {userTag === 3 && (
          <>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Fleet Safety Score</span><h3 className="text-3xl font-black text-[#15803D] mt-2">94.2%</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Critical Audit Holds</span><h3 className="text-3xl font-black text-[#9E003F] mt-2">5 Suspended</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">License Renewals (15d)</span><h3 className="text-3xl font-black text-amber-600 mt-2">12 Alerts</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">HOS Violations</span><h3 className="text-3xl font-black text-[#2B2325] mt-2">0</h3></div>
          </>
        )}

        {userTag === 4 && (
          <>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Rolling OpEx Net</span><h3 className="text-3xl font-black text-[#2B2325] mt-2">$421,900</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Fuel Burn Expenditures</span><h3 className="text-3xl font-black text-[#0369A1] mt-2">$184,230</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#8A7578] uppercase">Maintenance Overhead</span><h3 className="text-3xl font-black text-[#9E003F] mt-2">$54,100</h3></div>
            <div className="bg-white border border-[#EEDADF] p-5 rounded-3xl shadow-sm"><span className="text-[10px] font-black text-[#15803D] uppercase">Platform True ROI</span><h3 className="text-3xl font-black text-[#15803D] mt-2">+18.4%</h3></div>
          </>
        )}

      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HUB DATA SPLIT (ROLE SPECIFIC INTERFACES)         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {userTag === 1 && (
          <>
            <div className="lg:col-span-8 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#FDF8F8] pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#9E003F]" />
                  <h3 className="font-black text-[#2B2325] text-base">Global Asset Telematics Routing Matrix</h3>
                </div>
                <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">LIVE STREAMS</span>
              </div>
              <div className="p-12 border-2 border-dashed border-[#EEDADF] bg-[#FFF1F3]/10 rounded-2xl flex flex-col items-center text-center">
                <MapPin className="h-8 w-8 text-[#8A7578] mb-2 animate-pulse" />
                <p className="text-xs font-black text-[#2B2325]">Active Yard Location & Depot Allocation Matrix</p>
                <p className="text-[10px] text-[#8A7578] font-semibold mt-1">Simulated mapping data streaming across active terminals...</p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-2">
                  <Wrench className="h-4 w-4 text-[#9E003F]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#2B2325]">Asset Lifecycle Evaluation</h4>
                </div>
                <div className="bg-[#FFF1F3] p-3 rounded-xl border border-[#EEDADF] text-xs space-y-2">
                  <div className="flex justify-between font-black text-[#2B2325]"><span>Van-05 Core TCO:</span><span className="font-mono">$24,500</span></div>
                  <div className="w-full bg-white h-1 rounded-full overflow-hidden">
                    <div className="bg-[#9E003F] h-full w-3/4"></div>
                  </div>
                  <p className="text-[9px] font-semibold text-[#8A7578]">Depreciation index within planned baseline margins.</p>
                </div>
              </div>
              <button className="w-full py-2 bg-[#9E003F] text-white text-xs font-black rounded-xl hover:bg-[#800032] transition">
                Configure Maintenance Protocols
              </button>
            </div>
          </>
        )}

        {userTag === 2 && (
          <>
            <div className="lg:col-span-6 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-3">
                <Scale className="h-5 w-5 text-[#9E003F]" />
                <h3 className="font-black text-[#2B2325] text-base">Step 3 & 4: Payload Weight Discretion Engine</h3>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900 mb-2">
                Operational Dispatch Engine Active (Server Synced)
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#8A7578] uppercase block">Target Cargo Reference Weight Limit</label>
                <div className="w-full bg-gray-50 border border-[#EEDADF] px-4 py-2.5 rounded-xl text-xs font-bold text-[#2B2325]">
                  Max Allowed: 500 kg (Van-05 Baseline)
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#FDF8F8] pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#0369A1]" />
                  <h3 className="font-black text-[#2B2325] text-base">Active Matching Terminal Pool</h3>
                </div>
              </div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                <div className="border border-[#EEDADF] p-3 rounded-xl flex justify-between items-center bg-[#FFF1F3]/20">
                  <div><p className="text-xs font-black text-[#2B2325]">Van-05 Allocation</p><p className="text-[10px] text-[#8A7578] font-semibold">Available Capacity: 500 kg</p></div>
                  <span className="text-[9px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">READY FOR DEPLOYMENT</span>
                </div>
                <div className="border border-[#EEDADF] p-3 rounded-xl flex justify-between items-center bg-gray-50 opacity-60">
                  <div><p className="text-xs font-black text-gray-500">TR-8821-XP Allocation</p><p className="text-[10px] text-gray-400 font-semibold">Maintenance Hold</p></div>
                  <span className="text-[9px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">IN SHOP (HIDDEN)</span>
                </div>
              </div>
            </div>
          </>
        )}

        {userTag === 3 && (
          <>
            <div className="lg:col-span-8 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-3">
                <ShieldAlert className="h-5 w-5 text-[#9E003F]" />
                <h3 className="font-black text-[#2B2325] text-base">Driver Compliance Audit Matrix</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black text-[#8A7578] border-b border-[#EEDADF] uppercase bg-[#FFF1F3]/10">
                      <th className="py-2 px-3">Operator</th>
                      <th className="py-2 px-3">License Validation</th>
                      <th className="py-2 px-3">Safety Index</th>
                      <th className="py-2 px-3 text-right">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDF8F8] font-bold text-[#2B2325]">
                    <tr>
                      <td className="py-3 px-3">Alex</td>
                      <td className="py-3 px-3 font-mono">TX-9921 (Valid)</td>
                      <td className="py-3 px-3 text-green-700">95% (Excellent)</td>
                      <td className="py-3 px-3 text-right"><span className="text-[9px] font-black bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">PASSED</span></td>
                    </tr>
                    <tr className="bg-red-50/50">
                      <td className="py-3 px-3">Amit Patel</td>
                      <td className="py-3 px-3 font-mono text-[#9E003F]">IL-33829 (Expired)</td>
                      <td className="py-3 px-3 text-red-600">64% (Critical)</td>
                      <td className="py-3 px-3 text-right"><span className="text-[9px] font-black bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded">DISPATCH LOCKED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-2">
                  <Gauge className="h-4 w-4 text-[#9E003F]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#2B2325]">HOS Monitoring Guard</h4>
                </div>
                <p className="text-[11px] font-semibold text-[#5E4D50]">Real-time Hours of Service (HOS) processing is active across all regional terminals.</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded-xl text-center">
                <p className="text-[10px] font-black text-green-800">All Active Operators Complying with Regulatory Rest Frames</p>
              </div>
            </div>
          </>
        )}

        {userTag === 4 && (
          <>
            <div className="lg:col-span-7 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#FDF8F8] pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#9E003F]" />
                  <h3 className="font-black text-[#2B2325] text-base">Step 9: Rolling Fuel Performance Margin Curve</h3>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 items-end h-36 pt-4 px-2 border-b border-[#FDF8F8]">
                {[60, 65, 55, 70, 80, 74, 91].map((h, i) => (
                  <div key={i} className="bg-[#0369A1]/20 hover:bg-[#0369A1]/40 rounded-t transition-all h-full relative flex items-end" style={{ height: `${h}%` }}>
                    {i === 6 && <div className="w-full h-full bg-[#9E003F]"></div>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-[#8A7578] pt-1">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN (CURRENT)</span>
              </div>
            </div>
            <div className="lg:col-span-5 bg-white border border-[#EEDADF] p-6 rounded-[32px] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-[#FDF8F8] pb-2">
                  <Fuel className="h-4 w-4 text-[#9E003F]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#2B2325]">Dynamic Profitability Registry</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-semibold border-b border-[#FDF8F8] pb-1">
                    <span className="text-[#8A7578]">Net Trip Fuel Logged:</span>
                    <span className="font-bold text-[#2B2325]">4,210 Gallons</span>
                  </div>
                  <div className="flex justify-between font-semibold border-b border-[#FDF8F8] pb-1">
                    <span className="text-[#8A7578]">Avg Operational Cost / Mile:</span>
                    <span className="font-bold text-[#2B2325]">$1.42</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#8A7578]">Gross Profit Variance:</span>
                    <span className="font-black text-green-700">+$12,400</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-[#FFF1F3] rounded-xl border border-[#EEDADF] text-[10px] text-[#9E003F] font-black text-center">
                FINANCIAL CONFIDENTIAL: VIEW RESTRICTED TO AUDIT EXTRACTIONS
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}