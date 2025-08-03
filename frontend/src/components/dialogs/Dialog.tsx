import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  PrimaryButton,
  ButtonColor,
  DialogType,
  DialogProps,
} from "components";
import { useLockBodyScroll } from "hooks";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

const Dialog = ({
  isOpen,
  type = "info",
  title,
  message,
  confirmLabel = "OK",
  onConfirm,
  onClose,
  confirmDisabled,
  children,
}: DialogProps) => {
  const formDialog = ["warn"].includes(type);
  const { t } = useTranslation();
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
    warn: "text-primary",
    error: "text-red-600",
  };

  const buttonColor: Record<DialogType, ButtonColor> = {
    info: "primary",
    success: "primary",
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
      <div
        className="bg-white rounded-xl shadow-lg p-6 max-w-sm"
        dir={isRtl() ? "rtl" : "ltr"}
      >
        {title && (
          <h2
            className={clsx(
              "text-xl font-semibold mb-4 text-center",
              paletteClass[type] ?? ""
            )}
          >
            {title}
          </h2>
        )}

        {message && (
          <p className={clsx("text-gray-600 mb-6", "text-center")}>{message}</p>
        )}
        {children && <div className="mb-6">{children}</div>}

        <div
          className={clsx("flex justify-center gap-4", isRtl() && "flex-row")}
        >
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
                  text={t("profile.dialog.cancel")}
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
};

export default Dialog;
