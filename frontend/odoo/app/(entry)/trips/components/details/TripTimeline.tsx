import React from "react";
import { Check, Clipboard, Send, Play, ShieldCheck } from "lucide-react";
import { TimelineItem, TripStatus } from "../../types/trip";

interface TripTimelineProps {
  timeline?: TimelineItem[];
  status: TripStatus;
}

export default function TripTimeline({ timeline, status }: TripTimelineProps) {
  // If timeline doesn't exist, build standard timeline items dynamically based on current status
  const steps = [
    { key: "DRAFT", label: "Drafted", icon: Clipboard },
    { key: "DISPATCHED", label: "Dispatched", icon: Send },
    { key: "IN_PROGRESS", label: "In Progress", icon: Play },
    { key: "COMPLETED", label: "Completed", icon: ShieldCheck },
  ];

  const getStepStatus = (stepKey: string) => {
    if (status === "CANCELLED") {
      return stepKey === "DRAFT" ? "completed" : "cancelled";
    }

    const order = ["DRAFT", "DISPATCHED", "IN_PROGRESS", "COMPLETED"];
    const currentIdx = order.indexOf(status === "DISPATCHED" ? "IN_PROGRESS" : status); // Map DISPATCHED to show IN_PROGRESS as next/active
    const stepIdx = order.indexOf(stepKey);

    if (stepKey === status) return "active";
    if (status === "DISPATCHED" && stepKey === "IN_PROGRESS") return "active";
    if (stepIdx < currentIdx) return "completed";
    return "pending";
  };

  return (
    <div className="bg-white border border-[#EEDADF] p-6 rounded-3xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        {/* Connector Line behind steps */}
        <div className="absolute left-[20px] md:left-12 md:right-12 top-6 bottom-6 md:bottom-auto md:top-[22px] h-[calc(100%-48px)] md:h-0.5 bg-[#EEDADF]/50 -z-10" />

        {steps.map((step) => {
          const stepStatus = getStepStatus(step.key);
          const StepIcon = step.icon;

          // Find exact timestamp if matching
          const matchedStep = timeline?.find((t) => t.status === step.key);
          const timestamp = matchedStep?.timestamp || "";

          // Styling
          let circleBg = "bg-white text-[#8A7578] border-[#EEDADF]";
          let labelColor = "text-[#8A7578]";

          if (stepStatus === "completed") {
            circleBg = "bg-[#15803D] text-white border-[#15803D]";
            labelColor = "text-[#15803D] font-bold";
          } else if (stepStatus === "active") {
            circleBg = "bg-[#9E003F] text-white border-[#9E003F] scale-110 shadow-md shadow-[#9E003F]/20";
            labelColor = "text-[#9E003F] font-black";
          } else if (stepStatus === "cancelled") {
            circleBg = "bg-[#FFDAD6] text-[#BA1A1A] border-[#FFDAD6]";
            labelColor = "text-[#BA1A1A] font-bold";
          }

          return (
            <div
              key={step.key}
              className="flex md:flex-col items-center gap-3.5 md:gap-2 flex-1 z-10"
            >
              {/* Circle Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${circleBg}`}
              >
                {stepStatus === "completed" ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : (
                  <StepIcon className="h-4 w-4" />
                )}
              </div>

              {/* Text label */}
              <div className="text-left md:text-center">
                <span className={`text-xs block ${labelColor}`}>{step.label}</span>
                {timestamp ? (
                  <span className="text-[10px] font-bold text-[#8A7578] block mt-0.5 whitespace-nowrap">
                    {timestamp}
                  </span>
                ) : (
                  stepStatus === "active" && (
                    <span className="text-[10px] font-bold text-[#9E003F] block mt-0.5 animate-pulse">
                      Active Stage
                    </span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
