
"use client";
import React, { useMemo, useState } from 'react';
import {
  Route,
  Clock,
  Truck,
  Users,
  Plus,
  MapPin,
  ArrowRight,
  Pencil,
  X,
  Check,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import { PageHeader, KpiCard, Card, StatusBadge, FilterPill, Table } from './dashboardui';

type VehicleStatus = 'Available' | 'On Trip' | 'In Shop' | 'Retired';
type DriverStatus = 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';
type TripStatus = 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';

interface Vehicle {
  id: string;
  name: string;
  reg: string;
  capacityKg: number;
  odometer: number;
  status: VehicleStatus;
}

interface Driver {
  id: string;
  name: string;
  license: string;
  licenseExpiry: string; // ISO date
  status: DriverStatus;
}

interface Trip {
  id: string;
  source: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  cargoKg: number;
  plannedKm: number;
  status: TripStatus;
  fuelUsedL?: number;
  finalOdometer?: number;
}

const SEED_VEHICLES: Vehicle[] = [
  { id: 'v1', name: 'Van-05', reg: 'KL-01-AB-4321', capacityKg: 500, odometer: 48210, status: 'On Trip' },
  { id: 'v2', name: 'Truck-12', reg: 'KL-07-CD-8890', capacityKg: 3000, odometer: 112480, status: 'On Trip' },
  { id: 'v3', name: 'Van-09', reg: 'KL-01-GH-7754', capacityKg: 500, odometer: 30125, status: 'Available' },
  { id: 'v4', name: 'Truck-07', reg: 'KL-07-JK-3321', capacityKg: 3000, odometer: 98760, status: 'Available' },
  { id: 'v5', name: 'Mini-11', reg: 'KL-05-LM-9908', capacityKg: 250, odometer: 21540, status: 'Available' },
  { id: 'v6', name: 'Mini-03', reg: 'KL-05-EF-1123', capacityKg: 250, odometer: 40230, status: 'In Shop' },
];

const SEED_DRIVERS: Driver[] = [
  { id: 'd1', name: 'Alex M.', license: 'KL01 20150098231', licenseExpiry: '2027-03-14', status: 'On Trip' },
  { id: 'd2', name: 'Priya S.', license: 'KL07 20190076412', licenseExpiry: '2026-07-29', status: 'On Trip' },
  { id: 'd3', name: 'Sneha R.', license: 'KL05 20200034987', licenseExpiry: '2027-12-01', status: 'Available' },
  { id: 'd4', name: 'Arjun P.', license: 'KL05 20180012345', licenseExpiry: '2026-12-14', status: 'Available' },
  { id: 'd5', name: 'Fatima N.', license: 'KL01 20210056781', licenseExpiry: '2028-05-20', status: 'Available' },
  { id: 'd6', name: 'Joseph T.', license: 'KL01 20150011111', licenseExpiry: '2026-07-02', status: 'Suspended' },
];

const SEED_TRIPS: Trip[] = [
  { id: 'TR-1042', source: 'Kochi', destination: 'Coimbatore', vehicleId: 'v2', driverId: 'd1', cargoKg: 2400, plannedKm: 195, status: 'Dispatched' },
  { id: 'TR-1041', source: 'Trivandrum', destination: 'Kollam', vehicleId: 'v1', driverId: 'd2', cargoKg: 450, plannedKm: 72, status: 'Dispatched' },
  { id: 'TR-1044', source: 'Kochi', destination: 'Thrissur', vehicleId: 'v4', driverId: 'd3', cargoKg: 600, plannedKm: 88, status: 'Draft' },
  { id: 'TR-1043', source: 'Trivandrum', destination: 'Nagercoil', vehicleId: 'v3', driverId: 'd4', cargoKg: 320, plannedKm: 70, status: 'Draft' },
  { id: 'TR-1038', source: 'Kozhikode', destination: 'Kannur', vehicleId: 'v5', driverId: 'd5', cargoKg: 180, plannedKm: 92, status: 'Completed', fuelUsedL: 9.5, finalOdometer: 21540 },
];

const TODAY = new Date('2026-07-12');

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const FILTERS: Array<TripStatus | 'All'> = ['All', 'Draft', 'Dispatched', 'Completed', 'Cancelled'];

export default function DriverTripsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(SEED_VEHICLES);
  const [drivers, setDrivers] = useState<Driver[]>(SEED_DRIVERS);
  const [trips, setTrips] = useState<Trip[]>(SEED_TRIPS);

  const [filter, setFilter] = useState<TripStatus | 'All'>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [completing, setCompleting] = useState(false);

  const selected = trips.find((t) => t.id === selectedId) || null;
  const visibleTrips = filter === 'All' ? trips : trips.filter((t) => t.status === filter);

  const kpis = useMemo(
    () => ({
      active: trips.filter((t) => t.status === 'Dispatched').length,
      drafts: trips.filter((t) => t.status === 'Draft').length,
      vehiclesFree: vehicles.filter((v) => v.status === 'Available').length,
      driversFree: drivers.filter(
        (d) => d.status === 'Available' && new Date(d.licenseExpiry) > TODAY
      ).length,
    }),
    [trips, vehicles, drivers]
  );

  /* ---------- status helpers (business rules) ---------- */

  const setVehicleStatus = (id: string, status: VehicleStatus) =>
    setVehicles((vs) => vs.map((v) => (v.id === id ? { ...v, status } : v)));
  const setDriverStatus = (id: string, status: DriverStatus) =>
    setDrivers((ds) => ds.map((d) => (d.id === id ? { ...d, status } : d)));

  const dispatchTrip = (trip: Trip) => {
    setTrips((ts) => ts.map((t) => (t.id === trip.id ? { ...t, status: 'Dispatched' } : t)));
    setVehicleStatus(trip.vehicleId, 'On Trip');
    setDriverStatus(trip.driverId, 'On Trip');
  };

  const completeTrip = (trip: Trip, finalOdometer: number, fuelUsedL: number) => {
    setTrips((ts) =>
      ts.map((t) => (t.id === trip.id ? { ...t, status: 'Completed', finalOdometer, fuelUsedL } : t))
    );
    setVehicles((vs) =>
      vs.map((v) => (v.id === trip.vehicleId ? { ...v, status: 'Available', odometer: finalOdometer } : v))
    );
    setDriverStatus(trip.driverId, 'Available');
    setCompleting(false);
  };

  const cancelTrip = (trip: Trip) => {
    setTrips((ts) => ts.map((t) => (t.id === trip.id ? { ...t, status: 'Cancelled' } : t)));
    if (trip.status === 'Dispatched') {
      setVehicleStatus(trip.vehicleId, 'Available');
      setDriverStatus(trip.driverId, 'Available');
    }
  };

  const deleteTrip = (trip: Trip) => {
    setTrips((ts) => ts.filter((t) => t.id !== trip.id));
    setSelectedId(null);
  };

  const saveTrip = (updated: Trip) => {
    setTrips((ts) => ts.map((t) => (t.id === updated.id ? updated : t)));
    setEditing(false);
  };

  const createTrip = () => {
    const nextNum = Math.max(...trips.map((t) => parseInt(t.id.split('-')[1], 10))) + 1;
    const freshId = `TR-${nextNum}`;
    const firstVehicle = vehicles.find((v) => v.status === 'Available');
    const firstDriver = drivers.find((d) => d.status === 'Available' && new Date(d.licenseExpiry) > TODAY);
    const draft: Trip = {
      id: freshId,
      source: '',
      destination: '',
      vehicleId: firstVehicle?.id || '',
      driverId: firstDriver?.id || '',
      cargoKg: 0,
      plannedKm: 0,
      status: 'Draft',
    };
    setTrips((ts) => [draft, ...ts]);
    setSelectedId(freshId);
    setEditing(true);
  };

  const vehicleOf = (t: Trip) => vehicles.find((v) => v.id === t.vehicleId);
  const driverOf = (t: Trip) => drivers.find((d) => d.id === t.driverId);

  return (
    <main className="min-h-screen bg-[#FDF8F8] lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <PageHeader
          subtitle="Dispatch"
          title="Trip Activity"
          actions={
            <button
              onClick={createTrip}
              className="bg-[#9E003F] hover:bg-[#800032] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 transition"
            >
              <Plus className="h-4 w-4" />
              Create trip
            </button>
          }
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard label="Active Trips" value={String(kpis.active)} icon={Route} />
          <KpiCard label="Drafts" value={String(kpis.drafts)} icon={Clock} />
          <KpiCard label="Vehicles Free" value={String(kpis.vehiclesFree)} icon={Truck} />
          <KpiCard label="Drivers Free" value={String(kpis.driversFree)} icon={Users} />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <FilterPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {/* List + detail: stacked on mobile, side-by-side on xl */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 items-start">
          <Card title={`Trips (${visibleTrips.length})`} className="xl:col-span-3">
            {visibleTrips.length === 0 ? (
              <p className="text-sm font-medium text-[#8A7578] py-6 text-center">
                No {filter !== 'All' ? filter.toLowerCase() : ''} trips yet. Create one to get started.
              </p>
            ) : (
              <Table headers={['Trip', 'Route', 'Vehicle', 'Driver', 'Cargo', 'Status']}>
                {visibleTrips.map((t) => {
                  const v = vehicleOf(t);
                  const d = driverOf(t);
                  const isSel = t.id === selectedId;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => {
                        setSelectedId(t.id);
                        setEditing(false);
                        setCompleting(false);
                      }}
                      className={`text-sm cursor-pointer transition ${
                        isSel ? 'bg-[#FFF1F3]' : 'hover:bg-[#FDF8F8]'
                      }`}
                    >
                      <td className="py-3 pr-4 font-black text-[#9E003F]">{t.id}</td>
                      <td className="py-3 pr-4 font-bold text-[#2B2325]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#8A7578]" />
                          {t.source || '—'}
                          <ArrowRight className="h-3.5 w-3.5 text-[#8A7578]" />
                          {t.destination || '—'}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium text-[#5E4D50]">{v?.name || '—'}</td>
                      <td className="py-3 pr-4 font-medium text-[#5E4D50]">{d?.name || '—'}</td>
                      <td className="py-3 pr-4 font-medium text-[#5E4D50]">{t.cargoKg} kg</td>
                      <td className="py-3 pr-4"><StatusBadge status={t.status} /></td>
                    </tr>
                  );
                })}
              </Table>
            )}
          </Card>

          {/* Detail / edit panel */}
          <div className="xl:col-span-2">
            {!selected ? (
              <Card>
                <div className="py-12 text-center">
                  <Route className="h-8 w-8 text-[#EEDADF] mx-auto mb-3" />
                  <p className="text-sm font-bold text-[#5E4D50]">Select a trip to view its data</p>
                  <p className="text-xs font-medium text-[#8A7578] mt-1">
                    Click any row on the left to inspect and edit.
                  </p>
                </div>
              </Card>
            ) : editing ? (
              <TripEditForm
                key={selected.id}
                trip={selected}
                vehicles={vehicles}
                drivers={drivers}
                onSave={saveTrip}
                onCancel={() => setEditing(false)}
              />
            ) : completing ? (
              <CompleteTripForm
                key={selected.id}
                trip={selected}
                vehicle={vehicleOf(selected)}
                onComplete={(odo, fuel) => completeTrip(selected, odo, fuel)}
                onCancel={() => setCompleting(false)}
              />
            ) : (
              <TripDetail
                trip={selected}
                vehicle={vehicleOf(selected)}
                driver={driverOf(selected)}
                onEdit={() => setEditing(true)}
                onDispatch={() => dispatchTrip(selected)}
                onStartComplete={() => setCompleting(true)}
                onCancelTrip={() => cancelTrip(selected)}
                onDelete={() => deleteTrip(selected)}
                onClose={() => setSelectedId(null)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Detail panel (read mode)                                            */
/* ------------------------------------------------------------------ */

function TripDetail({
  trip,
  vehicle,
  driver,
  onEdit,
  onDispatch,
  onStartComplete,
  onCancelTrip,
  onDelete,
  onClose,
}: {
  trip: Trip;
  vehicle?: Vehicle;
  driver?: Driver;
  onEdit: () => void;
  onDispatch: () => void;
  onStartComplete: () => void;
  onCancelTrip: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const overCapacity = vehicle ? trip.cargoKg > vehicle.capacityKg : false;
  const licenseExpired = driver ? new Date(driver.licenseExpiry) <= TODAY : false;
  const driverBlocked = driver ? licenseExpired || driver.status === 'Suspended' : true;
  const vehicleBlocked = vehicle
    ? vehicle.status === 'In Shop' || vehicle.status === 'Retired'
    : true;

  const dispatchBlockers: string[] = [];
  if (!trip.source || !trip.destination) dispatchBlockers.push('Source and destination are required.');
  if (overCapacity && vehicle)
    dispatchBlockers.push(`Cargo ${trip.cargoKg} kg exceeds ${vehicle.name}'s ${vehicle.capacityKg} kg capacity.`);
  if (vehicleBlocked) dispatchBlockers.push('Vehicle is In Shop, Retired, or unassigned.');
  if (driverBlocked)
    dispatchBlockers.push(licenseExpired ? "Driver's license has expired." : 'Driver is suspended or unassigned.');

  const rows: Array<[string, string]> = [
    ['Source', trip.source || '—'],
    ['Destination', trip.destination || '—'],
    ['Vehicle', vehicle ? `${vehicle.name} · ${vehicle.reg}` : '—'],
    ['Max capacity', vehicle ? `${vehicle.capacityKg} kg` : '—'],
    ['Driver', driver ? driver.name : '—'],
    ['License expiry', driver ? driver.licenseExpiry : '—'],
    ['Cargo weight', `${trip.cargoKg} kg`],
    ['Planned distance', `${trip.plannedKm} km`],
  ];
  if (trip.status === 'Completed') {
    rows.push(['Final odometer', `${trip.finalOdometer?.toLocaleString()} km`]);
    rows.push(['Fuel used', `${trip.fuelUsedL} L`]);
    if (trip.fuelUsedL && trip.plannedKm)
      rows.push(['Trip efficiency', `${(trip.plannedKm / trip.fuelUsedL).toFixed(1)} km/L`]);
  }

  return (
    <Card
      title={trip.id}
      action={
        <div className="flex items-center gap-2">
          <StatusBadge status={trip.status} />
          <button onClick={onClose} className="h-7 w-7 rounded-full hover:bg-[#FCE7EA] flex items-center justify-center transition">
            <X className="h-4 w-4 text-[#8A7578]" />
          </button>
        </div>
      }
    >
      <dl className="divide-y divide-[#F6E7EA]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-2.5 gap-4">
            <dt className="text-xs font-bold text-[#8A7578] uppercase tracking-wide">{k}</dt>
            <dd className="text-sm font-bold text-[#2B2325] text-right">{v}</dd>
          </div>
        ))}
      </dl>

      {trip.status === 'Draft' && dispatchBlockers.length > 0 && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-black text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5" /> Cannot dispatch yet
          </p>
          {dispatchBlockers.map((b) => (
            <p key={b} className="text-[11px] font-medium text-amber-800">{b}</p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-5">
        {(trip.status === 'Draft' || trip.status === 'Dispatched') && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs font-bold text-[#9E003F] border border-[#EEDADF] px-4 py-2 rounded-full hover:bg-[#FCE7EA] transition"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit trip
          </button>
        )}
        {trip.status === 'Draft' && (
          <button
            onClick={onDispatch}
            disabled={dispatchBlockers.length > 0}
            className="text-xs font-bold text-white bg-[#9E003F] hover:bg-[#800032] px-4 py-2 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Dispatch
          </button>
        )}
        {trip.status === 'Dispatched' && (
          <>
            <button
              onClick={onStartComplete}
              className="text-xs font-bold text-white bg-[#9E003F] hover:bg-[#800032] px-4 py-2 rounded-full transition"
            >
              Complete trip
            </button>
            <button
              onClick={onCancelTrip}
              className="text-xs font-bold text-red-600 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition"
            >
              Cancel trip
            </button>
          </>
        )}
        {trip.status === 'Draft' && (
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete draft
          </button>
        )}
      </div>

      {trip.status === 'Dispatched' && (
        <p className="text-[11px] font-medium text-[#8A7578] mt-3">
          Completing returns the vehicle and driver to Available and updates the odometer. Cancelling also frees both.
        </p>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Edit form                                                           */
/* ------------------------------------------------------------------ */

const inputCls =
  'w-full bg-[#FDF8F8] border border-[#EEDADF] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#2B2325] outline-none focus:border-[#9E003F] focus:bg-white transition';
const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-[#8A7578] mb-1.5';

function TripEditForm({
  trip,
  vehicles,
  drivers,
  onSave,
  onCancel,
}: {
  trip: Trip;
  vehicles: Vehicle[];
  drivers: Driver[];
  onSave: (t: Trip) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Trip>({ ...trip });

  // Selection pools per business rules; keep the trip's current assignment selectable
  const vehiclePool = vehicles.filter(
    (v) => v.id === trip.vehicleId || v.status === 'Available'
  );
  const driverPool = drivers.filter(
    (d) => d.id === trip.driverId || (d.status === 'Available' && new Date(d.licenseExpiry) > TODAY)
  );

  const vehicle = vehicles.find((v) => v.id === form.vehicleId);
  const errors: string[] = [];
  if (!form.source.trim()) errors.push('Source is required.');
  if (!form.destination.trim()) errors.push('Destination is required.');
  if (!form.vehicleId) errors.push('Select a vehicle.');
  if (!form.driverId) errors.push('Select a driver.');
  if (form.cargoKg <= 0) errors.push('Cargo weight must be greater than 0.');
  if (vehicle && form.cargoKg > vehicle.capacityKg)
    errors.push(`Cargo exceeds ${vehicle.name}'s max capacity of ${vehicle.capacityKg} kg.`);
  if (form.plannedKm <= 0) errors.push('Planned distance must be greater than 0.');

  const set = <K extends keyof Trip>(k: K, v: Trip[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Card
      title={`Edit ${trip.id}`}
      action={
        <button onClick={onCancel} className="h-7 w-7 rounded-full hover:bg-[#FCE7EA] flex items-center justify-center transition">
          <X className="h-4 w-4 text-[#8A7578]" />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="src">Source</label>
            <input id="src" className={inputCls} value={form.source} onChange={(e) => set('source', e.target.value)} placeholder="e.g. Kochi" />
          </div>
          <div>
            <label className={labelCls} htmlFor="dst">Destination</label>
            <input id="dst" className={inputCls} value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="e.g. Thrissur" />
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="veh">Vehicle (available only)</label>
          <select id="veh" className={inputCls} value={form.vehicleId} onChange={(e) => set('vehicleId', e.target.value)}>
            <option value="">— Select vehicle —</option>
            {vehiclePool.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} · {v.reg} · max {v.capacityKg} kg
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="drv">Driver (valid license only)</label>
          <select id="drv" className={inputCls} value={form.driverId} onChange={(e) => set('driverId', e.target.value)}>
            <option value="">— Select driver —</option>
            {driverPool.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} · license valid till {d.licenseExpiry}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="cargo">Cargo weight (kg)</label>
            <input
              id="cargo"
              type="number"
              min={0}
              className={inputCls}
              value={form.cargoKg || ''}
              onChange={(e) => set('cargoKg', Number(e.target.value))}
            />
            {vehicle && (
              <p className="text-[11px] font-medium text-[#8A7578] mt-1">
                {vehicle.name} capacity: {vehicle.capacityKg} kg
              </p>
            )}
          </div>
          <div>
            <label className={labelCls} htmlFor="dist">Planned distance (km)</label>
            <input
              id="dist"
              type="number"
              min={0}
              className={inputCls}
              value={form.plannedKm || ''}
              onChange={(e) => set('plannedKm', Number(e.target.value))}
            />
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1">
            {errors.map((er) => (
              <p key={er} className="text-[11px] font-bold text-red-700 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0" /> {er}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onSave(form)}
            disabled={errors.length > 0}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#9E003F] hover:bg-[#800032] px-5 py-2.5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="h-3.5 w-3.5" /> Save changes
          </button>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-[#5E4D50] border border-[#EEDADF] px-5 py-2.5 rounded-full hover:bg-[#FCE7EA] transition"
          >
            Discard
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Complete-trip form (final odometer + fuel)                          */
/* ------------------------------------------------------------------ */

function CompleteTripForm({
  trip,
  vehicle,
  onComplete,
  onCancel,
}: {
  trip: Trip;
  vehicle?: Vehicle;
  onComplete: (finalOdometer: number, fuelUsedL: number) => void;
  onCancel: () => void;
}) {
  const startOdo = vehicle?.odometer ?? 0;
  const [odo, setOdo] = useState(startOdo + trip.plannedKm);
  const [fuel, setFuel] = useState(0);

  const errors: string[] = [];
  if (odo <= startOdo) errors.push(`Final odometer must be greater than the current ${startOdo.toLocaleString()} km.`);
  if (fuel <= 0) errors.push('Fuel consumed must be greater than 0.');

  return (
    <Card
      title={`Complete ${trip.id}`}
      action={
        <button onClick={onCancel} className="h-7 w-7 rounded-full hover:bg-[#FCE7EA] flex items-center justify-center transition">
          <X className="h-4 w-4 text-[#8A7578]" />
        </button>
      }
    >
      <div className="space-y-4">
        <p className="text-xs font-medium text-[#5E4D50] leading-relaxed">
          Enter the final odometer and fuel consumed. The vehicle and driver will return to{' '}
          <span className="font-bold text-emerald-700">Available</span> and reports will update.
        </p>

        <div>
          <label className={labelCls} htmlFor="odo">Final odometer (km)</label>
          <input id="odo" type="number" className={inputCls} value={odo || ''} onChange={(e) => setOdo(Number(e.target.value))} />
          <p className="text-[11px] font-medium text-[#8A7578] mt-1">
            Current reading: {startOdo.toLocaleString()} km
          </p>
        </div>

        <div>
          <label className={labelCls} htmlFor="fuel">Fuel consumed (L)</label>
          <input id="fuel" type="number" min={0} className={inputCls} value={fuel || ''} onChange={(e) => setFuel(Number(e.target.value))} />
          {fuel > 0 && odo > startOdo && (
            <p className="text-[11px] font-bold text-[#9E003F] mt-1">
              Trip efficiency: {((odo - startOdo) / fuel).toFixed(1)} km/L
            </p>
          )}
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1">
            {errors.map((er) => (
              <p key={er} className="text-[11px] font-bold text-red-700 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0" /> {er}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onComplete(odo, fuel)}
            disabled={errors.length > 0}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#9E003F] hover:bg-[#800032] px-5 py-2.5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="h-3.5 w-3.5" /> Mark completed
          </button>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-[#5E4D50] border border-[#EEDADF] px-5 py-2.5 rounded-full hover:bg-[#FCE7EA] transition"
          >
            Back
          </button>
        </div>
      </div>
    </Card>
  );
}