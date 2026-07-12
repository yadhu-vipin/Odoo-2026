import { Driver, Vehicle } from "../types/trip";

export interface ValidationErrors {
  source?: string;
  destination?: string;
  plannedDistance?: string;
  cargoWeight?: string;
  cargoType?: string;
  vehicleId?: string;
  driverId?: string;
}

export const tripValidation = {
  validateTripForm(data: {
    source: string;
    destination: string;
    plannedDistance: number;
    cargoWeight: number;
    cargoType: string;
    vehicle?: Vehicle;
    driver?: Driver;
    isDispatching: boolean;
  }): { isValid: boolean; errors: ValidationErrors } {
    const errors: ValidationErrors = {};

    if (!data.source.trim()) {
      errors.source = "Source city is required.";
    }

    if (!data.destination.trim()) {
      errors.destination = "Destination city is required.";
    }

    if (data.plannedDistance <= 0) {
      errors.plannedDistance = "Distance must be greater than 0.";
    }

    if (data.cargoWeight <= 0) {
      errors.cargoWeight = "Cargo weight must be greater than 0.";
    }

    if (!data.cargoType.trim()) {
      errors.cargoType = "Cargo type is required.";
    }

    if (data.isDispatching) {
      if (!data.vehicle) {
        errors.vehicleId = "A vehicle must be assigned for dispatch.";
      } else if (!data.vehicle.available) {
        errors.vehicleId = "Selected vehicle is currently unavailable (e.g. in maintenance).";
      } else if (data.cargoWeight > data.vehicle.maxCapacityKg) {
        errors.cargoWeight = `Cargo weight exceeds vehicle's maximum capacity of ${data.vehicle.maxCapacityKg.toLocaleString()} kg.`;
      }

      if (!data.driver) {
        errors.driverId = "A driver must be assigned for dispatch.";
      } else if (!data.driver.valid) {
        errors.driverId = `Selected driver is unavailable: ${data.driver.statusLabel}.`;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
