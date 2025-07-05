import BaseDialog from "./BaseDialog";
import PrimaryButton from "components/PrimaryButton";

interface SuccessDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  closeLabel?: string;
  onClose: () => void;
}

export function SuccessDialog({
  isOpen,
  title = "Success!",
  message,
  closeLabel = "Got it",
  onClose,
}: SuccessDialogProps) {
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-green-600">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>

      <PrimaryButton
        text={closeLabel}
        onClick={onClose}
        color="primary"
        fullWidth={false}
        size="sm"
      />
    </BaseDialog>
  );
}
