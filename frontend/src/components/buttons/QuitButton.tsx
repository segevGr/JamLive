import { BaseButton } from "components";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";
import { ViewMode } from "types";

interface QuitButtonProps {
  onQuit: () => void;
  mode: ViewMode;
}

const QuitButton = ({ onQuit, mode }: QuitButtonProps) => {
  const { t } = useTranslation();

  const buttonText = mode === "live" ? "endSession" : "returnBrowse";

  return (
    <BaseButton
      text={t(`jam.${buttonText}.button`)}
      onClick={onQuit}
      color="red"
      fullWidth={false}
      size="md"
      className={clsx("fixed bottom-4 z-50", isRtl() ? "right-4" : "left-4")}
    />
  );
};

export default QuitButton;
