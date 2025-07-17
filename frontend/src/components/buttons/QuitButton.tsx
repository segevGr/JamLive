import { BaseButton } from "components";
import { useTranslation } from "react-i18next";

interface QuitButtonProps {
  onQuit: () => void;
}

export default function QuitButton({ onQuit }: QuitButtonProps) {
  const { t } = useTranslation();

  return (
    <BaseButton
      text={t("buttons.quit")}
      onClick={onQuit}
      color="red"
      fullWidth={false}
      size="md"
      className="fixed bottom-4 left-4 z-50"
    />
  );
}
