"use client";

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

/* ---------- Shared primitives for all TransitOps dashboards ---------- */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A7578]">
          {subtitle}
        </p>
        <h1 className="text-2xl md:text-3xl font-black text-[#2B2325] tracking-tight mt-1">
          {title}
        </h1>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  deltaUp,
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: string;
  deltaUp?: boolean;
  hint?: string;
}) {
  return (
    <div className="bg-white border border-[#EEDADF] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#8A7578] uppercase tracking-wide">
          {label}
        </span>
        <div className="h-8 w-8 rounded-xl bg-[#FFF1F3] flex items-center justify-center">
          <Icon className="h-4 w-4 text-[#9E003F]" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl md:text-3xl font-black text-[#2B2325] tracking-tight">
          {value}
        </span>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
              deltaUp
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-[#FADEE4] text-[#9E003F]'
            }`}
          >
            {deltaUp ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] font-medium text-[#8A7578]">{hint}</p>}
    </div>
  );
}

export function Card({
  title,
  action,
  children,
  className = '',
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#EEDADF] rounded-2xl p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-sm font-black text-[#2B2325] tracking-tight">{title}</h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  Available: 'bg-emerald-50 text-emerald-700',
  'On Trip': 'bg-[#FADEE4] text-[#9E003F]',
  'In Shop': 'bg-amber-50 text-amber-700',
  Retired: 'bg-gray-100 text-gray-500',
  'Off Duty': 'bg-gray-100 text-gray-500',
  Suspended: 'bg-red-50 text-red-700',
  Draft: 'bg-gray-100 text-gray-600',
  Dispatched: 'bg-[#FADEE4] text-[#9E003F]',
  Completed: 'bg-emerald-50 text-emerald-700',
  Cancelled: 'bg-red-50 text-red-600',
  'Expiring Soon': 'bg-amber-50 text-amber-700',
  Expired: 'bg-red-50 text-red-700',
  Valid: 'bg-emerald-50 text-emerald-700',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
        STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}

export function FilterPill({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-bold px-4 py-2 rounded-full border transition ${
        active
          ? 'bg-[#9E003F] border-[#9E003F] text-white'
          : 'bg-white border-[#EEDADF] text-[#5E4D50] hover:bg-[#FCE7EA]'
      }`}
    >
      {label}
    </button>
  );
}

/* Table shell: horizontally scrollable on small screens */
export function Table({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-[#EEDADF]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-[10px] font-bold uppercase tracking-widest text-[#8A7578] py-3 pr-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F6E7EA]">{children}</tbody>
      </table>
    </div>
  );
}