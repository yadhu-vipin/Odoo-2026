import React from "react";
import { Plus } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "success" | "danger" | "neutral" | "primary";
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-dash-1",
    title: "Trip Completed",
    description: "Vehicle TR-8834 and Driver Mikasa A. back to Available.",
    time: "12 min ago",
    type: "success",
  },
  {
    id: "act-dash-2",
    title: "Fuel Expense Added",
    description: "$412.50 logged for TR-8821 by Driver Eren Y.",
    time: "45 min ago",
    type: "primary",
  },
  {
    id: "act-dash-3",
    title: "New Trip Dispatched",
    description: "Vehicle and Driver statuses updated to On Trip automatically.",
    time: "2 hrs ago",
    type: "neutral",
  },
];

export default function RecentActivity() {
  const getBulletColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "danger":
        return "bg-red-500";
      case "primary":
        return "bg-[#9E003F]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm flex flex-col justify-between min-h-[310px] relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#FFF1F3]">
          <h3 className="text-xs font-black text-[#8A7578] uppercase tracking-wider">Activity Feed</h3>
          <button className="text-[10px] font-black text-[#9E003F] hover:underline uppercase">View all</button>
        </div>

        {/* Timeline */}
        <div className="relative space-y-5 pl-5">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-[#EEDADF]/50" />

          {DEFAULT_ACTIVITIES.map((act) => (
            <div key={act.id} className="relative flex items-start justify-between text-xs">
              {/* Bullet */}
              <div
                className={`absolute -left-[17px] mt-1 w-2.5 h-2.5 rounded-full border border-white ${getBulletColor(
                  act.type
                )}`}
              />
              <div className="pr-4">
                <h6 className="font-black text-[#2B2325]">{act.title}</h6>
                <p className="text-[10px] text-[#8A7578] font-bold mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
              <span className="text-[9px] font-black text-[#8A7578] uppercase whitespace-nowrap ml-2">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick plus trigger action */}
      <button className="absolute bottom-6 right-6 h-10 w-10 bg-[#9E003F] hover:bg-[#800032] text-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 border border-[#9E003F]">
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}
