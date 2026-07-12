"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { useTrips } from "./hooks/useTrips";
import KPISection from "./components/dashboard/KPISection";
import TripFilters from "./components/dashboard/TripFilters";
import ActiveTripsTable from "./components/dashboard/ActiveTripsTable";
import FleetStatus from "./components/dashboard/FleetStatus";
import DispatcherQueue from "./components/dashboard/DispatcherQueue";
import { CardSkeleton, TableSkeleton } from "./components/common/LoadingState";

type TabFilter = "all" | "active" | "planned";

export default function TripsDashboardPage() {
  const router = useRouter();
  const {
    trips,
    loading,
    activeCount,
    draftCount,
    driversReadyCount,
  } = useTrips();

  const [tabFilter, setTabFilter] = useState<TabFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sync search updates and create actions from the global top navbar
  useEffect(() => {
    const handleOpenModal = () => {
      router.push("/trips/create");
    };

    const handleSearch = (e: Event) => {
      const query = (e as CustomEvent<string>).detail;
      setSearchTerm(query || "");
    };

    window.addEventListener("open-trip-modal", handleOpenModal);
    window.addEventListener("trip-search", handleSearch);

    return () => {
      window.removeEventListener("open-trip-modal", handleOpenModal);
      window.removeEventListener("trip-search", handleSearch);
    };
  }, [router]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // 1. Tab Status filters
      const matchesTab =
        tabFilter === "all" ||
        (tabFilter === "active" && trip.status === "DISPATCHED") ||
        (tabFilter === "planned" && trip.status === "DRAFT");

      // 2. Search query filters
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        trip.id.toLowerCase().includes(query) ||
        trip.source.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.driverName?.toLowerCase().includes(query) ||
        trip.vehicle?.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [trips, tabFilter, searchTerm]);

  // Compute Cargo Capacity alert ratio for KPIs
  const cargoCapacityStr = useMemo(() => {
    if (trips.length === 0) return "0%";
    const activeDispatched = trips.filter((t) => t.status === "DISPATCHED");
    if (activeDispatched.length === 0) return "0%";
    
    // Average progress as load capacity representation
    const totalProgress = activeDispatched.reduce((acc, t) => acc + (t.progress || 0), 0);
    const avgCapacity = Math.round(totalProgress / activeDispatched.length);
    return `${Math.max(60, Math.min(98, avgCapacity))}%`;
  }, [trips]);

  if (loading) {
    return (
      <div className="max-w-[1500px] mx-auto space-y-8 pb-12 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-60 bg-gray-200 rounded-lg" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={3} />
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] w-full mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] leading-10 font-semibold text-[#2b2325] tracking-tight">
            Trip Management
          </h2>
          <p className="text-[#8a7578] font-bold text-xs mt-0.5">
            Real-time logistics dispatching and fleet tracking dashboard.
          </p>
        </div>
      </div>

      {/* KPI Section */}
      <KPISection
        activeCount={activeCount}
        driversReadyCount={driversReadyCount}
        cargoCapacity={cargoCapacityStr}
      />

      {/* Search & Tabs Controls */}
      <TripFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tabFilter={tabFilter}
        onTabFilterChange={setTabFilter}
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Table of Trips */}
        <div className="lg:col-span-8">
          <ActiveTripsTable
            trips={filteredTrips}
            onAssignClick={() => router.push("/trips/create")}
          />
        </div>

        {/* Right Side: Map & Queue Info */}
        <div className="lg:col-span-4 space-y-6">
          <FleetStatus />
          
          <DispatcherQueue
            draftCount={draftCount}
            onDraftClick={() => setTabFilter("planned")}
          />
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => router.push("/trips/create")}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#9E003F] text-white rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-95 transition hover:bg-[#800032] border border-[#9E003F]"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
