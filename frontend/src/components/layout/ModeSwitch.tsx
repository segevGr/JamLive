import { BaseButton } from "components";
import { ViewMode } from "types";
import clsx from "clsx";
import { useAppDispatch, useAppSelector, setMode } from "store";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";

interface ModeSwitchProps {
  className?: string;
}

export default function ModeSwitch({ className = "" }: ModeSwitchProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.mode);
  const { currentSong } = useAppSelector((state) => state.songSession);

  const commonBtnProps = {
    fullWidth: false,
    size: "sm" as const,
  };

  const handleClick = (targetMode: ViewMode) => {
    if (mode === targetMode) return;
    dispatch(setMode(targetMode));
  };

  return (
    <div
      role="tablist"
      aria-label="Mode switch"
      className={clsx(
        "inline-flex rounded-full bg-gray-200 p-1 shadow-inner",
        className
      )}
    >
      <div className="relative">
        {currentSong && (
          <span
            className={clsx(
              "absolute -top-1 h-3 w-3 rounded-full bg-errorText ring-2 ring-white animate-slowPulse",
              isRtl() ? "left-1" : "right-1"
            )}
          />
        )}

        <BaseButton
          {...commonBtnProps}
          text={t("toggles.live")}
          color={mode === "live" ? "primary" : "gray"}
          onClick={() => handleClick("live")}
          className={clsx("rounded-full transition-all font-bold")}
        />
      </div>

      <BaseButton
        {...commonBtnProps}
        text={t("toggles.browse")}
        color={mode === "browse" ? "primary" : "gray"}
        onClick={() => handleClick("browse")}
        className={clsx("rounded-full transition-all font-bold")}
      />
    </div>
  );
}
