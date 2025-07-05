import BaseDialog from "./BaseDialog";
import PrimaryButton from "../PrimaryButton";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "red" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  confirmDisabled?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  confirmColor = "primary",
  confirmDisabled = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  return (
    <BaseDialog isOpen={isOpen} onClose={onCancel} canDismiss>
      <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
      {message && <p className="text-gray-600 mb-6">{message}</p>}

      {children && <div className="mb-6">{children}</div>}

      <div className="flex justify-center gap-4">
        <PrimaryButton
          text={confirmLabel}
          onClick={onConfirm}
          color={confirmColor}
          disabled={confirmDisabled}
          fullWidth={false}
          size="sm"
        />
        <PrimaryButton
          text={cancelLabel}
          onClick={onCancel}
          color="gray"
          fullWidth={false}
          size="sm"
        />
      </div>
    </BaseDialog>
  );
}
