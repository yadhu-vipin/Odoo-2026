import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { FuelLog } from "../types";
import { fuelSchema, FuelValidationError } from "../validations/fuel.schema";
import { costCalculations } from "../utils";

interface FuelLogFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: FuelLog;
  vehicles: { id: string; name: string; registration: string }[];
  trips: string[];
}

export default function FuelLogForm({
  onSubmit,
  onCancel,
  initialData,
  vehicles,
  trips,
}: FuelLogFormProps) {
  const [vehicleId, setVehicleId] = useState("");
  const [tripId, setTripId] = useState("");
  const [fuelDate, setFuelDate] = useState("");
  const [fuelStation, setFuelStation] = useState("");
  const [odometer, setOdometer] = useState(0);
  const [liters, setLiters] = useState(0);
  const [pricePerLiter, setPricePerLiter] = useState(0);
  const [remarks, setRemarks] = useState("");

  const [errors, setErrors] = useState<FuelValidationError>({});

  // Sync state if editing
  useEffect(() => {
    if (initialData) {
      setVehicleId(initialData.vehicleId);
      setTripId(initialData.tripId || "");
      setFuelDate(initialData.fuelDate);
      setFuelStation(initialData.fuelStation || "");
      setOdometer(initialData.odometer);
      setLiters(initialData.liters);
      setPricePerLiter(initialData.pricePerLiter);
      setRemarks(initialData.remarks || "");
    } else {
      setVehicleId("");
      setTripId("");
      setFuelDate(new Date().toISOString().split("T")[0]);
      setFuelStation("");
      setOdometer(0);
      setLiters(0);
      setPricePerLiter(0);
      setRemarks("");
    }
    setErrors({});
  }, [initialData]);

  // Compute total cost dynamically
  const totalCost = costCalculations.calculateFuelTotalCost(liters, pricePerLiter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: valErrors } = fuelSchema.validate({
      vehicleId,
      fuelDate,
      odometer,
      liters,
      pricePerLiter,
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
      fuelDate,
      fuelStation: fuelStation || undefined,
      odometer,
      liters,
      pricePerLiter,
      remarks: remarks || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select Vehicle */}
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

        {/* Trip ID */}
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
        {/* Fuel Date */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Fuel Date
          </label>
          <input
            type="date"
            value={fuelDate}
            onChange={(e) => {
              setFuelDate(e.target.value);
              if (errors.fuelDate) setErrors((prev) => ({ ...prev, fuelDate: undefined }));
            }}
            className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
              errors.fuelDate ? "ring-2 ring-error" : ""
            }`}
          />
          {errors.fuelDate && (
            <p className="text-[9px] text-error font-bold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.fuelDate}
            </p>
          )}
        </div>

        {/* Station */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Fuel Station (Optional)
          </label>
          <input
            type="text"
            placeholder="Shell Highway Stop"
            value={fuelStation}
            onChange={(e) => setFuelStation(e.target.value)}
            className="w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325]"
          />
        </div>
      </div>

      {/* Odometer */}
      <div className="space-y-1">
        <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
          Current Odometer Reading (mi)
        </label>
        <input
          type="number"
          placeholder="e.g. 142502"
          value={odometer || ""}
          onChange={(e) => {
            setOdometer(Number(e.target.value) || 0);
            if (errors.odometer) setErrors((prev) => ({ ...prev, odometer: undefined }));
          }}
          className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
            errors.odometer ? "ring-2 ring-error" : ""
          }`}
        />
        {errors.odometer && (
          <p className="text-[9px] text-error font-bold flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.odometer}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Liters */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Fuel Quantity (Liters)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={liters || ""}
            onChange={(e) => {
              setLiters(Number(e.target.value) || 0);
              if (errors.liters) setErrors((prev) => ({ ...prev, liters: undefined }));
            }}
            className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
              errors.liters ? "ring-2 ring-error" : ""
            }`}
          />
          {errors.liters && (
            <p className="text-[9px] text-error font-bold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.liters}
            </p>
          )}
        </div>

        {/* Price per Liter */}
        <div className="space-y-1">
          <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
            Price per Liter ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={pricePerLiter || ""}
            onChange={(e) => {
              setPricePerLiter(Number(e.target.value) || 0);
              if (errors.pricePerLiter) setErrors((prev) => ({ ...prev, pricePerLiter: undefined }));
            }}
            className={`w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325] ${
              errors.pricePerLiter ? "ring-2 ring-error" : ""
            }`}
          />
          {errors.pricePerLiter && (
            <p className="text-[9px] text-error font-bold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.pricePerLiter}
            </p>
          )}
        </div>
      </div>

      {/* Auto calculated total */}
      <div className="space-y-1">
        <label className="text-label-bold text-[#8A7578] text-[10px] font-black uppercase tracking-wider block">
          Total Cost ($)
        </label>
        <input
          type="text"
          disabled
          value={`$ ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          className="w-full bg-[#fff0f1]/60 border border-[#EEDADF]/60 rounded-lg py-2 px-3 text-xs font-black text-[#9E003F] outline-none cursor-not-allowed"
        />
      </div>

      {/* Remarks */}
      <div className="space-y-1">
        <label className="text-label-bold text-on-surface-variant text-[10px] font-black uppercase tracking-wider block">
          Remarks
        </label>
        <textarea
          placeholder="Additional notes..."
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full bg-[#fff0f1] border-none rounded-lg py-2 px-3 text-xs font-medium focus:ring-2 focus:ring-[#9E003F]/20 text-[#2B2325]"
        />
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
          className="px-6 py-2 bg-[#9E003F] text-white rounded-full font-bold shadow-md hover:bg-[#800032] active:scale-95 transition-all cursor-pointer text-xs uppercase"
        >
          {initialData ? "Save Changes" : "Save Fuel Log"}
        </button>
      </div>
    </form>
  );
}
