"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function MaintenanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Maintenance module runtime crash:", error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white border border-outline-variant rounded-3xl text-center shadow-lg flex flex-col items-center space-y-4">
      <div className="p-3 bg-error/10 text-error rounded-full">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-base font-black text-on-surface">Something went wrong!</h3>
        <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
          An error occurred while rendering the Maintenance operations console. Please try resetting the view.
        </p>
      </div>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition shadow active:scale-95"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Reset Console
      </button>
    </div>
  );
}
