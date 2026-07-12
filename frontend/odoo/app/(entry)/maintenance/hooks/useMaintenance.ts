import { useState, useEffect, useCallback } from "react";
import { Maintenance, MNT_Vehicle, MaintenanceStats } from "../types/maintenance";
import { maintenanceService } from "../services/maintenanceService";

export function useMaintenance() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [vehicles, setVehicles] = useState<MNT_Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<string | null>(null);

  const refreshData = useCallback(() => {
    setLoading(true);
    try {
      const mnts = maintenanceService.getAllMaintenance();
      const vehs = maintenanceService.getVehicles();
      setMaintenances(mnts);
      setVehicles(vehs);
    } catch (error) {
      console.error("Failed to load TransitOps maintenance database.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const getMaintenanceById = useCallback((id: string) => {
    return maintenanceService.getMaintenanceById(id);
  }, []);

  const createMaintenance = useCallback((data: Partial<Maintenance>) => {
    const record = maintenanceService.createMaintenance(data);
    refreshData();
    return record;
  }, [refreshData]);

  const updateMaintenance = useCallback((id: string, data: Partial<Maintenance>) => {
    const record = maintenanceService.updateMaintenance(id, data);
    refreshData();
    return record;
  }, [refreshData]);

  const closeMaintenance = useCallback((id: string, actualCost: number, remarks: string) => {
    const record = maintenanceService.closeMaintenance(id, actualCost, remarks);
    refreshData();
    return record;
  }, [refreshData]);

  const deleteMaintenance = useCallback((id: string) => {
    maintenanceService.deleteMaintenance(id);
    if (selectedMaintenanceId === id) {
      setSelectedMaintenanceId(null);
    }
    refreshData();
  }, [selectedMaintenanceId, refreshData]);

  const resetAllData = useCallback(() => {
    maintenanceService.resetData();
    refreshData();
  }, [refreshData]);

  const selectedMaintenance = maintenances.find((m) => m.id === selectedMaintenanceId);

  return {
    maintenances,
    vehicles,
    loading,
    selectedMaintenanceId,
    selectedMaintenance,
    setSelectedMaintenanceId,
    getMainMaintenanceById: getMaintenanceById,
    createMaintenance,
    updateMaintenance,
    closeMaintenance,
    deleteMaintenance,
    resetAllData,
    refreshData,
  };
}
