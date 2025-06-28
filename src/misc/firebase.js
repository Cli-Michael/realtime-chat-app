import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: "AIzaSyDASPK4-yEEwiPgDcfsIt0R_ecz4LQp37w",
  authDomain: "appauthen-cba78.firebaseapp.com",
  databaseURL: "https://appauthen-cba78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "appauthen-cba78",
  storageBucket: "appauthen-cba78.firebasestorage.app",
  messagingSenderId: "712428380339",
  appId: "1:712428380339:web:d83ec82f0df2f8232450c6"
};

export const fcmVapidKey =
  'BPklYQgYGDKxH1gBuWrVWNtcE7B4UfbB2nmPxGQV0Z4WwShE2-S9RU_Zggk8y93Yn0YVxLh5Bd8lEIoV0F4UcGg';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
