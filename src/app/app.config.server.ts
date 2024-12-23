import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';

import { APP_CONFIG } from './app.config';
import { serverRoutes } from './app.routes.server';

const SERVER_CONFIG: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerRoutesConfig(serverRoutes)],
};

export const config = mergeApplicationConfig(APP_CONFIG, SERVER_CONFIG);