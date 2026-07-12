import React from "react";
import { Compass, User, Scale, Laptop, AlertCircle } from "lucide-react";
import { ActivityLogItem } from "../../types/trip";

interface ActivityLogProps {
  activities?: ActivityLogItem[];
}

export default function ActivityLog({ activities = [] }: ActivityLogProps) {
  const getIcon = (type: ActivityLogItem["type"]) => {
    switch (type) {
      case "gps":
        return Compass;
      case "driver":
        return User;
      case "cargo":
        return Scale;
      default:
        return Laptop;
    }
  };

  const getColorClasses = (type: ActivityLogItem["type"]) => {
    switch (type) {
      case "gps":
        return "bg-[#00677f]/10 text-[#00677f] border-[#00677f]/20";
      case "driver":
        return "bg-[#FEF3C7] text-[#D97706] border-[#FEF3C7]";
      case "cargo":
        return "bg-[#E4F5EB] text-[#15803D] border-[#E4F5EB]";
      default:
        return "bg-[#FFF1F3] text-[#9E003F] border-[#EEDADF]/50";
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#EEDADF] shadow-sm space-y-4">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-wider border-b border-[#FFF1F3] pb-2">
        Recent Activity Log
      </h4>

      {activities.length > 0 ? (
        <div className="relative space-y-5 pl-7 mt-2">
          {/* Vertical line connector */}
          <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-[#EEDADF]/40" />

          {activities.map((act) => {
            const Icon = getIcon(act.type);
            const colorClasses = getColorClasses(act.type);
            
            return (
              <div key={act.id} className="relative flex items-start gap-4 text-xs">
                {/* Timeline Pin Icon */}
                <div
                  className={`absolute -left-[27px] mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center border transition-colors ${colorClasses}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div className="flex-1 min-w-0 pl-3">
                  <h6 className="font-black text-[#2B2325] leading-snug">
                    {act.message}
                  </h6>
                  <span className="text-[10px] text-[#8A7578] font-bold block mt-1">
                    {act.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-[#8A7578] gap-1.5">
          <AlertCircle className="h-6 w-6 opacity-60" />
          <p className="text-xs font-bold italic">No telemetry pings logged yet.</p>
        </div>
      )}
    </div>
  );
}
