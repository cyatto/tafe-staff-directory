import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { ScaledText as Text } from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { TextSize, AppSettings, DEFAULT_SETTINGS, TEXT_SIZE_PX, MIN_BRIGHTNESS, MAX_BRIGHTNESS } from "../types/settings";

// Re-exported so existing imports elsewhere (e.g. `import { AppSettings } from "./components/SettingsTab"`)
// keep working without changes.
export { TextSize, AppSettings, DEFAULT_SETTINGS, TEXT_SIZE_PX };

const TEXT_SIZE_OPTIONS: { id: TextSize; label: string; sampleSize: number }[] = [
  { id: "sm", label: "Small",   sampleSize: 14 },
  { id: "md", label: "Medium",  sampleSize: 18 },
  { id: "lg", label: "Large",   sampleSize: 22 },
  { id: "xl", label: "X-Large", sampleSize: 28 },
];

interface Props {
  settings: AppSettings;
  onChange: (s: AppSettings) => void;
}

export function SettingsTab({ settings, onChange }: Props) {
  function set<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Red Opal Innovations</Text>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSub}>Accessibility &amp; preferences</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>

        {/* Text Size */}
        <View style={styles.sectionRow}>
          <Ionicons name="text-outline" size={13} color="#931c21" />
          <Text style={styles.sectionTitle}>Text Size</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.textSizeGrid}>
            {TEXT_SIZE_OPTIONS.map((opt) => {
              const active = settings.textSize === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.sizeOption, active && styles.sizeOptionActive]}
                  onPress={() => set("textSize", opt.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sizeOptionSample, { fontSize: opt.sampleSize }, active && styles.sizeOptionSampleActive]}>
                    A
                  </Text>
                  <Text style={[styles.sizeOptionLabel, active && styles.sizeOptionLabelActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Brightness */}
        <View style={styles.sectionRow}>
          <Ionicons name="sunny-outline" size={13} color="#931c21" />
          <Text style={styles.sectionTitle}>Brightness</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.brightnessRow}>
            <Ionicons name="sunny-outline" size={16} color="#7a4a52" />
            <Slider
              style={styles.slider}
              minimumValue={MIN_BRIGHTNESS}
              maximumValue={MAX_BRIGHTNESS}
              step={0.05}
              value={settings.brightness}
              onValueChange={(v) => set("brightness", v)}
              minimumTrackTintColor="#931c21"
              maximumTrackTintColor="rgba(147,28,33,0.15)"
              thumbTintColor="#931c21"
            />
            <Ionicons name="sunny" size={20} color="#7a4a52" />
          </View>
          <Text style={styles.brightnessValue}>
            {Math.round(((settings.brightness - MIN_BRIGHTNESS) / (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) * 100)}%
          </Text>
        </View>

        {/* Sound */}
        <View style={styles.sectionRow}>
          <Ionicons name={settings.soundEnabled ? "volume-high-outline" : "volume-mute-outline"} size={13} color="#931c21" />
          <Text style={styles.sectionTitle}>Sound</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Sound effects</Text>
              <Text style={styles.settingSub}>
                {settings.soundEnabled
                  ? "Plays for confirmations, errors and successful saves"
                  : "Sound effects are muted"}
              </Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(v) => set("soundEnabled", v)}
              trackColor={{ false: "#d4a0aa", true: "#931c21" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.sectionRow}>
          <Ionicons name="information-circle-outline" size={13} color="#931c21" />
          <Text style={styles.sectionTitle}>About</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.aboutRow}>
            <View style={styles.appIconBox}>
              <Ionicons name="people-outline" size={24} color="#931c21" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.appName}>HR Directory</Text>
              <Text style={styles.appOrg}>Red Opal Innovations</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Version</Text>
            <Text style={styles.metaValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Platform</Text>
            <Text style={styles.metaValue}>React Native / Expo</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f5f5" },
  header: {
    backgroundColor: "#931c21",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    gap: 2,
  },
  headerLabel: {
    fontSize: 11, fontWeight: "600", letterSpacing: 2,
    color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)" },
  body: { flex: 1 },
  bodyContent: { padding: 16, gap: 10, paddingBottom: 32 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 4 },
  sectionTitle: {
    fontSize: 11, fontWeight: "700", textTransform: "uppercase",
    letterSpacing: 1.5, color: "#7a4a52",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  textSizeGrid: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
  },
  brightnessRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 10,
  },
  slider: { flex: 1, height: 36 },
  brightnessValue: {
    fontSize: 12,
    color: "#7a4a52",
    textAlign: "center",
    paddingBottom: 12,
  },
  sizeOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(147,28,33,0.12)",
    gap: 4,
  },
  sizeOptionActive: {
    borderColor: "#931c21",
    backgroundColor: "#fdf0f2",
  },
  sizeOptionSample: { fontWeight: "700", color: "#7a4a52" },
  sizeOptionSampleActive: { color: "#931c21" },
  sizeOptionLabel: { fontSize: 10, color: "#7a4a52", fontWeight: "600" },
  sizeOptionLabelActive: { color: "#931c21" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  settingInfo: { flex: 1 },
  settingName: { fontSize: 15, fontWeight: "600", color: "#1a0a0d" },
  settingSub: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  appIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#fdf0f2",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: { fontSize: 16, fontWeight: "700", color: "#1a0a0d" },
  appOrg: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  divider: { height: 1, backgroundColor: "rgba(147,28,33,0.07)", marginHorizontal: 16 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  metaLabel: { fontSize: 14, color: "#7a4a52" },
  metaValue: { fontSize: 14, fontWeight: "600", color: "#1a0a0d" },
});