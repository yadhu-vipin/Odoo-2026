import { useState, useEffect, useCallback, useMemo } from "react";
import { Trip, Vehicle, Driver, TripStatus } from "../types/trip";
import { tripService } from "../services/tripService";

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setLoading(true);
    try {
      const tripsData = tripService.getTrips();
      const vehiclesData = tripService.getVehicles();
      const driversData = tripService.getDrivers();
      setTrips(tripsData);
      setVehicles(vehiclesData);
      setDrivers(driversData);
    } catch (error) {
      console.error("Failed to load TransitOps trips data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const getTripDetails = useCallback((id: string) => {
    return trips.find((t) => t.id === id);
  }, [trips]);

  const createTrip = useCallback((tripData: Partial<Trip>) => {
    const newTrip = tripService.createTrip(tripData);
    refreshData();
    return newTrip;
  }, [refreshData]);

  const updateTripStatus = useCallback((id: string, status: TripStatus, note?: string) => {
    const updatedTrip = tripService.updateTripStatus(id, status, note);
    refreshData();
    return updatedTrip;
  }, [refreshData]);

  const resetAllData = useCallback(() => {
    tripService.resetData();
    refreshData();
  }, [refreshData]);

  // Derived stats
  const activeCount = useMemo(() => {
    return trips.filter((t) => t.status === "DISPATCHED").length;
  }, [trips]);

  const draftCount = useMemo(() => {
    return trips.filter((t) => t.status === "DRAFT").length;
  }, [trips]);

  const completedCount = useMemo(() => {
    return trips.filter((t) => t.status === "COMPLETED").length;
  }, [trips]);

  const driversReadyCount = useMemo(() => {
    // Drivers who are CDL-A Valid and not assigned to an active trip
    const activeDriverNames = trips
      .filter((t) => t.status === "DISPATCHED")
      .map((t) => t.driverName);
    
    return drivers.filter(
      (d) => d.valid && !activeDriverNames.includes(d.name)
    ).length;
  }, [drivers, trips]);

  return {
    trips,
    vehicles,
    drivers,
    loading,
    activeCount,
    draftCount,
    completedCount,
    driversReadyCount,
    getTripDetails,
    createTrip,
    updateTripStatus,
    resetAllData,
    refreshData,
  };
}
export type UseTripsReturn = ReturnType<typeof useTrips>;
