import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';

import { APP_CONFIG } from './app.config';
import { serverRoutes } from './app.routes.server';
import { FIREBASE_CONFIG } from './firebase.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
  ],
};

export const config = mergeApplicationConfig(APP_CONFIG, serverConfig);
