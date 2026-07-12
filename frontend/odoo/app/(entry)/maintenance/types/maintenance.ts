export type MaintenanceStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
export type MaintenancePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type MaintenanceType = "PREVENTIVE" | "CORRECTIVE" | "PREDICTIVE";
export type MNT_VehicleStatus = "Available" | "In Shop" | "On Trip" | "Retired";

export interface MNT_Vehicle {
  id: string;
  name: string;
  registration: string;
  class: string; // e.g. "Heavy Truck", "Bus", "Light Van"
  odometer: string;
  status: MNT_VehicleStatus;
}

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  icon?: "check" | "sync" | "pending";
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  vehicleName: string;
  registration: string;
  class: string;
  type: MaintenanceType;
  priority: MaintenancePriority;
  description: string;
  technician: string;
  technicianAvatar?: string;
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  estimatedCost: number;
  actualCost?: number;
  status: MaintenanceStatus;
  remarks?: string;
  timeline?: TimelineEvent[];
}

export interface MaintenanceStats {
  activeCount: number;
  vehiclesInShopCount: number;
  completedThisMonthCount: number;
  totalCost: number;
}
