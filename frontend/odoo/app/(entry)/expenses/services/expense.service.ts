import { ExpenseLog } from "../types";

const INITIAL_EXPENSES: ExpenseLog[] = [
  {
    id: "EXP-001",
    vehicleId: "veh-1",
    vehicleName: "DAF XF 105",
    registration: "TRK-02",
    tripId: "#TR-9982",
    expenseType: "Toll",
    amount: 124.00,
    date: "2023-10-24",
    description: "Paid toll at Sector 4 highway checkpoint.",
  },
  {
    id: "EXP-002",
    vehicleId: "veh-2",
    vehicleName: "Volvo FH16",
    registration: "TRK-15",
    tripId: "#TR-9915",
    expenseType: "Repair",
    amount: 1240.50,
    date: "2023-10-23",
    description: "Emergency radiator hose patch and coolant flush.",
  },
];

// Let's add extra mock data to reach the $40,660.00 other expenses total shown in the summary card!
const SEED_OTHER_EXPENSES = 39295.50; // plus 124.00 + 1240.50 = 40,660.00
const EXTRA_EXPENSES: ExpenseLog[] = [
  {
    id: "EXP-000",
    vehicleId: "veh-3",
    vehicleName: "Kenworth T680",
    registration: "TRK-09",
    tripId: "#TR-9900",
    expenseType: "Insurance",
    amount: SEED_OTHER_EXPENSES,
    date: "2023-10-01",
    description: "Fleet monthly premium insurance charges.",
  }
];

const STORAGE_KEY = "transitops_expense_logs";

export const expenseService = {
  getAll(): ExpenseLog[] {
    if (typeof window === "undefined") return [...INITIAL_EXPENSES, ...EXTRA_EXPENSES];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const fullList = [...INITIAL_EXPENSES, ...EXTRA_EXPENSES];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullList));
      return fullList;
    }
    return JSON.parse(stored);
  },

  getById(id: string): ExpenseLog | undefined {
    return this.getAll().find((exp) => exp.id === id);
  },

  create(data: Omit<ExpenseLog, "id">): ExpenseLog {
    const list = this.getAll();
    const newId = `EXP-${String(list.length + 1).padStart(3, "0")}`;

    const newExp: ExpenseLog = {
      ...data,
      id: newId,
    };

    const updated = [newExp, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newExp;
  },

  update(id: string, data: Partial<ExpenseLog>): ExpenseLog {
    const list = this.getAll();
    const idx = list.findIndex((exp) => exp.id === id);
    if (idx === -1) {
      throw new Error("Expense log not found.");
    }

    const current = list[idx];
    const updated: ExpenseLog = {
      ...current,
      ...data,
    };

    list[idx] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return updated;
  },

  delete(id: string): void {
    const list = this.getAll();
    const filtered = list.filter((exp) => exp.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  reset(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
