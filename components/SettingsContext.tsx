import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppSettings, DEFAULT_SETTINGS, TEXT_SIZE_PX } from "../types/settings";

interface SettingsContextValue {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  // How much to multiply every font size by, relative to "Medium".
  // e.g. "lg" -> 19 / 16 = 1.1875
  textScale: number;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const textScale = TEXT_SIZE_PX[settings.textSize] / TEXT_SIZE_PX.md;

  return (
    <SettingsContext.Provider value={{ settings, setSettings, textScale }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Lets any component grab settings/textScale with one line:
// const { textScale } = useSettings();
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings() must be called inside a <SettingsProvider>");
  }
  return ctx;
}