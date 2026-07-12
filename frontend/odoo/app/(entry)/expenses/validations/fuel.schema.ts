export interface FuelValidationError {
  vehicleId?: string;
  fuelDate?: string;
  odometer?: string;
  liters?: string;
  pricePerLiter?: string;
}

export const fuelSchema = {
  validate(data: {
    vehicleId: string;
    fuelDate: string;
    odometer: number;
    liters: number;
    pricePerLiter: number;
  }): { isValid: boolean; errors: FuelValidationError } {
    const errors: FuelValidationError = {};

    if (!data.vehicleId) {
      errors.vehicleId = "Vehicle selection is required.";
    }

    if (!data.fuelDate) {
      errors.fuelDate = "Fuel date is required.";
    }

    if (data.odometer <= 0) {
      errors.odometer = "Odometer reading must be greater than 0.";
    }

    if (data.liters <= 0) {
      errors.liters = "Fuel quantity (liters) must be greater than 0.";
    }

    if (data.pricePerLiter <= 0) {
      errors.pricePerLiter = "Price per liter must be greater than 0.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
