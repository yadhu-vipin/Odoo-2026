"use client";

import React, { useState, useMemo } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useFuelLogs } from "./hooks/useFuelLogs";
import { useExpenses } from "./hooks/useExpenses";
import { costCalculations } from "./utils";
import { FuelLog, ExpenseLog } from "./types";

import OperationalSummary from "./components/OperationalSummary";
import FuelLogsTable from "./components/FuelLogsTable";
import ExpenseLogsTable from "./components/ExpenseLogsTable";
import FuelLogModal from "./components/FuelLogModal";
import ExpenseModal from "./components/ExpenseModal";
import FuelLogDetailModal from "./components/FuelLogDetailModal";
import ExpenseDetailModal from "./components/ExpenseDetailModal";
import { CardSkeleton, TableSkeleton } from "../trips/components/common/LoadingState";

import { Fuel, Receipt } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const MOCK_VEHICLES = [
  { id: "veh-1", name: "DAF XF 105", registration: "TRK-02" },
  { id: "veh-2", name: "Volvo FH16", registration: "TRK-15" },
  { id: "veh-3", name: "Kenworth T680", registration: "TR-8821-XP" },
  { id: "veh-4", name: "MAN Lion's City", registration: "BS-4412-MT" },
  { id: "veh-5", name: "Ford Transit", registration: "BT-4402-LV" },
  { id: "veh-6", name: "Freightliner M2 106", registration: "XP-9912-SA" },
  { id: "veh-7", name: "Mercedes Sprinter", registration: "MS-7711-BR" },
];

const MOCK_TRIPS = ["#TR-9982", "#TR-9915", "#TR-8821", "#TR-4412"];

export default function ExpensesPage() {
  const {
    fuelLogs,
    loading: loadingFuel,
    searchTerm: fuelSearch,
    setSearchTerm: setFuelSearch,
    filteredFuelLogs,
    addFuelLog,
    updateFuelLog,
    deleteFuelLog,
  } = useFuelLogs();

  const {
    expenses,
    loading: loadingExpenses,
    searchTerm: expenseSearch,
    setSearchTerm: setExpenseSearch,
    filteredExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  // Modals state
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isFuelDetailOpen, setIsFuelDetailOpen] = useState(false);
  const [isExpenseDetailOpen, setIsExpenseDetailOpen] = useState(false);

  // Edit/View states
  const [selectedFuelLog, setSelectedFuelLog] = useState<FuelLog | undefined>(undefined);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseLog | undefined>(undefined);

  // Compute operational summary dynamically based on current values
  const summary = useMemo(() => {
    return costCalculations.calculateOperationalSummary(fuelLogs, expenses);
  }, [fuelLogs, expenses]);

  // Actions handlers
  const handleFuelSubmit = (data: any) => {
    if (selectedFuelLog) {
      updateFuelLog(selectedFuelLog.id, data);
    } else {
      addFuelLog(data);
    }
    setIsFuelModalOpen(false);
    setSelectedFuelLog(undefined);
  };

  const handleExpenseSubmit = (data: any) => {
    if (selectedExpense) {
      updateExpense(selectedExpense.id, data);
    } else {
      addExpense(data);
    }
    setIsExpenseModalOpen(false);
    setSelectedExpense(undefined);
  };

  const handleViewFuelLog = (log: FuelLog) => {
    setSelectedFuelLog(log);
    setIsFuelDetailOpen(true);
  };

  const handleViewExpense = (exp: ExpenseLog) => {
    setSelectedExpense(exp);
    setIsExpenseDetailOpen(true);
  };

  const isLoading = loadingFuel || loadingExpenses;

  if (isLoading) {
    return (
      <div className={`${plusJakartaSans.className} max-w-[1500px] mx-auto space-y-8 pb-12 animate-pulse`}>
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className={`${plusJakartaSans.className} space-y-6 max-w-7xl mx-auto w-full pb-12`}>
      {/* 1. Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#2B2325] tracking-tight">Fuel &amp; Expense Management</h2>
          <p className="text-xs text-[#8A7578] font-semibold mt-0.5">
            Monitor fuel consumption, expenses, and operational costs across the fleet.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            onClick={() => {
              setSelectedFuelLog(undefined);
              setIsFuelModalOpen(true);
            }}
            className="bg-[#9E003F] hover:bg-[#800032] text-white px-4 py-2.5 rounded-full flex items-center gap-1.5 font-bold transition-all shadow-md active:scale-95 text-xs cursor-pointer"
          >
            <Fuel className="h-4 w-4" />
            <span>Log Fuel</span>
          </button>
          <button
            onClick={() => {
              setSelectedExpense(undefined);
              setIsExpenseModalOpen(true);
            }}
            className="bg-[#00d2ff] hover:bg-[#00b5dd] text-white px-4 py-2.5 rounded-full flex items-center gap-1.5 font-bold transition-all shadow-md active:scale-95 text-xs cursor-pointer"
          >
            <Receipt className="h-4 w-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* 2. Fuel Table */}
      <FuelLogsTable
        fuelLogs={filteredFuelLogs}
        searchTerm={fuelSearch}
        onSearchChange={setFuelSearch}
        onView={handleViewFuelLog}
        onEdit={(log) => {
          setSelectedFuelLog(log);
          setIsFuelModalOpen(true);
        }}
        onDelete={deleteFuelLog}
      />

      {/* 3. Expenses Table */}
      <ExpenseLogsTable
        expenses={filteredExpenses}
        searchTerm={expenseSearch}
        onSearchChange={setExpenseSearch}
        onView={handleViewExpense}
        onEdit={(exp) => {
          setSelectedExpense(exp);
          setIsExpenseModalOpen(true);
        }}
        onDelete={deleteExpense}
      />

      {/* 4. Operational Cost Summary Widget */}
      <OperationalSummary summary={summary} />

      {/* 5. Modals */}
      <FuelLogModal
        isOpen={isFuelModalOpen}
        onClose={() => {
          setIsFuelModalOpen(false);
          setSelectedFuelLog(undefined);
        }}
        onSubmit={handleFuelSubmit}
        vehicles={MOCK_VEHICLES}
        trips={MOCK_TRIPS}
        initialData={selectedFuelLog}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false);
          setSelectedExpense(undefined);
        }}
        onSubmit={handleExpenseSubmit}
        vehicles={MOCK_VEHICLES}
        trips={MOCK_TRIPS}
        initialData={selectedExpense}
      />

      {/* 6. Details Modals */}
      <FuelLogDetailModal
        isOpen={isFuelDetailOpen}
        onClose={() => {
          setIsFuelDetailOpen(false);
          setSelectedFuelLog(undefined);
        }}
        onEdit={() => {
          setIsFuelDetailOpen(false);
          setIsFuelModalOpen(true);
        }}
        log={selectedFuelLog}
      />

      <ExpenseDetailModal
        isOpen={isExpenseDetailOpen}
        onClose={() => {
          setIsExpenseDetailOpen(false);
          setSelectedExpense(undefined);
        }}
        onEdit={() => {
          setIsExpenseDetailOpen(false);
          setIsExpenseModalOpen(true);
        }}
        expense={selectedExpense}
      />
    </div>
  );
}
