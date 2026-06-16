export type TextSize = "sm" | "md" | "lg" | "xl";

export interface AppSettings {
  textSize: TextSize;
  soundEnabled: boolean;
  brightness: number; // 0.4 (dimmest) – 1 (full brightness, no dimming)
}

export const DEFAULT_SETTINGS: AppSettings = {
  textSize: "md",
  soundEnabled: true,
  brightness: 1,
};

export const TEXT_SIZE_PX: Record<TextSize, number> = {
  sm: 13,
  md: 16,
  lg: 19,
  xl: 22,
};

// The dim overlay never goes fully opaque/black — capping the low end keeps
// the screen readable even at the lowest setting.
export const MIN_BRIGHTNESS = 0.4;
export const MAX_BRIGHTNESS = 1;