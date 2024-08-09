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
      apiKey: 'AIzaSyBZzwMsFmhsl0g8BvCCsFrCpnEMawVkCeo',
      appId: '1:1076024154430:web:bc11a9b5a6c9cd0ee5f46f',
      authDomain: 'flagarchive-database.firebaseapp.com',
      measurementId: 'G-169QS3QMGC',
      messagingSenderId: '1076024154430',
      projectId: 'flagarchive-database',
      storageBucket: 'flagarchive-database.appspot.com',
    })),
    provideFirestore(() => getFirestore()),
    provideRouter(routes),
    provideStore({ app: reducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
