export interface ExpenseValidationError {
  vehicleId?: string;
  expenseType?: string;
  amount?: string;
  date?: string;
  description?: string;
}

export const expenseSchema = {
  validate(data: {
    vehicleId: string;
    expenseType: string;
    amount: number;
    date: string;
    description: string;
  }): { isValid: boolean; errors: ExpenseValidationError } {
    const errors: ExpenseValidationError = {};

    if (!data.vehicleId) {
      errors.vehicleId = "Vehicle selection is required.";
    }

    if (!data.expenseType) {
      errors.expenseType = "Expense type is required.";
    }

    if (data.amount <= 0) {
      errors.amount = "Expense amount must be greater than $0.";
    }

    if (!data.date) {
      errors.date = "Expense date is required.";
    }

    if (!data.description.trim()) {
      errors.description = "Description/notes are required.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
