import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useSettings } from "./SettingsContext";

// RN's own default Text font size, used when a Text has no explicit fontSize.
const DEFAULT_FONT_SIZE = 14;

// Drop-in replacement for RN's <Text>. Reads the current text-size setting
// from SettingsContext and multiplies whatever fontSize the style was going
// to use. Every other prop/style is passed through untouched.
export function ScaledText({ style, ...rest }: TextProps) {
  const { textScale } = useSettings();

  const flattened = StyleSheet.flatten(style) || {};
  const baseFontSize = flattened.fontSize ?? DEFAULT_FONT_SIZE;

  return (
    <RNText {...rest} style={[style, { fontSize: baseFontSize * textScale }]} />
  );
}