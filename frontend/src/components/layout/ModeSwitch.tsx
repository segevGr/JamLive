import { BaseButton } from "components";
import { ViewMode } from "types/";
import clsx from "clsx";

interface ModeSwitchProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export default function ModeSwitch({
  mode,
  onChange,
  className = "",
}: ModeSwitchProps) {
  const commonBtnProps = {
    fullWidth: false,
    size: "sm" as const,
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
        onClick={() => mode !== "live" && onChange("live")}
        className={clsx(
          "rounded-full transition-all",
          mode === "live" && "font-bold"
        )}
      />

      <BaseButton
        {...commonBtnProps}
        text="BROWSE"
        color={mode === "browse" ? "primary" : "gray"}
        onClick={() => mode !== "browse" && onChange("browse")}
        className={clsx(
          "rounded-full transition-all",
          mode === "browse" && "font-bold"
        )}
      />
    </div>
  );
}
