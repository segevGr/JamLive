export const BUTTON_COLORS = ["primary", "red", "gray"] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_SIZE = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZE)[number];
