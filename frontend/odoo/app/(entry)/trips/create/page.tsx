"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTrips } from "../hooks/useTrips";
import TripForm from "../components/create/TripForm";

export default function CreateTripPage() {
  const router = useRouter();
  const { vehicles, drivers, createTrip } = useTrips();

  const handleFormSubmit = (tripData: any) => {
    try {
      createTrip(tripData);
      router.push("/trips");
    } catch (err) {
      console.error("Failed to save or dispatch trip", err);
    }
  };

  return (
    <div className="max-w-[1500px] w-full mx-auto space-y-6 pb-12">
      {/* Breadcrumbs / Back button */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#8A7578]">
        <button
          onClick={() => router.push("/trips")}
          className="flex items-center gap-1 hover:text-[#9E003F] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Trips</span>
        </button>
        <span>/</span>
        <span className="text-[#2B2325]">Create New Trip</span>
      </div>

      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-black text-[#2B2325] tracking-tight">Create New Trip</h2>
        <p className="text-[#8A7578] font-bold text-xs mt-0.5">
          Fill in route specifications, select assets, and submit or dispatch the new trip.
        </p>
      </div>

      {/* Form Container */}
      <TripForm
        vehicles={vehicles}
        drivers={drivers}
        onSubmit={handleFormSubmit}
        onCancel={() => router.push("/trips")}
      />
    </div>
  );
}
