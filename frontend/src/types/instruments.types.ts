export const instruments = [
  "Drums",
  "Guitar",
  "Bass",
  "Saxophone",
  "Keyboard",
  "Vocals",
] as const;

export type Instrument = (typeof instruments)[number];
