# CryptoHomes DXB - Mobile App Wrapper

A React Native (Expo) WebView wrapper for the CryptoHomes DXB web application.

## Features

- 🌐 WebView wrapper pointing to https://cryptohomes-theta.vercel.app/
- 📱 All links open internally (no external browser)
- 🔄 Auto-loads main page on app open
- ⬅️ Android back button support for navigation
- 🎨 Dark theme matching the web app
- 📲 Optimized for iPhone and latest Android phones

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Building APK

### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build -p android --profile apk
```

### Local Build (Requires Android Studio)

```bash
# Generate native Android project
npx expo prebuild

# Build APK
cd android && ./gradlew assembleRelease
```

## Configuration

The app URL can be changed in `App.js`:

```javascript
const APP_URL = 'https://cryptohomes-theta.vercel.app/';
```

## App Icons

Replace the following files in `/assets` with your custom icons:
- `icon.png` - Main app icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `splash.png` - Splash screen image (1242x2436)
- `favicon.png` - Web favicon (48x48)

## License

Private - CryptoHomes DXB
