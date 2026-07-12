import React from "react";
import { X, Calendar, Landmark, CreditCard, Edit3 } from "lucide-react";
import { ExpenseLog } from "../types";
import ExpenseBadge from "./ExpenseBadge";
import { costCalculations } from "../utils";

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  expense?: ExpenseLog;
}

export default function ExpenseDetailModal({
  isOpen,
  onClose,
  onEdit,
  expense,
}: ExpenseDetailModalProps) {
  if (!isOpen || !expense) return null;

  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Detail Card Container */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-[#EEDADF]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EEDADF]/30 flex justify-between items-center bg-[#FFF1F3]/40">
          <div>
            <h3 className="text-xs font-black text-[#9E003F] uppercase tracking-widest">
              Expense Log Details
            </h3>
            <p className="text-[10px] text-[#8A7578] font-bold mt-1">
              ID: {expense.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF1F3] rounded-full text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details Body */}
        <div className="p-6 space-y-5 bg-white text-xs text-[#2B2325]">
          {/* Vehicle banner */}
          <div className="p-4 bg-[#FFF1F3]/25 border border-[#EEDADF]/50 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE]/60 text-[#0369A1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] font-semibold">payments</span>
            </div>
            <div>
              <p className="font-mono text-sm font-black text-[#2B2325]">
                {expense.registration} ({expense.vehicleName})
              </p>
              <p className="font-mono text-[10px] text-[#8A7578] font-bold mt-0.5">
                Trip ID: {expense.tripId || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expense Type */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <Landmark className="h-3 w-3 text-[#8A7578]" />
                Expense Type
              </p>
              <div className="mt-1">
                <ExpenseBadge type={expense.expenseType} />
              </div>
            </div>

            {/* Expense Date */}
            <div className="space-y-0.5">
              <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#8A7578]" />
                Transaction Date
              </p>
              <p className="font-bold text-[#2B2325]">{formattedDate}</p>
            </div>
          </div>

          {/* Amount banner */}
          <div className="p-4 bg-[#fff0f1]/60 border border-[#EEDADF]/50 rounded-2xl flex justify-between items-center">
            <span className="font-bold text-[#8A7578] flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5 text-[#8A7578]" />
              Amount Paid:
            </span>
            <span className="font-black text-[#9E003F] text-base">
              {costCalculations.formatCurrency(expense.amount)}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="text-[9px] text-[#8A7578] uppercase font-black tracking-wider">Description</p>
            <p className="p-3 bg-[#FFF1F3]/15 border border-[#EEDADF]/30 rounded-xl text-[#5E4D50] leading-relaxed font-semibold">
              {expense.description}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EEDADF]/30 flex justify-end gap-3 bg-white">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-[#EEDADF] text-[#5E4D50] hover:bg-[#FFF1F3]/40 text-xs font-bold transition-all cursor-pointer uppercase"
            >
              Close
            </button>
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-5 py-2 bg-[#9E003F] text-white rounded-full font-bold shadow-md hover:bg-[#800032] active:scale-95 transition-all flex items-center gap-1 text-xs cursor-pointer uppercase"
              >
                <Edit3 className="h-3 w-3" />
                Edit Expense
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
