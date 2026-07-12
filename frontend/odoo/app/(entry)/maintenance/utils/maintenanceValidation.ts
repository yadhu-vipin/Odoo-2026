export interface MaintenanceValidationErrors {
  vehicleId?: string;
  type?: string;
  priority?: string;
  description?: string;
  technician?: string;
  estimatedCost?: string;
  expectedCompletionDate?: string;
  actualCost?: string;
  remarks?: string;
}

export const maintenanceValidation = {
  validateCreateForm(data: {
    vehicleId: string;
    type: string;
    priority: string;
    description: string;
    technician: string;
    estimatedCost: number;
    expectedCompletionDate: string;
  }): { isValid: boolean; errors: MaintenanceValidationErrors } {
    const errors: MaintenanceValidationErrors = {};

    if (!data.vehicleId) {
      errors.vehicleId = "You must select a vehicle.";
    }

    if (!data.type) {
      errors.type = "Maintenance type is required.";
    }

    if (!data.priority) {
      errors.priority = "Priority is required.";
    }

    if (!data.description.trim()) {
      errors.description = "A description of the issue is required.";
    }

    if (!data.technician.trim()) {
      errors.technician = "Technician assignment is required.";
    }

    if (data.estimatedCost <= 0) {
      errors.estimatedCost = "Estimated cost must be greater than $0.";
    }

    if (!data.expectedCompletionDate) {
      errors.expectedCompletionDate = "Expected completion date is required.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateCloseForm(data: {
    actualCost: number;
    remarks: string;
  }): { isValid: boolean; errors: MaintenanceValidationErrors } {
    const errors: MaintenanceValidationErrors = {};

    if (data.actualCost < 0) {
      errors.actualCost = "Actual cost cannot be negative.";
    }

    if (!data.remarks.trim()) {
      errors.remarks = "Closure remarks are required.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
