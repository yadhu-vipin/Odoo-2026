import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { ExpenseLog } from "../types";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";
import ExpenseBadge from "./ExpenseBadge";
import { costCalculations } from "../utils";

interface ExpenseLogsTableProps {
  expenses: ExpenseLog[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onView: (expense: ExpenseLog) => void;
  onEdit: (expense: ExpenseLog) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseLogsTable({
  expenses,
  searchTerm,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
}: ExpenseLogsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EEDADF]/20 overflow-hidden">
      {/* Header section with search */}
      <div className="px-6 py-4 border-b border-[#EEDADF]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="text-[10px] font-black text-[#2B2325] tracking-wide uppercase">
          Expense Logs
        </h4>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search expenses..."
        />
      </div>

      {expenses.length === 0 ? (
        <div className="p-6">
          <EmptyState
            message="No matching expenses found."
            onReset={() => onSearchChange("")}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FFF1F3]/40 text-[#5E4D50] text-[10px] font-black uppercase border-b border-[#EEDADF]/60">
              <tr>
                <th className="px-6 py-3.5">Trip ID</th>
                <th className="px-6 py-3.5">Vehicle</th>
                <th className="px-6 py-3.5">Expense Type</th>
                <th className="px-6 py-3.5 text-right">Amount</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEDADF]/10">
              {expenses.map((exp) => {
                // Formatting Date
                const formattedDate = new Date(exp.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr
                    key={exp.id}
                    className="hover:bg-[#FFF1F3]/20 transition-colors text-xs font-semibold text-[#2B2325]"
                  >
                    {/* Trip ID */}
                    <td className="px-6 py-4 text-xs font-mono font-black text-[#9E003F]">
                      {exp.tripId || "—"}
                    </td>

                    {/* Vehicle */}
                    <td className="px-6 py-4 font-bold">
                      {exp.registration}
                    </td>

                    {/* Type Badge */}
                    <td className="px-6 py-4">
                      <ExpenseBadge type={exp.expenseType} />
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 text-right font-black">
                      {costCalculations.formatCurrency(exp.amount)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-[#5E4D50] font-semibold">
                      {formattedDate}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button
                          onClick={() => onView(exp)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-[#9E003F] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEdit(exp)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-[#0369A1] transition-colors cursor-pointer"
                          title="Edit Expense"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(exp.id)}
                          className="p-1 hover:bg-[#FFF1F3] rounded text-[#8A7578] hover:text-error transition-colors cursor-pointer"
                          title="Delete Expense"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
