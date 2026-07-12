import React from "react";
import { X } from "lucide-react";
import { ExpenseLog } from "../types";
import ExpenseForm from "./ExpenseForm";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  vehicles: { id: string; name: string; registration: string }[];
  trips: string[];
  initialData?: ExpenseLog;
}

export default function ExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  vehicles,
  trips,
  initialData,
}: ExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Dialog box wrapper */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-[#EEDADF]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EEDADF]/30 flex justify-between items-center bg-[#FFF1F3]/40">
          <div>
            <h3 className="text-sm font-black text-[#2B2325]">
              {initialData ? "Edit Expense" : "Add Expense"}
            </h3>
            <p className="text-[10px] text-[#8A7578] font-bold mt-1">
              {initialData
                ? `Modifying expense logs for ${initialData.id}`
                : "Submit new operational cost."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF1F3] rounded-full text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body wrapper */}
        <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar bg-white">
          <ExpenseForm
            onSubmit={onSubmit}
            onCancel={onClose}
            initialData={initialData}
            vehicles={vehicles}
            trips={trips}
          />
        </div>
      </div>
    </div>
  );
}
