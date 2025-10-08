# DSW02B1_Test2_223070310
Development Software 2B Semester Test 2


# ShopEZ (Expo)

## Overview
ShopEZ is an Expo React Native app (ShopEZ) using Firebase Authentication (Email/Password) and Firebase Realtime Database to store per-user cart data. Products are fetched from the Fake Store API.

# Setup
1. Clone or unzip project.
2. Run `npm install` or `yarn`.
3. Create a Firebase project and enable:
   - Authentication (Email/Password)
   - Realtime Database
4. Copy your Firebase config to `firebase.js` (see placeholder).
5. Run with Expo:
   - `npx expo start` and test on emulator/device.

# Notes
- Cart data stored under `/carts/{uid}/` in Firebase Realtime DB.
- App persists cart locally via AsyncStorage for offline use.
- Replace Firebase config placeholders before running.
