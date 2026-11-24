import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Configuración general de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // activa las rutas (cambiar de página)
    provideHttpClient(), // permite llamar al backend
  ],
};
