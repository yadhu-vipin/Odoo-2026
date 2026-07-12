import React, { useState } from "react";
import { Maintenance } from "../types/maintenance";
import MaintenanceRow from "./MaintenanceRow";
import EmptyState from "./EmptyState";

interface MaintenanceTableProps {
  maintenances: Maintenance[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
  onClearFilters?: () => void;
}

export default function MaintenanceTable({
  maintenances,
  onView,
  onEdit,
  onClose,
  onDelete,
  onClearFilters,
}: MaintenanceTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(maintenances.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = Array.isArray(maintenances)
    ? maintenances.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (!maintenances || maintenances.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="bg-white rounded-[32px] border border-[#EEDADF] overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#FFF1F3]/60 text-[#5E4D50] text-[10px]">
            <tr className="border-b border-[#EEDADF]">
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Maintenance ID
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Registration
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Estimated Cost
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 font-black uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEDADF]/50">
            {paginatedItems.map((mnt) => (
              <MaintenanceRow
                key={mnt.id}
                maintenance={mnt}
                onView={onView}
                onEdit={onEdit}
                onClose={onClose}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-[#FFF1F3]/20 border-t border-[#EEDADF] flex justify-between items-center text-xs">
        <p className="text-[#8A7578] font-bold">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, maintenances.length)} of{" "}
          {maintenances.length} maintenance records
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 rounded-xl border border-[#EEDADF] bg-white hover:bg-[#FFF1F3]/30 text-[#5E4D50] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3.5 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#FFF1F3] text-[#9E003F] border-[#9E003F] shadow-sm"
                    : "bg-white border-[#EEDADF] text-[#5E4D50] hover:bg-[#FFF1F3]/30"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3.5 py-1.5 rounded-xl border border-[#EEDADF] bg-white hover:bg-[#FFF1F3]/30 text-[#5E4D50] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
