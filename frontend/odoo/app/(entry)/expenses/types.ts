export interface FuelLog {
  id: string;
  vehicleId: string;
  vehicleName: string;
  registration: string;
  tripId?: string; // Optional trip connection
  fuelDate: string;
  fuelStation?: string;
  odometer: number;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  remarks?: string;
}

export type ExpenseType =
  | "Toll"
  | "Parking"
  | "Repair"
  | "Maintenance"
  | "Insurance"
  | "Washing"
  | "Miscellaneous";

export interface ExpenseLog {
  id: string;
  vehicleId: string;
  vehicleName: string;
  registration: string;
  tripId?: string; // Optional trip connection
  expenseType: ExpenseType;
  amount: number;
  date: string;
  description: string;
}

export interface OperationalCostSummary {
  totalFuelCost: number;
  totalOtherExpenses: number;
  totalOperationalCost: number;
}
