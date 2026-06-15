# HR Directory — Expo / Snack Port

A React Native port of the Red Opal Innovations HR Directory app,
ready to run in Snack Expo (https://snack.expo.dev).

---

## Files to create in Snack

Create each file in Snack's editor with the exact paths below:

```
App.tsx
components/HomeTab.tsx
components/SearchTab.tsx
components/ContactDetail.tsx
components/ContactForm.tsx
components/ActionsTab.tsx       ← also contains ConfirmDialog
components/SettingsTab.tsx
types/index.ts
```

Start with `App.tsx` (Snack uses this as its entry point automatically).

---

## Dependencies to add in Snack

Open the **Dependencies** panel (left sidebar) and add:

| Package                        | Version  |
|-------------------------------|----------|
| `@react-native-picker/picker` | `2.7.5`  |

Everything else used (`@expo/vector-icons`, `react-native` core, etc.)
is already included in Snack by default.

---

## What was changed from the original

| Original (web)              | React Native replacement          |
|-----------------------------|-----------------------------------|
| `div` / `span`              | `View` / `Text`                   |
| `button`                    | `TouchableOpacity`                |
| `input` / `select`          | `TextInput` / `Picker`            |
| Tailwind CSS classes        | `StyleSheet.create({})`           |
| `lucide-react` icons        | `@expo/vector-icons` (Ionicons)   |
| `localStorage`              | In-memory state (no persistence)  |
| `window.innerWidth`         | Not needed (dropped tablet split) |
| CSS animations              | Not needed (dropped)              |
| Web Audio API (sounds)      | Dropped (not available in Expo Go)|
| `fixed` overlay (dialog)    | `Modal` component                 |
| `overflow-y-auto`           | `ScrollView` / `FlatList`         |

---

## Notes

- **Sound effects** were removed. The original used the Web Audio API
  which is not available in React Native. You could add sounds later
  using `expo-av`.

- **Settings persistence** was removed (original used `localStorage`).
  To add it back, install `@react-native-async-storage/async-storage`
  and load/save settings in `SettingsTab.tsx`.

- **Text size setting** stores the preference in state but does not
  currently propagate the font size down to all components. That would
  require passing the `textSize` value through props or a Context.

- The **tablet split-panel layout** was dropped. On mobile, the app
  uses a simple stack: list → detail → form.
