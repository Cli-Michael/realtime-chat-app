💬 Chat App — Real-time Messaging with Firebase & React

A sleek, responsive real-time chat application built with React and Firebase. It supports public and private chat rooms, real-time messaging, push notifications, and user presence tracking.

✨ Features

✅ Firebase Authentication for secure login  
✅ Real-time chat powered by Firebase Realtime Database  
✅ Online/offline presence indicators  
✅ Profile avatar uploads using Firebase Storage  
✅ Push notifications via Firebase Cloud Messaging (FCM)  
✅ Modular and reusable React components  
✅ Clean SCSS styling and theming support  

🧰 Tech Stack

⚛️ React (Hooks + Context API)  
🔥 Firebase (Auth, Database, Functions, Storage, Messaging)  
🎨 SCSS (modular styling)  
🧹 ESLint + Prettier for code quality and formatting  

📁 Project Structure

📂 public/ – Static assets (favicon, index.html, logos, manifest)  
📂 src/ – React app source code  
   ├── App.js / index.js – App entry  
   ├── components/ – Shared UI + chat modules  
   ├── context/ – Context for global state (profile, room, etc.)  
   ├── misc/ – Custom hooks, Firebase config, utilities  
   ├── pages/ – Sign-in page and chat view  
   └── styles/ – SCSS styling and overrides  
📂 functions/ – Firebase Cloud Functions backend  
📂 build/ – Production build output (ignored in version control)  
📝 Configs – .gitignore, .eslintrc, .prettierrc, firebase.json, etc.  

🚀 Getting Started

📦 Clone the repository and install dependencies:  
git clone https://github.com/michael-clinton-sudo/realtime-chat-app.git  
cd chat-app  
npm install

🔐 Configure Firebase credentials:  
Update `src/misc/firebase.js` with your Firebase config.  
Ensure `functions/service-account.json` exists (not committed).

👨‍💻 Start the app locally:  
npm start

🏗️ Build and deploy:  
npm run build  
firebase deploy --only hosting

☁️ Deploy Cloud Functions:  
firebase deploy --only functions

🔔 Push Notifications

Enable FCM in your Firebase console.  
Generate and configure a Web Push certificate (VAPID key).  
Update `firebase-messaging-sw.js` and `functions/src/fcm.js` with credentials.

📄 License

MIT License – Use freely with attribution ✌️
