"use client";

import React, { useState } from "react";
import { useMaintenance } from "./hooks/useMaintenance";
import { useMaintenanceFilters } from "./hooks/useMaintenanceFilters";
import { useMaintenanceStats } from "./hooks/useMaintenanceStats";

import MaintenanceHeader from "./components/MaintenanceHeader";
import KPICards from "./components/KPICards";
import MaintenanceToolbar from "./components/MaintenanceToolbar";
import MaintenanceTable from "./components/MaintenanceTable";

import MaintenanceDrawer from "./components/drawer/MaintenanceDrawer";
import CreateMaintenanceDialog from "./components/dialogs/CreateMaintenanceDialog";
import EditMaintenanceDialog from "./components/dialogs/EditMaintenanceDialog";
import CloseMaintenanceDialog from "./components/dialogs/CloseMaintenanceDialog";
import DeleteMaintenanceDialog from "./components/dialogs/DeleteMaintenanceDialog";
import { CardSkeleton, TableSkeleton } from "../trips/components/common/LoadingState";

export default function MaintenancePage() {
  const {
    maintenances,
    vehicles,
    loading,
    selectedMaintenanceId,
    selectedMaintenance,
    setSelectedMaintenanceId,
    createMaintenance,
    updateMaintenance,
    closeMaintenance,
    deleteMaintenance,
  } = useMaintenance();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    typeFilter,
    setTypeFilter,
    dateRange,
    setDateRange,
    filteredMaintenances,
  } = useMaintenanceFilters(maintenances);

  const stats = useMaintenanceStats(maintenances, vehicles);

  // Dialog triggers state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Target maintenance record for specific dialog action
  const [actionMntId, setActionMntId] = useState<string | null>(null);
  const actionMnt = maintenances.find((m) => m.id === actionMntId);

  // Actions Callbacks
  const handleCreateSubmit = (data: any) => {
    try {
      createMaintenance(data);
      setIsCreateOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to create work order.");
    }
  };

  const handleEditSubmit = (data: any) => {
    if (!actionMntId) return;
    try {
      updateMaintenance(actionMntId, data);
      setIsEditOpen(false);
      setActionMntId(null);
    } catch (err: any) {
      alert(err.message || "Failed to modify work order details.");
    }
  };

  const handleCloseSubmit = (actualCost: number, remarks: string) => {
    if (!actionMntId) return;
    try {
      closeMaintenance(actionMntId, actualCost, remarks);
      setIsCloseOpen(false);
      setActionMntId(null);
    } catch (err: any) {
      alert(err.message || "Failed to complete work order.");
    }
  };

  const handleDeleteConfirm = () => {
    if (!actionMntId) return;
    try {
      deleteMaintenance(actionMntId);
      setIsDeleteOpen(false);
      setActionMntId(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete work order.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setTypeFilter("ALL");
    setDateRange({ start: null, end: null });
  };

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
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] w-full mx-auto space-y-6 pb-12">
      {/* 1. Header Banner */}
      <MaintenanceHeader onCreateClick={() => setIsCreateOpen(true)} />

      {/* 2. KPI statistics Cards */}
      <KPICards stats={stats} />

      {/* 3. Filtering Toolbar */}
      <MaintenanceToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        type={typeFilter}
        onTypeChange={setTypeFilter}
        startDate={dateRange.start}
        endDate={dateRange.end}
        onClearDateRange={() => setDateRange({ start: null, end: null })}
      />

      {/* 4. Main Tabular Grid */}
      <MaintenanceTable
        maintenances={filteredMaintenances}
        onView={(id) => setSelectedMaintenanceId(id)}
        onEdit={(id) => {
          setActionMntId(id);
          setIsEditOpen(true);
        }}
        onClose={(id) => {
          setActionMntId(id);
          setIsCloseOpen(true);
        }}
        onDelete={(id) => {
          setActionMntId(id);
          setIsDeleteOpen(true);
        }}
        onClearFilters={handleClearFilters}
      />

      {/* 5. Right-side Detail Drawer */}
      <MaintenanceDrawer
        isOpen={selectedMaintenanceId !== null}
        onClose={() => setSelectedMaintenanceId(null)}
        maintenance={selectedMaintenance}
        onEdit={(id) => {
          setActionMntId(id);
          setIsEditOpen(true);
        }}
        onCloseMaintenance={(id) => {
          setActionMntId(id);
          setIsCloseOpen(true);
        }}
      />

      {/* 6. Modal Dialogs */}
      <CreateMaintenanceDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        vehicles={vehicles}
      />

      <EditMaintenanceDialog
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setActionMntId(null);
        }}
        onSubmit={handleEditSubmit}
        maintenance={actionMnt}
      />

      <CloseMaintenanceDialog
        isOpen={isCloseOpen}
        onClose={() => {
          setIsCloseOpen(false);
          setActionMntId(null);
        }}
        onSubmit={handleCloseSubmit}
        maintenance={actionMnt}
      />

      <DeleteMaintenanceDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setActionMntId(null);
        }}
        onConfirm={handleDeleteConfirm}
        maintenance={actionMnt}
      />
    </div>
  );
}
