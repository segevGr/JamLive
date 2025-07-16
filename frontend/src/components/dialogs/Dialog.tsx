import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PrimaryButton } from "components/buttons";
import { ButtonColor } from "../buttons";
import { DialogType, DialogProps } from "./dialogTypes";
import { useLockBodyScroll } from "hooks/useLockBodyScroll";

export default function Dialog({
  isOpen,
  type = "info",
  title,
  message,
  confirmLabel = "OK",
  onConfirm,
  onClose,
  confirmDisabled,
  children,
}: DialogProps) {
  const formDialog = ["confirm", "warn"].includes(type);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!formDialog) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formDialog, onClose]);

  if (!isOpen) return null;

  const paletteClass: Record<DialogType, string> = {
    info: "text-primary",
    success: "text-green-600",
    confirm: "text-primary",
    warn: "text-primary",
    error: "text-red-600",
  };

  const buttonColor: Record<DialogType, ButtonColor> = {
    info: "primary",
    success: "primary",
    confirm: "primary",
    warn: "red",
    error: "red",
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formDialog && e.target === e.currentTarget) onClose?.();
  };

  const dialog = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        {title && (
          <h2
            className={`text-xl font-semibold mb-4 ${paletteClass[type] ?? ""}`}
          >
            {title}
          </h2>
        )}

        {message && <p className="text-gray-600 mb-6">{message}</p>}
        {children && <div className="mb-6">{children}</div>}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {type !== "info" && (
            <>
              <PrimaryButton
                text={confirmLabel}
                onClick={onConfirm}
                color={buttonColor[type]}
                fullWidth={false}
                disabled={confirmDisabled}
                size="sm"
              />
              {formDialog && (
                <PrimaryButton
                  text="Cancel"
                  onClick={onClose}
                  color="gray"
                  fullWidth={false}
                  size="sm"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
