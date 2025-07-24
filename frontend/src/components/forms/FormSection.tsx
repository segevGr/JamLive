import { PrimaryButton } from "components";

interface FormSectionProps {
  children: React.ReactNode;
  buttonText?: string;
  isDisabled?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
}

const FormSection = ({
  children,
  buttonText,
  isDisabled = false,
  onSubmit,
}: FormSectionProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
      {buttonText && (
        <PrimaryButton text={buttonText} type="submit" disabled={isDisabled} />
      )}
    </form>
  );
};

export default FormSection;
