import React from "react";

interface ModalDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showButtons?: boolean;
  confirmColor?: "green" | "red";
}

export default function ModalDialog({
  isOpen,
  title = "",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showButtons = true,
  confirmColor = "red",
}: ModalDialogProps) {
  if (!isOpen) return null;

  const confirmButtonClass =
    confirmColor === "green"
      ? "bg-primary hover:bg-primaryLight"
      : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
        )}
        {message && <p className="text-gray-600 mb-6">{message}</p>}

        {showButtons && (
          <div className="flex justify-center gap-4">
            {onConfirm && (
              <button
                onClick={onConfirm}
                className={`${confirmButtonClass} text-white font-semibold px-4 py-2 rounded-lg`}
              >
                {confirmText}
              </button>
            )}
            {onCancel && (
              <button
                onClick={onCancel}
                className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
