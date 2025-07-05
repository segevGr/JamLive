import { ButtonColor, ButtonSize } from "./buttonTypes";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
}

export default function PrimaryButton({
  text,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = true,
  color = "primary",
  size = "md",
}: PrimaryButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  const sizeClass =
    size === "sm"
      ? "text-sm px-3 py-2"
      : size === "lg"
      ? "text-xl px-6 py-4"
      : "text-xl px-4 py-5 md:py-3";

  const baseClass = `font-semibold rounded-2xl transition ${widthClass} ${sizeClass}`;

  const colorClass = disabled
    ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
    : color === "red"
    ? "bg-red-600 hover:bg-red-700 text-white"
    : color === "gray"
    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
    : "bg-primaryLight hover:bg-primary text-textOnDark";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${colorClass}`}
    >
      {text}
    </button>
  );
}
