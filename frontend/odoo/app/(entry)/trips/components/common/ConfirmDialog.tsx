import React, { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmTone?: "danger" | "success" | "primary";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmTone = "primary",
}: ConfirmDialogProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getToneClasses = () => {
    switch (confirmTone) {
      case "danger":
        return "bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white shadow-sm shadow-[#ba1a1a]/20";
      case "success":
        return "bg-[#15803D] hover:bg-[#15803D]/90 text-white shadow-sm shadow-[#15803D]/20";
      default:
        return "bg-[#9E003F] hover:bg-[#800032] text-white shadow-sm shadow-[#9E003F]/20";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="bg-[#FFF8F7] border border-[#EEDADF] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative z-10 transform scale-100 transition-all duration-300">
        <h3 className="text-lg font-black text-[#2B2325] tracking-tight">{title}</h3>
        <p className="text-sm text-[#5E4D50] font-medium mt-2 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-[#EEDADF] rounded-xl text-xs font-bold text-[#5E4D50] hover:bg-[#FCE7EA] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${getToneClasses()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
