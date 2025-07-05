import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useLockBodyScroll } from "hooks/useLockBodyScroll";

interface BaseDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  canDismiss?: boolean;
  children: ReactNode;
}

export default function BaseDialog({
  isOpen,
  onClose,
  canDismiss = false,
  children,
}: BaseDialogProps) {
  useLockBodyScroll(isOpen);
  useEffect(() => {
    if (!canDismiss) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [canDismiss, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canDismiss && e.target === e.currentTarget) onClose?.();
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        {children}
      </div>
    </div>,
    document.body
  );
}
