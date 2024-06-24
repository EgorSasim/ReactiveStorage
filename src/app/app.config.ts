import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { WEB_STORAGE_TOKEN } from './storage/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: WEB_STORAGE_TOKEN,
      useValue: localStorage,
    },
  ],
};
