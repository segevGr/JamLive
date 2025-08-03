export const DIALOG_TYPES = ["info", "success", "warn", "error"] as const;
export type DialogType = (typeof DIALOG_TYPES)[number];

export interface DialogProps {
  isOpen: boolean;
  type?: DialogType;
  title?: string;
  message?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
}
