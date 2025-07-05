import BaseDialog from "./BaseDialog";
import PrimaryButton from "../PrimaryButton";

interface InfoDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function InfoDialog({
  isOpen,
  title,
  message,
  showCloseButton = false,
  onClose,
}: InfoDialogProps) {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>

      {showCloseButton && onClose && (
        <PrimaryButton
          text="Close"
          onClick={onClose}
          color="primary"
          fullWidth={false}
          size="sm"
        />
      )}
    </BaseDialog>
  );
}
