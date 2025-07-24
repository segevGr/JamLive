import { BaseButton } from "components";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

interface AutoScrollToggleProps {
  isScrolling: boolean;
  toggle: () => void;
}

const AutoScrollToggle = ({ isScrolling, toggle }: AutoScrollToggleProps) => {
  const { t } = useTranslation();

  return (
    <BaseButton
      text={isScrolling ? t("buttons.stop") : t("buttons.start")}
      onClick={toggle}
      color={isScrolling ? "error" : "green"}
      fullWidth={false}
      size="md"
      className={clsx("fixed bottom-4  z-50", isRtl() ? "left-4" : "right-4")}
    />
  );
};

export default AutoScrollToggle;
