import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { EventComponent } from './pages/event/event.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  { path: 'event/:eventId', component: EventComponent },
];
