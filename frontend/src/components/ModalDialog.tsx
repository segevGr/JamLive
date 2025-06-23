import React from "react";
import PrimaryButton from "./PrimaryButton";

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
  confirmDisabled?: boolean;
  children?: React.ReactNode;
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
  confirmDisabled = false,
  children,
}: ModalDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
        )}
        {message && <p className="text-gray-600 mb-6">{message}</p>}

        {children && <div className="mb-6">{children}</div>}

        {showButtons && (
          <div className="flex justify-center gap-4">
            {onConfirm && (
              <PrimaryButton
                text={confirmText}
                onClick={onConfirm}
                disabled={confirmDisabled}
                color={confirmColor === "green" ? "primary" : "red"}
                fullWidth={false}
                size="sm"
              />
            )}
            {onCancel && (
              <PrimaryButton
                text={cancelText}
                onClick={onCancel}
                color="gray"
                fullWidth={false}
                size="sm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
