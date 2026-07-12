import { useState, useEffect, useCallback, useMemo } from "react";
import { ExpenseLog } from "../types";
import { expenseService } from "../services/expense.service";

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const refresh = useCallback(() => {
    setLoading(true);
    try {
      const logs = expenseService.getAll();
      setExpenses(logs);
    } catch (error) {
      console.error("Failed to fetch expense logs.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addExpense = useCallback((data: Omit<ExpenseLog, "id">) => {
    const log = expenseService.create(data);
    refresh();
    return log;
  }, [refresh]);

  const updateExpense = useCallback((id: string, data: Partial<ExpenseLog>) => {
    const log = expenseService.update(id, data);
    refresh();
    return log;
  }, [refresh]);

  const deleteExpense = useCallback((id: string) => {
    expenseService.delete(id);
    refresh();
  }, [refresh]);

  const filteredExpenses = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return expenses;

    return expenses.filter(
      (exp) =>
        exp.id.toLowerCase().includes(query) ||
        exp.vehicleName.toLowerCase().includes(query) ||
        exp.registration.toLowerCase().includes(query) ||
        (exp.tripId && exp.tripId.toLowerCase().includes(query)) ||
        exp.expenseType.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query)
    );
  }, [expenses, searchTerm]);

  return {
    expenses,
    loading,
    searchTerm,
    setSearchTerm,
    filteredExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses: refresh,
  };
}
