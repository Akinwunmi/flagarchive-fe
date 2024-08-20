import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { EntityEffects } from './state/effects';
import { reducer } from './state/reducers';

function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'i18n/');
}

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
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
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ app: reducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
