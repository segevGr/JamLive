import { BaseButton } from "components";
import { useTranslation } from "react-i18next";

interface AutoScrollToggleProps {
  isScrolling: boolean;
  toggle: () => void;
}

export default function AutoScrollToggle({
  isScrolling,
  toggle,
}: AutoScrollToggleProps) {
  const { t } = useTranslation();

  return (
    <BaseButton
      text={isScrolling ? t("buttons.stop") : t("buttons.start")}
      onClick={toggle}
      color={isScrolling ? "error" : "green"}
      fullWidth={false}
      size="md"
      className="fixed bottom-4 right-4 z-50"
    />
  );
}
