import { BaseButton } from "components";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

interface AutoScrollToggleProps {
  isScrolling: boolean;
  toggle: () => void;
  onSpeedChange?: (newSpeed: number) => void;
  currentSpeed: number;
}

const MIN_SPEED = 0.5;
const MAX_SPEED = 6;

const AutoScrollToggle = ({
  isScrolling,
  toggle,
  onSpeedChange,
  currentSpeed,
}: AutoScrollToggleProps) => {
  const { t } = useTranslation();
  const alignment = isRtl() ? "left-4" : "right-4";

  const handleIncrease = () => {
    if (currentSpeed < MAX_SPEED) {
      onSpeedChange?.(currentSpeed + 0.25);
    }
  };

  const handleDecrease = () => {
    if (currentSpeed > MIN_SPEED) {
      onSpeedChange?.(currentSpeed - 0.25);
    }
  };

  return (
    <div
      className={clsx(
        "fixed bottom-4 z-50 flex flex-col items-end gap-2",
        alignment
      )}
    >
      {isScrolling && (
        <div className="flex gap-2 w-full">
          <BaseButton
            text="+"
            onClick={handleIncrease}
            disabled={currentSpeed >= MAX_SPEED}
            size="sm"
            fullWidth
          />
          <BaseButton
            text="-"
            onClick={handleDecrease}
            disabled={currentSpeed <= MIN_SPEED}
            size="sm"
            fullWidth
          />
        </div>
      )}

      <BaseButton
        text={isScrolling ? t("buttons.stop") : t("buttons.start")}
        onClick={toggle}
        color={isScrolling ? "error" : "green"}
        fullWidth={false}
        size="md"
        className={clsx("z-50", alignment)} // שומר על מה שסיפקת
      />
    </div>
  );
};

export default AutoScrollToggle;
