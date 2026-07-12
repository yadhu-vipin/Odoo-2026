import { useState, useEffect, useCallback, useMemo } from "react";
import { FuelLog } from "../types";
import { fuelService } from "../services/fuel.service";

export function useFuelLogs() {
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const refresh = useCallback(() => {
    setLoading(true);
    try {
      const logs = fuelService.getAll();
      setFuelLogs(logs);
    } catch (error) {
      console.error("Failed to fetch fuel logs.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addFuelLog = useCallback((data: Omit<FuelLog, "id" | "totalCost">) => {
    const log = fuelService.create(data);
    refresh();
    return log;
  }, [refresh]);

  const updateFuelLog = useCallback((id: string, data: Partial<FuelLog>) => {
    const log = fuelService.update(id, data);
    refresh();
    return log;
  }, [refresh]);

  const deleteFuelLog = useCallback((id: string) => {
    fuelService.delete(id);
    refresh();
  }, [refresh]);

  const filteredFuelLogs = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return fuelLogs;

    return fuelLogs.filter(
      (log) =>
        log.id.toLowerCase().includes(query) ||
        log.vehicleName.toLowerCase().includes(query) ||
        log.registration.toLowerCase().includes(query) ||
        (log.tripId && log.tripId.toLowerCase().includes(query)) ||
        (log.fuelStation && log.fuelStation.toLowerCase().includes(query))
    );
  }, [fuelLogs, searchTerm]);

  return {
    fuelLogs,
    loading,
    searchTerm,
    setSearchTerm,
    filteredFuelLogs,
    addFuelLog,
    updateFuelLog,
    deleteFuelLog,
    refreshFuelLogs: refresh,
  };
}
