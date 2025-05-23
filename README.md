# Voice Todo App

A beautifully designed voice-enabled Todo app built using **React Native**, with support for **TTS (Text-to-Speech)**, **persistent storage**, and a **glassmorphic UI**.

## ✨ Features

- 📋 Add, edit, complete, and delete tasks
- 🔊 Read tasks aloud using `react-native-tts`
- 🧠 Saves tasks and login state with `AsyncStorage`
- 🔒 Simple login (hardcoded for demo)
- 💎 Glassmorphism UI with `BlurView` and `LinearGradient`
- 🔐 Logout functionality

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [@react-native-community/blur](https://github.com/react-native-community/react-native-blur)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- [react-native-tts](https://github.com/ak1394/react-native-tts)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## 🔧 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/voice-todo-app.git
   cd voice-todo-app
2. Install dependencies:
   ```bash
   npm install
3. Install Pods (iOS only):
   ```bash
   cd ios && pod install && cd ..

4. Run the app:
   ```bash
   npx react-native run-ios
   # or for android
   npx react-native run-android

🔑 Default Credentials
Email: test@example.com
Password: 123456
