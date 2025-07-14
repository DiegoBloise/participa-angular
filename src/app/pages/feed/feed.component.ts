import { Component } from '@angular/core';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { data } from '../../models/data';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { UserEvent } from '../../models/interfaces';

@Component({
  selector: 'feed',
  imports: [TopbarComponent, EventCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  events: UserEvent[] = data;
}
