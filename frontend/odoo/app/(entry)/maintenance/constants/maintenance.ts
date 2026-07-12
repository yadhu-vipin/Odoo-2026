import { MaintenanceStatus, MaintenancePriority, MaintenanceType } from "../types/maintenance";

export interface ConstantOption<T> {
  value: T;
  label: string;
}

export const MAINTENANCE_TYPES: ConstantOption<MaintenanceType>[] = [
  { value: "PREVENTIVE", label: "Preventive" },
  { value: "CORRECTIVE", label: "Corrective" },
  { value: "PREDICTIVE", label: "Predictive" },
];

export const STATUS_LIST: ConstantOption<MaintenanceStatus>[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const PRIORITY_LIST: ConstantOption<MaintenancePriority>[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];
