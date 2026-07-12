import React from "react";
import { ClipboardCheck, ShieldAlert, Edit, ChevronRight } from "lucide-react";

interface DispatcherQueueProps {
  draftCount: number;
  onDraftClick?: () => void;
}

export default function DispatcherQueue({ draftCount, onDraftClick }: DispatcherQueueProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm">
      <h5 className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider mb-4">
        Dispatcher Queue
      </h5>
      <div className="space-y-4">
        {/* Item 1: Approvals */}
        <div className="flex items-center justify-between cursor-pointer hover:bg-[#FFF1F3]/40 p-2 -mx-2 rounded-xl transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F3] border border-[#EEDADF] flex items-center justify-center text-[#9E003F]">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#2B2325]">Approval Needed</p>
              <p className="text-[10px] text-[#8A7578] font-bold">4 Heavy Load Requests</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8A7578]" />
        </div>

        {/* Item 2: Fatigue */}
        <div className="flex items-center justify-between cursor-pointer hover:bg-[#FFF1F3]/40 p-2 -mx-2 rounded-xl transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F3] border border-[#EEDADF] flex items-center justify-center text-[#00677f]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#2B2325]">Driver Fatigue</p>
              <p className="text-[10px] text-[#8A7578] font-bold">2 Drivers approaching limit</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8A7578]" />
        </div>

        {/* Item 3: Draft Trips */}
        {draftCount > 0 && (
          <div
            onClick={onDraftClick}
            className="flex items-center justify-between cursor-pointer hover:bg-[#FFF1F3]/40 p-2 -mx-2 rounded-xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F3] border border-[#EEDADF] flex items-center justify-center text-[#D97706]">
                <Edit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#2B2325]">Draft Trips</p>
                <p className="text-[10px] text-[#8A7578] font-bold">
                  {draftCount} trip{draftCount !== 1 ? "s" : ""} awaiting assignment
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8A7578]" />
          </div>
        )}
      </div>
    </div>
  );
}
