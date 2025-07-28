import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: 'event/:eventId',
    loadComponent: () =>
      import('./pages/event/event.component').then((m) => m.EventComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
