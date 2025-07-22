import { BaseButtonProps } from "components";
import clsx from "clsx";

export default function BaseButton({
  text,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = true,
  color = "primary",
  size = "md",
  className = "",
}: BaseButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  const sizeClass = {
    sm: "text-base px-3 py-2 sm:px-4 sm:py-2 sm:text-base",
    md: "text-base px-4 py-2 sm:px-6 sm:py-3 sm:text-lg",
    lg: "text-xl px-6 py-4",
  }[size];

  const colorClass = disabled
    ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
    : {
        red: "bg-red-600 hover:bg-red-700 text-white",
        gray: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        primary: "hover:bg-primaryLight bg-primary text-textOnDark",
        green: "bg-green hover:bg-green-dark text-white",
        error: "bg-errorText text-white",
      }[color];

  const baseClass = `font-semibold rounded-full shadow-md transition ${widthClass} ${sizeClass} ${colorClass}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClass, className)}
    >
      {text}
    </button>
  );
}
