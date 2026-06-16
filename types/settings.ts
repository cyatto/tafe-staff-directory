export type TextSize = "sm" | "md" | "lg" | "xl";

export interface AppSettings {
  textSize: TextSize;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  textSize: "md",
  soundEnabled: true,
};

export const TEXT_SIZE_PX: Record<TextSize, number> = {
  sm: 13,
  md: 16,
  lg: 19,
  xl: 22,
};