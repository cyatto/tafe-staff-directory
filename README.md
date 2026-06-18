# HR Staff Directory

A mobile staff directory app built with React Native and Expo. Browse, search, add, edit, and delete staff contacts, with accessibility settings for text size, brightness, and sound effects.

## Features

- **Directory**: view main listing of all staff members sorted alphabetically by first name
- **Search**: find staff by name, phone, department, or city, with department filter chips
- **Actions**: add, edit, or delete the selected contact
- **Settings**: adjust text size, screen brightness, and toggle sound effects for delete confirmations, contact form validation errors, and successful contact saves.

## Dependencies

These dependencies (libraries and packages) are required for the build to run correctly. Add the following to the `package.json` file if not already present.

```json
  "dependencies": {
    "expo": "~54.0.35",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "expo-asset": "~12.0.13",
    "expo-audio": "~1.1.1",
    "@expo/vector-icons": "^15.0.3",
    "react-native-paper": "4.9.2",
    "@react-native-picker/picker": "2.11.1",
    "@react-native-community/slider": "5.2.0"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "typescript": "~5.9.2"
  }
```

## How to Run

1. Go to [snack.expo.dev](https://snack.expo.dev) and create a new Snack.
2. Create each file in the source code with the exact same name and folder path.
3. Ensure all dependencies above are added in the Dependencies panel (`package.json`).
4. Scan the QR code with Expo Go on your phone or tablet, or use the in-browser preview.

## Known Limitations (dev build)

- Data is stored in memory only: refreshing or reloading the app resets contacts and settings back to defaults.
- No backend/remote database is connected; all data lives locally within the app session.