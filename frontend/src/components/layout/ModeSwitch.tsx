import { BaseButton } from "components";
import { ViewMode } from "types";
import clsx from "clsx";
import { useAppDispatch, useAppSelector, setMode } from "store";

interface ModeSwitchProps {
  className?: string;
}

export default function ModeSwitch({ className = "" }: ModeSwitchProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.mode);

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
      <BaseButton
        {...commonBtnProps}
        text="LIVE"
        color={mode === "live" ? "primary" : "gray"}
        onClick={() => handleClick("live")}
        className={clsx(
          "rounded-full transition-all",
          mode === "live" && "font-bold"
        )}
      />

      <BaseButton
        {...commonBtnProps}
        text="BROWSE"
        color={mode === "browse" ? "primary" : "gray"}
        onClick={() => handleClick("browse")}
        className={clsx(
          "rounded-full transition-all",
          mode === "browse" && "font-bold"
        )}
      />
    </div>
  );
}
