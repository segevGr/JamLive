export const BUTTON_COLORS = [
  "primary",
  "red",
  "gray",
  "green",
  "error",
] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface BaseButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
}
