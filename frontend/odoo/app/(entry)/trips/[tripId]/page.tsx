"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Ban, CheckCircle } from "lucide-react";

import { useTrips } from "../hooks/useTrips";
import TripTimeline from "../components/details/TripTimeline";
import RouteMap from "../components/details/RouteMap";
import TripStats from "../components/details/TripStats";
import ActivityLog from "../components/details/ActivityLog";
import VehicleInfo from "../components/details/VehicleInfo";
import DriverInfo from "../components/details/DriverInfo";
import ConfirmDialog from "../components/common/ConfirmDialog";
import StatusBadge from "../components/common/StatusBadge";
import { DetailsSkeleton } from "../components/common/LoadingState";

export default function TripDetailsPage() {
  const { tripId } = useParams() as { tripId: string };
  const router = useRouter();
  
  const {
    getTripDetails,
    updateTripStatus,
    vehicles,
    drivers,
    loading,
  } = useTrips();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const trip = useMemo(() => {
    return getTripDetails(tripId);
  }, [getTripDetails, tripId]);

  // Find linked vehicle and driver profiles for comprehensive view
  const vehicleDetails = useMemo(() => {
    if (!trip) return undefined;
    return vehicles.find(
      (v) =>
        v.id === trip.vehicleId ||
        v.label.toLowerCase().includes((trip.vehicle || "").toLowerCase())
    );
  }, [vehicles, trip]);

  const driverDetails = useMemo(() => {
    if (!trip) return undefined;
    return drivers.find(
      (d) =>
        d.id === trip.driverId ||
        d.name.toLowerCase() === (trip.driverName || "").toLowerCase()
    );
  }, [drivers, trip]);

  const handleCancelTrip = () => {
    if (!trip) return;
    updateTripStatus(trip.id, "CANCELLED", "Trip cancelled by dispatcher.");
  };

  const handleCompleteTrip = () => {
    if (!trip) return;
    updateTripStatus(trip.id, "COMPLETED", "Trip completed. Cargo arrived and verified.");
  };

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!trip) {
    return (
      <div className="max-w-[1500px] w-full mx-auto space-y-6 pb-12 py-12 text-center">
        <h3 className="text-lg font-black text-[#2B2325]">Trip Not Found</h3>
        <p className="text-xs text-[#8A7578] font-semibold">
          The requested trip #{tripId} does not exist in our dispatch database.
        </p>
        <button
          onClick={() => router.push("/trips")}
          className="mt-4 px-4 py-2 bg-[#9E003F] text-white rounded-xl text-xs font-bold shadow transition hover:bg-[#800032]"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const showCancelBtn = trip.status === "DISPATCHED" || trip.status === "DRAFT";
  const showCompleteBtn = trip.status === "DISPATCHED";

  return (
    <div className="max-w-[1500px] w-full mx-auto space-y-6 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#8A7578]">
        <button
          onClick={() => router.push("/trips")}
          className="flex items-center gap-1 hover:text-[#9E003F] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Trips</span>
        </button>
        <span>/</span>
        <span className="text-[#2B2325] font-black">#{trip.id}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-black text-[#2B2325] tracking-tight">
            Trip Details: {trip.id}
          </h2>
          <StatusBadge status={trip.status} />
        </div>

        {/* Dispatch Controls */}
        <div className="flex gap-3">
          {showCancelBtn && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="px-4 py-2.5 bg-white border border-[#EEDADF] rounded-xl text-xs font-bold text-[#5E4D50] hover:bg-[#FFDAD6] hover:text-[#BA1A1A] hover:border-[#FFDAD6] transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Ban className="h-3.5 w-3.5" />
              Cancel Trip
            </button>
          )}

          {showCompleteBtn && (
            <button
              onClick={() => setIsCompleteModalOpen(true)}
              className="px-4 py-2.5 bg-[#9E003F] text-white rounded-xl text-xs font-bold hover:bg-[#800032] shadow-md shadow-[#9E003F]/10 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Complete Trip
            </button>
          )}
        </div>
      </div>

      {/* Stepper Timeline */}
      <TripTimeline timeline={trip.timeline} status={trip.status} />

      {/* Double Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column (Map, Stats, Telemetry logs) */}
        <div className="lg:col-span-8 space-y-6">
          <RouteMap
            source={trip.source}
            destination={trip.destination}
            progress={trip.progress}
          />

          <TripStats
            cargoWeight={trip.cargoWeight}
            cargoType={trip.cargoType}
            plannedDistance={trip.plannedDistance}
            progress={trip.progress}
            milesLeft={trip.milesLeft}
          />

          <ActivityLog activities={trip.activities} />
        </div>

        {/* Right column (Truck spec profile, Driver safety score) */}
        <div className="lg:col-span-4 space-y-6">
          <VehicleInfo
            vehicleDetails={vehicleDetails}
            fallbackLabel={trip.vehicle}
          />

          <DriverInfo
            driverDetails={driverDetails}
            fallbackName={trip.driverName}
            fallbackAvatar={trip.driverAvatar}
          />
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmDialog
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelTrip}
        title="Cancel Trip"
        description={`Are you sure you want to cancel trip #${trip.id}? This will release the vehicle back to Available status.`}
        confirmText="Yes, Cancel"
        confirmTone="danger"
      />

      <ConfirmDialog
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={handleCompleteTrip}
        title="Complete Trip"
        description={`Confirm cargo delivery for trip #${trip.id}. The driver and vehicle will be returned to Available fleet status.`}
        confirmText="Confirm Delivery"
        confirmTone="success"
      />
    </div>
  );
}
