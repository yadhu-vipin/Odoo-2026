export type TripStatus = "DRAFT" | "DISPATCHED" | "COMPLETED" | "CANCELLED";

export interface ActivityLogItem {
  id: string;
  time: string;
  message: string;
  type: "gps" | "driver" | "cargo" | "system";
}

export interface TimelineItem {
  status: TripStatus;
  timestamp: string;
  completed: boolean;
  note?: string;
}

export interface Trip {
  id: string;
  status: TripStatus;
  driverId?: string;
  driverName?: string;
  driverAvatar?: string;
  vehicleId?: string;
  vehicle?: string; // e.g. "VOLVO VNL 860"
  source: string;
  destination: string;
  cargoWeight: string; // e.g. "18,500 kg"
  cargoType: string; // e.g. "Electronics"
  progress?: number; // 0 to 100
  milesLeft?: string; // e.g. "340 mi left"
  plannedDistance?: number; // e.g. 850
  timeline?: TimelineItem[];
  activities?: ActivityLogItem[];
  createdAt: string;
}

export interface Vehicle {
  id: string;
  label: string;
  plate: string;
  odometer: string;
  maxCapacityKg: number;
  available: boolean;
  hub: string;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  safetyScore: number;
  valid: boolean;
  statusLabel: string;
  statusTone: "ready" | "invalid";
}
