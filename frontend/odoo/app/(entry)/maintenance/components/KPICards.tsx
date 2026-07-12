import React from "react";
import ActiveMaintenanceCard from "./cards/ActiveMaintenanceCard";
import VehiclesInShopCard from "./cards/VehiclesInShopCard";
import CompletedMaintenanceCard from "./cards/CompletedMaintenanceCard";
import TotalCostCard from "./cards/TotalCostCard";
import { MaintenanceStats } from "../types/maintenance";

interface KPICardsProps {
  stats: MaintenanceStats;
}

export default function KPICards({ stats }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
      <ActiveMaintenanceCard value={stats.activeCount} />
      <VehiclesInShopCard value={stats.vehiclesInShopCount} />
      <CompletedMaintenanceCard value={stats.completedThisMonthCount} />
      <TotalCostCard value={stats.totalCost} />
    </div>
  );
}
