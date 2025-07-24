import { BaseButton } from "components";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

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
      className={clsx("fixed bottom-4 z-50", isRtl() ? "right-4" : "left-4")}
    />
  );
}
