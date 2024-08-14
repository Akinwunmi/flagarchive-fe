import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { EntityEffects } from './state/effects';
import { reducer } from './state/reducers';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideEffects(EntityEffects),
    provideFirebaseApp(() => initializeApp({
      apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
      appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
      authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
      measurementId: import.meta.env['NG_APP_FIREBASE_MEASUREMENT_ID'],
      messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
      projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
      storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
    })),
    provideFirestore(() => getFirestore()),
    provideRouter(routes),
    provideStore({ app: reducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
