import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '404',
    renderMode: RenderMode.Client,
  },
  {
    path: 'create',
    renderMode: RenderMode.Client,
  },
  {
    path: 'login',
    renderMode: RenderMode.Client,
  },
  {
    path: 'discover/entity/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'redirect',
    renderMode: RenderMode.Server,
    status: 301,
  },
  {
    path: 'error',
    renderMode: RenderMode.Server,
    status: 404,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
