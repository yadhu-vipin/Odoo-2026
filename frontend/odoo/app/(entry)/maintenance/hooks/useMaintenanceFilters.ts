import { useState, useMemo } from "react";
import { Maintenance, MaintenanceStatus, MaintenancePriority, MaintenanceType } from "../types/maintenance";

export function useMaintenanceFilters(maintenances: Maintenance[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });

  const filteredMaintenances = useMemo(() => {
    return maintenances.filter((m) => {
      // 1. Search filter (ID, Vehicle name, registration)
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        m.id.toLowerCase().includes(query) ||
        m.vehicleName.toLowerCase().includes(query) ||
        m.registration.toLowerCase().includes(query);

      // 2. Status filter
      const matchesStatus =
        statusFilter === "ALL" || m.status === statusFilter;

      // 3. Priority filter
      const matchesPriority =
        priorityFilter === "ALL" || m.priority === priorityFilter;

      // 4. Type filter
      const matchesType =
        typeFilter === "ALL" || m.type === typeFilter;

      // 5. Date filter
      let matchesDate = true;
      if (dateRange.start && dateRange.end) {
        const start = new Date(dateRange.start).getTime();
        const end = new Date(dateRange.end).getTime();
        const recordDate = new Date(m.startDate).getTime();
        matchesDate = recordDate >= start && recordDate <= end;
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesDate;
    });
  }, [maintenances, searchTerm, statusFilter, priorityFilter, typeFilter, dateRange]);

  return {
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
  };
}
export type UseMaintenanceFiltersReturn = ReturnType<typeof useMaintenanceFilters>;
