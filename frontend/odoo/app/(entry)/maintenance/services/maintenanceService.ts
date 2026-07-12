import { Maintenance, MNT_Vehicle, MaintenanceStats, TimelineEvent, MaintenanceStatus } from "../types/maintenance";

const INITIAL_VEHICLES: MNT_Vehicle[] = [
  { id: "veh-1", name: "Kenworth T680", registration: "TR-8821-XP", class: "Heavy Truck", odometer: "142,502 mi", status: "In Shop" },
  { id: "veh-2", name: "MAN Lion's City", registration: "BS-4412-MT", class: "Bus", odometer: "65,124 mi", status: "Available" },
  { id: "veh-3", name: "Volvo FH16", registration: "VL-9003-TT", class: "Heavy Truck", odometer: "210,456 mi", status: "In Shop" },
  { id: "veh-4", name: "Freightliner Cascadia", registration: "TX-4022-FL", class: "Heavy Truck", odometer: "109,240 mi", status: "Available" },
  { id: "veh-5", name: "Ford Transit", registration: "BT-4402-FT", class: "Light Van", odometer: "34,980 mi", status: "On Trip" },
  { id: "veh-6", name: "Peterbilt 579", registration: "IL-109-TRK", class: "Heavy Truck", odometer: "432,109 mi", status: "Retired" },
];

const INITIAL_MAINTENANCES: Maintenance[] = [
  {
    id: "MNT-2024-089",
    vehicleId: "veh-1",
    vehicleName: "Kenworth T680",
    registration: "TR-8821-XP",
    class: "Heavy Truck",
    type: "CORRECTIVE",
    priority: "HIGH",
    description: "Full engine diagnostics and part replacement. Noted vibration in cylinder 4 during initial inspection.",
    technician: "Carlos Ruiz",
    technicianAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkZdeCc-5MDcurdY4JO4cDk1ZT7_hzPNbFNGAEsFBNArY-inRpI50nSO3uIOMwjulsRCb_Wic2xSDxmC8sDyiqDfZYlihQWLlJV-ssxdPdIb5Fipl4IuQpF0kZkBNIihg1-AXBhm--RhKcK9aVACbti1A9aFQvLAW_y8J4v1yp8JKJv3icZQxCQftip8PP_UukfnilyUSElKRMzZVphT5s4NMD9cxn5Esf-mCHNlxhxDsmVzKNuSBA",
    startDate: "2024-10-12",
    expectedCompletionDate: "2024-10-18",
    estimatedCost: 4500,
    actualCost: 4200,
    status: "ACTIVE",
    timeline: [
      { id: "t-1", title: "Maintenance Created", timestamp: "Oct 10, 08:30 AM", completed: true, icon: "check" },
      { id: "t-2", title: "In Shop", timestamp: "Oct 12, 09:15 AM", completed: true, icon: "check" },
      { id: "t-3", title: "Inspection Started", timestamp: "Oct 12, 11:45 AM", completed: true, icon: "check" },
      { id: "t-4", title: "Repair In Progress", timestamp: "Started Oct 13, 08:00 AM", completed: false, icon: "sync" },
      { id: "t-5", title: "Completed", timestamp: "Pending...", completed: false },
      { id: "t-6", title: "Available", timestamp: "Pending...", completed: false },
    ],
  },
  {
    id: "MNT-2024-090",
    vehicleId: "veh-2",
    vehicleName: "MAN Lion's City",
    registration: "BS-4412-MT",
    class: "Bus",
    type: "PREVENTIVE",
    priority: "LOW",
    description: "Routine brake check, pad replacement, and fluid level check.",
    technician: "Alex Thompson",
    technicianAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuXtRvpEd2OMGsvWuqHsAU_5UgxOP5VmKonTnLgxrZnDtjQg3QZnTHHKCnNWphcogLintH6ubZniUEB_VQEz5EiTnIppa1JexSrC5VsL2t5UX8uJUUGgkNEwtOnhd2oNZ5uVQkRdt1A6l-sgnftDfmCa-ZiQ1ezu83yJsd7T79d_QxgZs0UJfITTNZM7UEuG45HJGhCsfbY05ziCOvyoCC0cA8-lqTVxsmz9Qg1ZfGOLEGXYwwnOHb",
    startDate: "2024-10-15",
    expectedCompletionDate: "2024-10-16",
    actualCompletionDate: "2024-10-16",
    estimatedCost: 320,
    actualCost: 320,
    status: "COMPLETED",
    remarks: "Brake pads replaced successfully. Vehicle performs optimally.",
    timeline: [
      { id: "t-1", title: "Maintenance Created", timestamp: "Oct 15, 08:00 AM", completed: true, icon: "check" },
      { id: "t-2", title: "In Shop", timestamp: "Oct 15, 08:30 AM", completed: true, icon: "check" },
      { id: "t-3", title: "Inspection Started", timestamp: "Oct 15, 10:00 AM", completed: true, icon: "check" },
      { id: "t-4", title: "Repair In Progress", timestamp: "Oct 15, 11:30 AM", completed: true, icon: "check" },
      { id: "t-5", title: "Completed", timestamp: "Oct 16, 02:00 PM", completed: true, icon: "check" },
      { id: "t-6", title: "Available", timestamp: "Oct 16, 03:00 PM", completed: true, icon: "check" },
    ],
  },
  {
    id: "MNT-2024-091",
    vehicleId: "veh-3",
    vehicleName: "Volvo FH16",
    registration: "VL-9003-TT",
    class: "Heavy Truck",
    type: "PREDICTIVE",
    priority: "CRITICAL",
    description: "Scheduled predictive transmission swap based on gear wear diagnostics.",
    technician: "Carlos Ruiz",
    technicianAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkZdeCc-5MDcurdY4JO4cDk1ZT7_hzPNbFNGAEsFBNArY-inRpI50nSO3uIOMwjulsRCb_Wic2xSDxmC8sDyiqDfZYlihQWLlJV-ssxdPdIb5Fipl4IuQpF0kZkBNIihg1-AXBhm--RhKcK9aVACbti1A9aFQvLAW_y8J4v1yp8JKJv3icZQxCQftip8PP_UukfnilyUSElKRMzZVphT5s4NMD9cxn5Esf-mCHNlxhxDsmVzKNuSBA",
    startDate: "2024-10-13",
    expectedCompletionDate: "2024-10-19",
    estimatedCost: 8900,
    status: "ACTIVE",
    timeline: [
      { id: "t-1", title: "Maintenance Created", timestamp: "Oct 13, 07:30 AM", completed: true, icon: "check" },
      { id: "t-2", title: "In Shop", timestamp: "Oct 13, 08:00 AM", completed: true, icon: "check" },
      { id: "t-3", title: "Inspection Started", timestamp: "Oct 13, 10:00 AM", completed: true, icon: "check" },
      { id: "t-4", title: "Repair In Progress", timestamp: "Started Oct 14, 08:00 AM", completed: false, icon: "sync" },
      { id: "t-5", title: "Completed", timestamp: "Pending...", completed: false },
      { id: "t-6", title: "Available", timestamp: "Pending...", completed: false },
    ],
  },
];

const STORAGE_KEYS = {
  MAINTENANCE: "transitops_maintenance",
  VEHICLES: "transitops_mnt_vehicles",
};

export const maintenanceService = {
  getVehicles(): MNT_Vehicle[] {
    if (typeof window === "undefined") return INITIAL_VEHICLES;
    const stored = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    return JSON.parse(stored);
  },

  getAllMaintenance(): Maintenance[] {
    if (typeof window === "undefined") return INITIAL_MAINTENANCES;
    const stored = localStorage.getItem(STORAGE_KEYS.MAINTENANCE);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(INITIAL_MAINTENANCES));
      return INITIAL_MAINTENANCES;
    }
    return JSON.parse(stored);
  },

  getMaintenanceById(id: string): Maintenance | undefined {
    const list = this.getAllMaintenance();
    return list.find((m) => m.id === id);
  },

  createMaintenance(data: Partial<Maintenance>): Maintenance {
    // 1. Fetch current vehicle list
    const vehicles = this.getVehicles();
    const vehicle = vehicles.find((v) => v.id === data.vehicleId);

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    // BUSINESS RULES VALIDATIONS:
    // Only Available vehicles can enter maintenance.
    if (vehicle.status === "On Trip") {
      throw new Error(`Vehicle ${vehicle.name} is currently On Trip and cannot enter maintenance.`);
    }
    if (vehicle.status === "In Shop") {
      throw new Error(`Vehicle ${vehicle.name} is already In Shop.`);
    }
    if (vehicle.status === "Retired") {
      throw new Error(`Vehicle ${vehicle.name} is Retired and cannot undergo repairs.`);
    }

    // Prevent multiple active maintenance records for the same vehicle.
    const activeList = this.getAllMaintenance().filter(
      (m) => m.vehicleId === data.vehicleId && m.status === "ACTIVE"
    );
    if (activeList.length > 0) {
      throw new Error(`Vehicle ${vehicle.name} already has an active work order.`);
    }

    // 2. Build record details
    const list = this.getAllMaintenance();
    const newId = `MNT-2024-${String(list.length + 90).padStart(3, "0")}`;
    const nowStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newMnt: Maintenance = {
      id: newId,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      registration: vehicle.registration,
      class: vehicle.class,
      type: data.type || "PREVENTIVE",
      priority: data.priority || "LOW",
      description: data.description || "Routine maintenance",
      technician: data.technician || " Carlos Ruiz",
      startDate: new Date().toISOString().split("T")[0],
      expectedCompletionDate: data.expectedCompletionDate || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      estimatedCost: Number(data.estimatedCost) || 0,
      status: "ACTIVE",
      timeline: [
        { id: "t-1", title: "Maintenance Created", timestamp: nowStr, completed: true, icon: "check" },
        { id: "t-2", title: "In Shop", timestamp: nowStr, completed: true, icon: "check" },
        { id: "t-3", title: "Inspection Started", timestamp: nowStr, completed: true, icon: "check" },
        { id: "t-4", title: "Repair In Progress", timestamp: "Started just now", completed: false, icon: "sync" },
        { id: "t-5", title: "Completed", timestamp: "Pending...", completed: false },
        { id: "t-6", title: "Available", timestamp: "Pending...", completed: false },
      ],
    };

    // Creating maintenance automatically changes vehicle status to "In Shop".
    this.updateVehicleStatus(vehicle.id, "In Shop");

    // Save record
    const updatedMnts = [newMnt, ...list];
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(updatedMnts));
    return newMnt;
  },

  updateMaintenance(id: string, data: Partial<Maintenance>): Maintenance {
    const list = this.getAllMaintenance();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) {
      throw new Error("Maintenance record not found.");
    }

    const current = list[idx];
    const updated: Maintenance = {
      ...current,
      description: data.description ?? current.description,
      priority: data.priority ?? current.priority,
      technician: data.technician ?? current.technician,
      estimatedCost: data.estimatedCost !== undefined ? Number(data.estimatedCost) : current.estimatedCost,
      expectedCompletionDate: data.expectedCompletionDate ?? current.expectedCompletionDate,
      remarks: data.remarks ?? current.remarks,
    };

    list[idx] = updated;
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(list));
    return updated;
  },

  closeMaintenance(id: string, actualCost: number, remarks: string): Maintenance {
    const list = this.getAllMaintenance();
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) {
      throw new Error("Maintenance record not found.");
    }

    const current = list[idx];
    const nowStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Update timeline
    const updatedTimeline = (current.timeline || []).map((t) => {
      if (t.title === "Repair In Progress") {
        return { ...t, completed: true, icon: "check" as const };
      }
      if (t.title === "Completed") {
        return { ...t, completed: true, timestamp: nowStr, icon: "check" as const };
      }
      if (t.title === "Available") {
        return { ...t, completed: true, timestamp: nowStr, icon: "check" as const };
      }
      return t;
    });

    const updated: Maintenance = {
      ...current,
      status: "COMPLETED",
      actualCost: Number(actualCost) || 0,
      actualCompletionDate: new Date().toISOString().split("T")[0],
      remarks: remarks || "Completed successfully.",
      timeline: updatedTimeline,
    };

    // Completing maintenance automatically changes vehicle status back to "Available".
    // Retired vehicles should never become Available again.
    const vehicles = this.getVehicles();
    const vehicle = vehicles.find((v) => v.id === current.vehicleId);
    if (vehicle && vehicle.status !== "Retired") {
      this.updateVehicleStatus(current.vehicleId, "Available");
    }

    list[idx] = updated;
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(list));
    return updated;
  },

  deleteMaintenance(id: string): void {
    const list = this.getAllMaintenance();
    const current = list.find((m) => m.id === id);
    if (!current) return;

    // If the maintenance was active, release the vehicle back to Available
    if (current.status === "ACTIVE") {
      const vehicles = this.getVehicles();
      const vehicle = vehicles.find((v) => v.id === current.vehicleId);
      if (vehicle && vehicle.status !== "Retired") {
        this.updateVehicleStatus(current.vehicleId, "Available");
      }
    }

    const filtered = list.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(filtered));
  },

  updateVehicleStatus(vehicleId: string, status: "Available" | "In Shop" | "On Trip" | "Retired") {
    const list = this.getVehicles();
    const idx = list.findIndex((v) => v.id === vehicleId);
    if (idx === -1) return;

    const currentVeh = list[idx];
    // Retired vehicles should never become Available again.
    if (currentVeh.status === "Retired" && status === "Available") {
      return; // Do nothing
    }

    list[idx] = { ...currentVeh, status };
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(list));
  },

  getMaintenanceStats(): MaintenanceStats {
    const list = this.getAllMaintenance();
    const vehicles = this.getVehicles();

    const activeList = list.filter((m) => m.status === "ACTIVE");
    const completedList = list.filter((m) => m.status === "COMPLETED");

    // In shop vehicles are vehicles in active list or marked as In Shop in vehicles list
    const inShopVehiclesCount = vehicles.filter((v) => v.status === "In Shop").length;

    // Total cost = sum of completed actual cost
    const totalCost = completedList.reduce((acc, m) => acc + (m.actualCost || 0), 0);

    return {
      activeCount: activeList.length,
      vehiclesInShopCount: inShopVehiclesCount,
      completedThisMonthCount: completedList.length, // simple representation
      totalCost,
    };
  },

  resetData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.MAINTENANCE);
    localStorage.removeItem(STORAGE_KEYS.VEHICLES);
  },
};
