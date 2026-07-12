import { FuelLog } from "../types";

const INITIAL_FUEL_LOGS: FuelLog[] = [
  {
    id: "FUEL-001",
    vehicleId: "veh-1",
    vehicleName: "DAF XF 105",
    registration: "TRK-02",
    tripId: "#TR-9982",
    fuelDate: "2023-10-24",
    fuelStation: "Shell Highway Stop",
    odometer: 142502,
    liters: 420,
    pricePerLiter: 1.45,
    totalCost: 609.00,
    remarks: "Full refuel after long-haul transit.",
  },
  {
    id: "FUEL-002",
    vehicleId: "veh-2",
    vehicleName: "Volvo FH16",
    registration: "TRK-15",
    tripId: "#TR-9915",
    fuelDate: "2023-10-23",
    fuelStation: "Texaco Express",
    odometer: 82110,
    liters: 380,
    pricePerLiter: 1.48,
    totalCost: 562.40,
    remarks: "Scheduled maintenance refuel.",
  },
];

// Let's add extra mock data to reach the $84,240.00 fuel cost total shown in the summary card!
// We can seed a few hidden aggregated logs or make the initial list match the sum.
const SEED_FUEL_COST = 83068.60; // plus 609.00 + 562.40 = 84,240.00
const EXTRA_LOGS: FuelLog[] = [
  {
    id: "FUEL-000",
    vehicleId: "veh-3",
    vehicleName: "Kenworth T680",
    registration: "TRK-09",
    tripId: "#TR-9900",
    fuelDate: "2023-10-01",
    fuelStation: "Global Fuel Station",
    odometer: 10420,
    liters: 55379,
    pricePerLiter: 1.5,
    totalCost: SEED_FUEL_COST,
    remarks: "Aggregated monthly fuel consumption ledger.",
  }
];

const STORAGE_KEY = "transitops_fuel_logs";

export const fuelService = {
  getAll(): FuelLog[] {
    if (typeof window === "undefined") return [...INITIAL_FUEL_LOGS, ...EXTRA_LOGS];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const fullList = [...INITIAL_FUEL_LOGS, ...EXTRA_LOGS];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullList));
      return fullList;
    }
    return JSON.parse(stored);
  },

  getById(id: string): FuelLog | undefined {
    return this.getAll().find((log) => log.id === id);
  },

  create(data: Omit<FuelLog, "id" | "totalCost">): FuelLog {
    const list = this.getAll();
    const newId = `FUEL-${String(list.length + 1).padStart(3, "0")}`;
    const totalCost = Number((data.liters * data.pricePerLiter).toFixed(2));

    const newLog: FuelLog = {
      ...data,
      id: newId,
      totalCost,
    };

    const updated = [newLog, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newLog;
  },

  update(id: string, data: Partial<FuelLog>): FuelLog {
    const list = this.getAll();
    const idx = list.findIndex((log) => log.id === id);
    if (idx === -1) {
      throw new Error("Fuel log not found.");
    }

    const current = list[idx];
    const liters = data.liters !== undefined ? data.liters : current.liters;
    const pricePerLiter = data.pricePerLiter !== undefined ? data.pricePerLiter : current.pricePerLiter;
    const totalCost = Number((liters * pricePerLiter).toFixed(2));

    const updated: FuelLog = {
      ...current,
      ...data,
      totalCost,
    };

    list[idx] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return updated;
  },

  delete(id: string): void {
    const list = this.getAll();
    const filtered = list.filter((log) => log.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  reset(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
