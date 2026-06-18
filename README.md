# HR Staff Directory

A mobile staff directory app built with React Native and Expo. Browse, search, add, edit, and delete staff contacts, with accessibility settings for text size, brightness, and sound effects.

## Features

- **Directory**: view all staff grouped alphabetically by name
- **Search**: find staff by name, phone, department, or city, with department filter chips
- **Actions**: add, edit, or delete the selected contact
- **Settings**: adjust text size, screen brightness, and toggle sound effects
- Confirmation dialog before deleting a contact, with a warning sound
- Form validation on all required fields (name, phone, address, postcode)

## How to Run

1. Go to [snack.expo.dev](https://snack.expo.dev) and create a new Snack.
2. Create each file above with the exact same name and folder path.
3. In the Dependencies panel (or by typing the import), add `expo-av` if it isn't already included.
4. Scan the QR code with Expo Go on your phone, or use the in-browser preview.

## Known Limitations

- Data is stored in memory only: refreshing or reloading the app resets contacts and settings back to defaults.
- No backend/remote database is connected; all data lives locally within the app session.