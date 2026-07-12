import { FuelLog, ExpenseLog, OperationalCostSummary } from "./types";

export const costCalculations = {
  calculateFuelTotalCost(liters: number, pricePerLiter: number): number {
    return Number((liters * pricePerLiter).toFixed(2));
  },

  calculateOperationalSummary(
    fuelLogs: FuelLog[],
    expenses: ExpenseLog[]
  ): OperationalCostSummary {
    const totalFuelCost = fuelLogs.reduce((sum, log) => sum + (log.totalCost || 0), 0);
    const totalOtherExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const totalOperationalCost = totalFuelCost + totalOtherExpenses;

    return {
      totalFuelCost: Number(totalFuelCost.toFixed(2)),
      totalOtherExpenses: Number(totalOtherExpenses.toFixed(2)),
      totalOperationalCost: Number(totalOperationalCost.toFixed(2)),
    };
  },

  formatCurrency(value: number, currencySymbol: string = "$"): string {
    return `${currencySymbol}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
};
