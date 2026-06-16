import React, { createContext, useContext, ReactNode } from "react";
import { useAudioPlayer, AudioPlayer } from "expo-audio";
import { useSettings } from "./SettingsContext";

// Drop your own short clips into this Snack project at these exact paths
// (Assets panel -> Add file) — these requires just point at them.
const confirmSource = require("../assets/sounds/confirm.wav");
const errorSource = require("../assets/sounds/error.wav");
const successSource = require("../assets/sounds/success.wav");

interface SoundEffectsContextValue {
  playConfirm: () => void;
  playError: () => void;
  playSaveSuccess: () => void;
}

const SoundEffectsContext = createContext<SoundEffectsContextValue | undefined>(undefined);

// Loads every sound once, for the whole app. useAudioPlayer() ties each
// player's lifecycle to this component, which only unmounts when the app
// itself closes, so there's no manual load/unload bookkeeping needed.
// Must sit inside <SettingsProvider> since it reads the soundEnabled
// setting via useSettings().
export function SoundEffectsProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const confirmPlayer = useAudioPlayer(confirmSource);
  const errorPlayer = useAudioPlayer(errorSource);
  const successPlayer = useAudioPlayer(successSource);

  // Unlike expo-av, expo-audio doesn't reset playback position automatically
  // once a sound finishes — it just stays paused at the end. So every play
  // has to rewind to the start first, otherwise the second play of the same
  // sound would do nothing.
  function play(player: AudioPlayer) {
    if (!settings.soundEnabled) return;
    player.seekTo(0).catch(() => {});
    player.play();
  }

  const value: SoundEffectsContextValue = {
    playConfirm: () => play(confirmPlayer),
    playError: () => play(errorPlayer),
    playSaveSuccess: () => play(successPlayer),
  };

  return <SoundEffectsContext.Provider value={value}>{children}</SoundEffectsContext.Provider>;
}

export function useSoundEffects() {
  const ctx = useContext(SoundEffectsContext);
  if (!ctx) {
    throw new Error("useSoundEffects() must be called inside a <SoundEffectsProvider>");
  }
  return ctx;
}
