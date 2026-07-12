import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { ExpenseLog, ExpenseType } from "../types";
import { expenseSchema, ExpenseValidationError } from "../validations/expense.schema";

interface ExpenseFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: ExpenseLog;
  vehicles: { id: string; name: string; registration: string }[];
  trips: string[];
}

const EXPENSE_TYPES: { value: ExpenseType; label: string }[] = [
  { value: "Toll", label: "Toll" },
  { value: "Parking", label: "Parking" },
  { value: "Repair", label: "Repair" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Insurance", label: "Insurance" },
  { value: "Washing", label: "Washing" },
  { value: "Miscellaneous", label: "Miscellaneous" },
];

export default function ExpenseForm({
  onSubmit,
  onCancel,
  initialData,
  vehicles,
  trips,
}: ExpenseFormProps) {
  const [vehicleId, setVehicleId] = useState("");
  const [tripId, setTripId] = useState("");
  const [expenseType, setExpenseType] = useState<ExpenseType>("Toll");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<ExpenseValidationError>({});

  // Sync state if editing
  useEffect(() => {
    if (initialData) {
      setVehicleId(initialData.vehicleId);
      setTripId(initialData.tripId || "");
      setExpenseType(initialData.expenseType);
      setAmount(initialData.amount);
      setDate(initialData.date);
      setDescription(initialData.description);
    } else {
      setVehicleId("");
      setTripId("");
      setExpenseType("Toll");
      setAmount(0);
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
    }
    setErrors({});
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: valErrors } = expenseSchema.validate({
      vehicleId,
      expenseType,
      amount,
      date,
      description,
    });

    if (!isValid) {
      setErrors(valErrors);
      return;
    }

    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

    onSubmit({
      vehicleId,
      vehicleName: selectedVehicle ? selectedVehicle.name : "",
      registration: selectedVehicle ? selectedVehicle.registration : "",
      tripId: tripId || undefined,
      expenseType,
      amount,
      date,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle select */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Vehicle
          </label>
          <select
            value={vehicleId}
            onChange={(e) => {
              setVehicleId(e.target.value);
              if (errors.vehicleId) setErrors((prev) => ({ ...prev, vehicleId: undefined }));
            }}
            className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
              errors.vehicleId ? "ring-2 ring-error" : ""
            }`}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.registration} ({v.name})
              </option>
            ))}
          </select>
          {errors.vehicleId && (
            <p className="text-[9px] text-error font-bold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.vehicleId}
            </p>
          )}
        </div>

        {/* Trip select */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Trip (Optional)
          </label>
          <select
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            className="w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325]"
          >
            <option value="">Select Trip</option>
            {trips.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expense Type select */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Expense Type
          </label>
          <select
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value as ExpenseType)}
            className="w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325]"
          >
            {EXPENSE_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date selection */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Expense Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
            }}
            className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
              errors.date ? "ring-2 ring-error" : ""
            }`}
          />
          {errors.date && (
            <p className="text-[9px] text-error font-bold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.date}
            </p>
          )}
        </div>
      </div>

      {/* Amount input */}
      <div className="space-y-1">
        <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
          Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount || ""}
          onChange={(e) => {
            setAmount(Number(e.target.value) || 0);
            if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }));
          }}
          className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
            errors.amount ? "ring-2 ring-error" : ""
          }`}
        />
        {errors.amount && (
          <p className="text-[9px] text-error font-bold flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.amount}
          </p>
        )}
      </div>

      {/* Description text area */}
      <div className="space-y-1">
        <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
          Description / Notes
        </label>
        <textarea
          placeholder="Enter details..."
          rows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-medium focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
            errors.description ? "ring-2 ring-error" : ""
          }`}
        />
        {errors.description && (
          <p className="text-[9px] text-error font-bold flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-[#EEDADF]/30 flex justify-end gap-3 bg-white">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full text-[#8A7578] font-bold hover:bg-[#FCE7EA] transition-all cursor-pointer text-xs uppercase"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#00d2ff] text-white rounded-full font-bold shadow-md hover:bg-[#00b5dd] active:scale-95 transition-all cursor-pointer text-xs uppercase"
        >
          {initialData ? "Save Changes" : "Save Expense"}
        </button>
      </div>
    </form>
  );
}
