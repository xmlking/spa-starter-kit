import { provideRouter, RouterConfig } from '@angular/router';

import { ExperimentsRoutes } from './experiments/experiments.routes';
import { HomeRoutes }       from './home/home.routes';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...ExperimentsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
  // to debug routes
  // provideRouter(routes, {enableTracing: true})
];
