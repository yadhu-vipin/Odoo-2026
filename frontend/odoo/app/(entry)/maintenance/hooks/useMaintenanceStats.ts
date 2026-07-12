import { useMemo } from "react";
import { Maintenance, MNT_Vehicle, MaintenanceStats } from "../types/maintenance";

export function useMaintenanceStats(maintenances: Maintenance[], vehicles: MNT_Vehicle[]): MaintenanceStats {
  return useMemo(() => {
    const activeList = maintenances.filter((m) => m.status === "ACTIVE");
    const completedList = maintenances.filter((m) => m.status === "COMPLETED");

    // Count vehicles currently marked "In Shop"
    const vehiclesInShopCount = vehicles.filter((v) => v.status === "In Shop").length;

    // Total actual cost spent on completed repairs
    const totalCost = completedList.reduce((sum, m) => sum + (m.actualCost || 0), 0);

    return {
      activeCount: activeList.length,
      vehiclesInShopCount,
      completedThisMonthCount: completedList.length,
      totalCost,
    };
  }, [maintenances, vehicles]);
}
