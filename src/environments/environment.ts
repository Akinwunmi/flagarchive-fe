export const environment = {
  firebaseConfig: {
    apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
    appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
    authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
    measurementId: import.meta.env['NG_APP_FIREBASE_MEASUREMENT_ID'],
    messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
    projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
    storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
  },
};
