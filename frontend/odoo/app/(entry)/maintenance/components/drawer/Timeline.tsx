import React from "react";
import { Check, Loader2 } from "lucide-react";
import { TimelineEvent } from "../../types/maintenance";

interface TimelineProps {
  timeline?: TimelineEvent[];
}

export default function Timeline({ timeline = [] }: TimelineProps) {
  return (
    <section className="mb-lg">
      <h4 className="text-[10px] font-black text-[#8A7578] uppercase tracking-widest mb-4 border-b border-[#EEDADF] pb-2">
        Service Timeline
      </h4>
      <div className="space-y-0 pl-3">
        {timeline.map((event, idx) => {
          const isLast = idx === timeline.length - 1;
          const isCompleted = event.completed;
          const isSync = event.icon === "sync";

          let borderClass = "border-[#EEDADF]";
          let dotClass = "bg-white text-gray-400 border-gray-200";
          let textClass = "text-[#8A7578]";

          if (isCompleted) {
            borderClass = "border-[#15803D]";
            dotClass = "bg-[#E4F5EB] text-[#15803D] border-[#A7F3D0]";
            textClass = "text-[#2B2325] font-black";
          } else if (isSync) {
            borderClass = "border-[#B45309]";
            dotClass = "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A] ring-4 ring-[#FEF3C7]/40 animate-pulse";
            textClass = "text-[#B45309] font-black";
          }

          return (
            <div
              key={event.id}
              className={`relative pl-8 pb-6 border-l-2 text-xs ${
                isLast ? "border-transparent" : borderClass
              }`}
            >
              {/* Connector Bullet */}
              <div
                className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center border-2 shadow-sm transition-all ${dotClass}`}
              >
                {isCompleted ? (
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                ) : isSync ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                ) : null}
              </div>

              {/* Title & Notes */}
              <div>
                <p className={`font-bold leading-none ${textClass}`}>{event.title}</p>
                <p className="text-[10px] text-[#8A7578] mt-1.5 font-semibold">
                  {event.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
