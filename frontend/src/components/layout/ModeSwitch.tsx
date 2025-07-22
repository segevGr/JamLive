import { BaseButton } from "components";
import { ViewMode } from "types/viewMode.types";
import { logout, setMode, useAppDispatch, useAppSelector } from "store";
import clsx from "clsx";

interface ModeSwitchProps {
  mode: ViewMode;
  className?: string;
}

export default function ModeSwitch({ mode, className = "" }: ModeSwitchProps) {
  const commonBtnProps = {
    fullWidth: false,
    size: "sm" as const,
  };

  const dispatch = useAppDispatch();
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
        onClick={() => mode !== "live" && dispatch(setMode("live"))}
        className={clsx(
          "rounded-full transition-all",
          mode === "live" && "font-bold"
        )}
      />

      <BaseButton
        {...commonBtnProps}
        text="BROWSE"
        color={mode === "browse" ? "primary" : "gray"}
        onClick={() => mode !== "browse" && dispatch(setMode("browse"))}
        className={clsx(
          "rounded-full transition-all",
          mode === "browse" && "font-bold"
        )}
      />
    </div>
  );
}
