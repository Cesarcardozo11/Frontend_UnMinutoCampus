import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * Configuración global del árbol de inyección de dependencias para la aplicación Angular.
 *
 * Proveedores registrados:
 * - `provideRouter`: Habilita el sistema de navegación y enrutamiento SPA basado en `routes`.
 * - `provideHttpClient`: Habilita el cliente HTTP global para la comunicación con APIs externas.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
};
