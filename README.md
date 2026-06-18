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

## How to Use the App

| Action | Steps |
|---|---|
| View all staff | Open the **Directory** tab |
| Find someone | Go to **Search**, type a name/phone/city, or tap a department chip |
| View full details | Tap any contact row |
| Add a new contact | Go to **Actions** → **Add Contact**, fill in the form, tap **Add Contact** |
| Edit a contact | Select a contact, go to **Actions** → **Edit Contact** (or tap **Edit** on their Detail screen) |
| Delete a contact | Select a contact → **Delete Contact** → confirm in the dialog |
| Change text size | Go to **Settings** → tap Small/Medium/Large/X-Large |
| Adjust brightness | Go to **Settings** → enter a number (30–100) in the brightness field |
| Mute sound effects | Go to **Settings** → toggle off **Confirm / Delete / Error Sounds** |

## Known Limitations

- Data is stored in memory only: refreshing or reloading the app resets contacts and settings back to defaults.
- No backend/remote database is connected; all data lives locally within the app session.