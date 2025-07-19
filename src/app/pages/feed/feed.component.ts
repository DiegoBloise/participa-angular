import { Component } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';

@Component({
  selector: 'feed',
  imports: [EventsListComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
