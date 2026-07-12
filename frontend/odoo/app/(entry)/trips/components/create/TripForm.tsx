import React, { useState } from "react";
import { Trip, Vehicle, Driver } from "../../types/trip";
import RouteCargoCard from "./RouteCargoCard";
import AssetAllocationCard from "./AssetAllocationCard";
import DispatchSummary from "./DispatchSummary";
import FleetAvailability from "./FleetAvailability";
import { tripValidation, ValidationErrors } from "../../utils/tripValidation";

interface TripFormProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  onSubmit: (tripData: Partial<Trip>) => void;
  onCancel: () => void;
}

export default function TripForm({ vehicles, drivers, onSubmit, onCancel }: TripFormProps) {
  const [source, setSource] = useState("Chicago, IL");
  const [destination, setDestination] = useState("");
  const [plannedDistance, setPlannedDistance] = useState(0);
  const [cargoWeight, setCargoWeight] = useState(0);
  const [cargoType, setCargoType] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  const weightExceeded = !!(
    selectedVehicle && 
    cargoWeight > selectedVehicle.maxCapacityKg
  );

  const handleFieldChange = (field: string, value: any) => {
    switch (field) {
      case "source":
        setSource(value);
        break;
      case "destination":
        setDestination(value);
        break;
      case "plannedDistance":
        setPlannedDistance(value);
        break;
      case "cargoWeight":
        setCargoWeight(value);
        break;
      case "cargoType":
        setCargoType(value);
        break;
      case "vehicleId":
        setSelectedVehicleId(value);
        break;
      case "driverId":
        setSelectedDriverId(value);
        break;
    }
    // Clear validation error on type
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveDraft = () => {
    setIsSubmitting(true);
    const { errors: valErrors, isValid } = tripValidation.validateTripForm({
      source,
      destination,
      plannedDistance,
      cargoWeight,
      cargoType,
      vehicle: selectedVehicle,
      driver: selectedDriver,
      isDispatching: false,
    });

    if (!isValid) {
      setErrors(valErrors);
      setIsSubmitting(false);
      return;
    }

    onSubmit({
      status: "DRAFT",
      source: source.split(",")[0],
      destination: destination.split(",")[0],
      plannedDistance,
      cargoWeight: cargoWeight ? `${cargoWeight.toLocaleString()} kg` : "—",
      cargoType: cargoType || "General",
      vehicleId: selectedVehicle?.id,
      vehicle: selectedVehicle?.label,
      driverId: selectedDriver?.id,
      driverName: selectedDriver?.name,
      driverAvatar: selectedDriver?.avatar,
    });
  };

  const handleDispatch = () => {
    setIsSubmitting(true);
    const { errors: valErrors, isValid } = tripValidation.validateTripForm({
      source,
      destination,
      plannedDistance,
      cargoWeight,
      cargoType,
      vehicle: selectedVehicle,
      driver: selectedDriver,
      isDispatching: true,
    });

    if (!isValid) {
      setErrors(valErrors);
      setIsSubmitting(false);
      return;
    }

    onSubmit({
      status: "DISPATCHED",
      source: source.split(",")[0],
      destination: destination.split(",")[0],
      plannedDistance,
      cargoWeight: `${cargoWeight.toLocaleString()} kg`,
      cargoType: cargoType,
      vehicleId: selectedVehicle?.id,
      vehicle: selectedVehicle?.label.split(" - ")[0],
      driverId: selectedDriver?.id,
      driverName: selectedDriver?.name,
      driverAvatar: selectedDriver?.avatar,
    });
  };

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" onSubmit={(e) => e.preventDefault()}>
      {/* Form Fields */}
      <div className="lg:col-span-8 space-y-6">
        <RouteCargoCard
          source={source}
          destination={destination}
          plannedDistance={plannedDistance}
          cargoWeight={cargoWeight}
          cargoType={cargoType}
          errors={errors}
          onChange={handleFieldChange}
        />

        <AssetAllocationCard
          vehicles={vehicles}
          drivers={drivers}
          selectedVehicleId={selectedVehicleId}
          selectedDriverId={selectedDriverId}
          errors={errors}
          onChange={handleFieldChange}
        />
      </div>

      {/* Sidebar Summaries & Actions */}
      <div className="lg:col-span-4 space-y-6">
        <DispatchSummary
          source={source}
          destination={destination}
          plannedDistance={plannedDistance}
          cargoWeight={cargoWeight}
          cargoType={cargoType}
          selectedVehicle={selectedVehicle}
          selectedDriver={selectedDriver}
          weightExceeded={weightExceeded}
          onSaveDraft={handleSaveDraft}
          onDispatch={handleDispatch}
          isSubmitting={isSubmitting}
        />

        <FleetAvailability vehicles={vehicles} drivers={drivers} />
      </div>
    </form>
  );
}
