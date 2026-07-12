import { Trip, Vehicle, Driver, TripStatus, ActivityLogItem } from "../types/trip";

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "v-442",
    label: "VOLVO VNL 860 (H4-22)",
    plate: "TX-882-OPS",
    odometer: "124,502 km",
    maxCapacityKg: 26000,
    available: true,
    hub: "Chicago",
  },
  {
    id: "v-109",
    label: "PETERBILT 579 - #V-109",
    plate: "IL-109-TRK",
    odometer: "89,120 km",
    maxCapacityKg: 30000,
    available: true,
    hub: "Chicago",
  },
  {
    id: "v-881",
    label: "KENWORTH T680 - #V-881",
    plate: "CA-881-LOG",
    odometer: "245,610 km",
    maxCapacityKg: 45000,
    available: false,
    hub: "Dallas",
  },
];

const INITIAL_DRIVERS: Driver[] = [
  {
    id: "d-mikasa",
    name: "Mikasa A.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR5Z3_23xlrMMOa4b88-bm92TxPREi-3cUU_4JgT_2JSTvCKZCntsmDCwAywcCS1ELqfgAYNSU7-dTG-mUMfeY7QUJImBQ40985gGyHUFaW06n397K4JO4C6VHgRyVdQ_Ibs_8FXRUQ8Im-iqDnl4EPk1mJXXHvmrlM1vXqIiKmwqnnKUEOLHQRrsxlGCAfK7G068QAKjUPpnvu4iv6gACWOyZnJmL4fkXHyrecymg0R2rk8WDVmjeGcMk-vpNrwhHYob-LH3NFxTx",
    phone: "+1 (555) 123-4567",
    safetyScore: 9.8,
    valid: true,
    statusLabel: "CDL-A Valid",
    statusTone: "ready",
  },
  {
    id: "d-eren",
    name: "Eren Y.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVsFxcgK3GYv7gjj-dZIC8GzDiusWnuYJRlud1Vf3Pjx5T2x53DYvw9al1XjueKnMJ6XzleYc1C5VvKvE_mrI2rbAPmDgvfQZVoIHs_OakkeNC7AZBMo4htwZolQXuvIoBOBzAypbXMUMjgS8tkr0XYQIHBLY_R8DFR4yd8s9ekcSBYOC8QZ_M60SZCE4r2Wvpx0pCn1ai2Ee5NLe0D0D1U-fbGO5x54a-ExLV-8lYekinXdw4UzmiJltHyeHgjq5X3bfRQs5fsTcD",
    phone: "+1 (555) 987-6543",
    safetyScore: 9.2,
    valid: true,
    statusLabel: "CDL-A Valid",
    statusTone: "ready",
  },
  {
    id: "d-armin",
    name: "Armin A.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKf3WF6j3EA4F0oeoSx2NIpkHAqmh_CXcA97EYHbvpnU2PR3J-JAPZBC8lUg05aDXG99ghf5thSIJdlA9enLyODbtCXs7LV9jHX5BTyL7nJ6xbAzUXYGq3lOwbVmmmKjS4_rahH_0D6fz0WIdtJZyo9rRQSXbg2XvfeiGxNu6p_xOQI2YQS-Swjeb5PBJDeaKfIO3kkxI3Jv7N5j7Xm5Z5EPNo9EduxoEA_yJnOpdPZUP_WMOAQzKI2PqUd2eggJ9eFpSU54FqJdDH",
    phone: "+1 (555) 456-7890",
    safetyScore: 7.4,
    valid: false,
    statusLabel: "License Expired",
    statusTone: "invalid",
  },
  {
    id: "d-marcus",
    name: "Marcus Thorne",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFUADwZbpXVme6MnkBh44jv-KyIIr0O_ckqdA61ws4XilqZlveUwIPoeqnYWUv0yvO38f25hpuMEMG-9tWk49WOUeztylGOqVgAI3XWBPhMyuESW-vi49Zg6k_K5TLKRc8MLZzX3f30IEhMv4CpcrATT9HsMdrs_mkB287cs1mko_EeJWagqfE4XtvZAZv1ZyOVs6ypn6KBH4bD7hoxLJJZD5hYsK4bzLLMWCCHo9mfew_MNIyKEDn2zfl96QRH3QGBCqa3aZhcfnr",
    phone: "+1 (555) 012-9934",
    safetyScore: 9.8,
    valid: true,
    statusLabel: "CDL-A Valid",
    statusTone: "ready",
  },
];

const INITIAL_TRIPS: Trip[] = [
  {
    id: "TR-8821",
    status: "DISPATCHED",
    driverId: "d-eren",
    driverName: "Eren Y.",
    driverAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVsFxcgK3GYv7gjj-dZIC8GzDiusWnuYJRlud1Vf3Pjx5T2x53DYvw9al1XjueKnMJ6XzleYc1C5VvKvE_mrI2rbAPmDgvfQZVoIHs_OakkeNC7AZBMo4htwZolQXuvIoBOBzAypbXMUMjgS8tkr0XYQIHBLY_R8DFR4yd8s9ekcSBYOC8QZ_M60SZCE4r2Wvpx0pCn1ai2Ee5NLe0D0D1U-fbGO5x54a-ExLV-8lYekinXdw4UzmiJltHyeHgjq5X3bfRQs5fsTcD",
    vehicleId: "v-442",
    vehicle: "VOLVO VNL 860 (H4-22)",
    source: "Chicago",
    destination: "New York",
    cargoWeight: "18,500 kg",
    cargoType: "Electronics",
    progress: 65,
    milesLeft: "340 mi left",
    plannedDistance: 850,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    timeline: [
      { status: "DRAFT", timestamp: "Oct 24, 08:30 AM", completed: true, note: "Trip initialized" },
      { status: "DISPATCHED", timestamp: "Oct 24, 10:15 AM", completed: true, note: "Assets allocated & dispatched" },
      { status: "COMPLETED", timestamp: "Estimated: Oct 24, 11:00 PM", completed: false, note: "Awaiting final arrival" },
    ],
    activities: [
      { id: "act-1", time: "Just now", message: "Vehicle pinged GPS coordinates at Checkpoint B-4.", type: "gps" },
      { id: "act-2", time: "2 hrs ago", message: "Driver Eren Y. confirmed departure from Chicago.", type: "driver" },
      { id: "act-3", time: "3 hrs ago", message: "Cargo loading finalized and weight verified (18.5t).", type: "cargo" },
    ],
  },
  {
    id: "TR-8825",
    status: "DRAFT",
    source: "Seattle",
    destination: "San Jose",
    cargoWeight: "4,200 kg",
    cargoType: "Medical",
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(), // 10 hours ago
    timeline: [
      { status: "DRAFT", timestamp: "Oct 24, 08:30 AM", completed: true, note: "Trip initialized" },
    ],
    activities: [
      { id: "act-1", time: "10 hrs ago", message: "Trip created as draft.", type: "system" },
    ],
  },
  {
    id: "TR-8830",
    status: "DISPATCHED",
    driverId: "d-marcus",
    driverName: "Marcus Thorne",
    driverAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFUADwZbpXVme6MnkBh44jv-KyIIr0O_ckqdA61ws4XilqZlveUwIPoeqnYWUv0yvO38f25hpuMEMG-9tWk49WOUeztylGOqVgAI3XWBPhMyuESW-vi49Zg6k_K5TLKRc8MLZzX3f30IEhMv4CpcrATT9HsMdrs_mkB287cs1mko_EeJWagqfE4XtvZAZv1ZyOVs6ypn6KBH4bD7hoxLJJZD5hYsK4bzLLMWCCHo9mfew_MNIyKEDn2zfl96QRH3QGBCqa3aZhcfnr",
    vehicleId: "v-109",
    vehicle: "PETERBILT 579 - #V-109",
    source: "Dallas",
    destination: "Houston",
    cargoWeight: "12,000 kg",
    cargoType: "Retail",
    progress: 42,
    milesLeft: "128 mi left",
    plannedDistance: 240,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    timeline: [
      { status: "DRAFT", timestamp: "Oct 25, 09:00 AM", completed: true },
      { status: "DISPATCHED", timestamp: "Oct 25, 11:15 AM", completed: true },
    ],
    activities: [
      { id: "act-1", time: "1 hr ago", message: "Driver Marcus Thorne departed Dallas.", type: "driver" },
    ],
  },
  {
    id: "TR-8834",
    status: "COMPLETED",
    driverId: "d-mikasa",
    driverName: "Mikasa A.",
    driverAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR5Z3_23xlrMMOa4b88-bm92TxPREi-3cUU_4JgT_2JSTvCKZCntsmDCwAywcCS1ELqfgAYNSU7-dTG-mUMfeY7QUJImBQ40985gGyHUFaW06n397K4JO4C6VHgRyVdQ_Ibs_8FXRUQ8Im-iqDnl4EPk1mJXXHvmrlM1vXqIiKmwqnnKUEOLHQRrsxlGCAfK7G068QAKjUPpnvu4iv6gACWOyZnJmL4fkXHyrecymg0R2rk8WDVmjeGcMk-vpNrwhHYob-LH3NFxTx",
    vehicleId: "v-442",
    vehicle: "VOLVO VNL 860 (H4-22)",
    source: "Boston",
    destination: "Philadelphia",
    cargoWeight: "2,800 kg",
    cargoType: "Pharma",
    progress: 100,
    milesLeft: "Delivered",
    plannedDistance: 310,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 24 hours ago
    timeline: [
      { status: "DRAFT", timestamp: "Oct 23, 08:30 AM", completed: true },
      { status: "DISPATCHED", timestamp: "Oct 23, 10:15 AM", completed: true },
      { status: "COMPLETED", timestamp: "Oct 23, 03:00 PM", completed: true },
    ],
    activities: [
      { id: "act-1", time: "Yesterday", message: "Delivered successfully. Handover paperwork signed.", type: "system" },
    ],
  },
];

const KEYS = {
  TRIPS: "transitops_trips",
  VEHICLES: "transitops_vehicles",
  DRIVERS: "transitops_drivers",
};

export const tripService = {
  getTrips(): Trip[] {
    if (typeof window === "undefined") return INITIAL_TRIPS;
    const trips = localStorage.getItem(KEYS.TRIPS);
    if (!trips) {
      localStorage.setItem(KEYS.TRIPS, JSON.stringify(INITIAL_TRIPS));
      return INITIAL_TRIPS;
    }
    return JSON.parse(trips);
  },

  getTripById(id: string): Trip | undefined {
    const trips = this.getTrips();
    return trips.find((t) => t.id === id);
  },

  getVehicles(): Vehicle[] {
    if (typeof window === "undefined") return INITIAL_VEHICLES;
    const vehicles = localStorage.getItem(KEYS.VEHICLES);
    if (!vehicles) {
      localStorage.setItem(KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    return JSON.parse(vehicles);
  },

  getDrivers(): Driver[] {
    if (typeof window === "undefined") return INITIAL_DRIVERS;
    const drivers = localStorage.getItem(KEYS.DRIVERS);
    if (!drivers) {
      localStorage.setItem(KEYS.DRIVERS, JSON.stringify(INITIAL_DRIVERS));
      return INITIAL_DRIVERS;
    }
    return JSON.parse(drivers);
  },

  createTrip(tripData: Partial<Trip>): Trip {
    const trips = this.getTrips();
    const newId = `TR-${8800 + trips.length + 1}`;
    
    // Construct default timeline
    const timeline: typeof INITIAL_TRIPS[0]["timeline"] = [
      {
        status: "DRAFT",
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        completed: true,
        note: "Trip created",
      },
    ];

    if (tripData.status === "DISPATCHED") {
      timeline.push({
        status: "DISPATCHED",
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        completed: true,
        note: "Assets allocated & dispatched",
      });
    }

    const newTrip: Trip = {
      id: newId,
      status: tripData.status || "DRAFT",
      driverId: tripData.driverId,
      driverName: tripData.driverName,
      driverAvatar: tripData.driverAvatar,
      vehicleId: tripData.vehicleId,
      vehicle: tripData.vehicle,
      source: tripData.source || "Chicago",
      destination: tripData.destination || "Destination",
      cargoWeight: tripData.cargoWeight || "0 kg",
      cargoType: tripData.cargoType || "General",
      progress: tripData.status === "DISPATCHED" ? 0 : undefined,
      milesLeft: tripData.status === "DISPATCHED" ? `${tripData.plannedDistance || 0} mi left` : undefined,
      plannedDistance: tripData.plannedDistance || 0,
      createdAt: new Date().toISOString(),
      timeline,
      activities: [
        {
          id: `act-${Date.now()}`,
          time: "Just now",
          message: tripData.status === "DISPATCHED" ? "Trip dispatched to driver." : "Trip saved as draft.",
          type: "system",
        },
      ],
    };

    const updated = [newTrip, ...trips];
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(updated));

    // If driver and vehicle are dispatched, mark vehicle as unavailable
    if (tripData.status === "DISPATCHED" && tripData.vehicleId) {
      this.updateVehicleAvailability(tripData.vehicleId, false);
    }

    return newTrip;
  },

  updateTripStatus(id: string, status: TripStatus, note?: string): Trip | undefined {
    const trips = this.getTrips();
    const tripIndex = trips.findIndex((t) => t.id === id);
    if (tripIndex === -1) return undefined;

    const trip = trips[tripIndex];
    trip.status = status;

    const nowStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Update timeline
    if (!trip.timeline) trip.timeline = [];
    
    // Check if timeline already has this status, if so update it, otherwise push
    const existingIndex = trip.timeline.findIndex((step) => step.status === status);
    if (existingIndex !== -1) {
      trip.timeline[existingIndex] = { status, timestamp: nowStr, completed: true, note };
    } else {
      trip.timeline.push({ status, timestamp: nowStr, completed: true, note });
    }

    // Progress updates
    if (status === "COMPLETED") {
      trip.progress = 100;
      trip.milesLeft = "Delivered";
      if (trip.vehicleId) this.updateVehicleAvailability(trip.vehicleId, true);
    } else if (status === "CANCELLED") {
      trip.progress = undefined;
      trip.milesLeft = "Cancelled";
      if (trip.vehicleId) this.updateVehicleAvailability(trip.vehicleId, true);
    } else if (status === "DISPATCHED") {
      trip.progress = 0;
      trip.milesLeft = `${trip.plannedDistance || 0} mi left`;
      if (trip.vehicleId) this.updateVehicleAvailability(trip.vehicleId, false);
    }

    // Add activity
    if (!trip.activities) trip.activities = [];
    trip.activities.unshift({
      id: `act-${Date.now()}`,
      time: "Just now",
      message: note || `Trip status updated to ${status}.`,
      type: "system",
    });

    trips[tripIndex] = trip;
    localStorage.setItem(KEYS.TRIPS, JSON.stringify(trips));
    return trip;
  },

  updateVehicleAvailability(vehicleId: string, available: boolean) {
    const vehicles = this.getVehicles();
    const idx = vehicles.findIndex((v) => v.id === vehicleId);
    if (idx !== -1) {
      vehicles[idx].available = available;
      localStorage.setItem(KEYS.VEHICLES, JSON.stringify(vehicles));
    }
  },

  resetData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEYS.TRIPS);
    localStorage.removeItem(KEYS.VEHICLES);
    localStorage.removeItem(KEYS.DRIVERS);
  },
};
