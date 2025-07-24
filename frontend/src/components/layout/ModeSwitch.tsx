import { BaseButton } from "components";
import { ViewMode } from "types";
import clsx from "clsx";
import { useAppDispatch, useAppSelector, setMode } from "store";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";

const ModeSwitch = () => {
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
      className="inline-flex rounded-full bg-gray-200 p-1 shadow-inner"
    >
      <div className="relative">
        {currentSong && (
          <span
            className={clsx(
              "absolute -top-0.5 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-errorText ring-2 ring-white animate-slowPulse",
              isRtl() ? "left-0.5 sm:left-1" : "right-0.5 sm:right-1"
            )}
          />
        )}

        <BaseButton
          {...commonBtnProps}
          text={t("toggles.live")}
          color={mode === "live" ? "primary" : "gray"}
          onClick={() => handleClick("live")}
          className="rounded-full transition-all font-bold px-2 py-1 sm:px-4 sm:py-2"
        />
      </div>

      <BaseButton
        {...commonBtnProps}
        text={t("toggles.browse")}
        color={mode === "browse" ? "primary" : "gray"}
        onClick={() => handleClick("browse")}
        className="rounded-full transition-all font-bold px-2 py-1 sm:px-4 sm:py-2"
      />
    </div>
  );
};

export default ModeSwitch;
