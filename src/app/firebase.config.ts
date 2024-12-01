import { FirebaseOptions } from '@angular/fire/app';

export const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
  appId: process.env['NG_APP_FIREBASE_APP_ID'],
  authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
  measurementId: process.env['NG_APP_FIREBASE_MEASUREMENT_ID'],
  messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
  projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
};
