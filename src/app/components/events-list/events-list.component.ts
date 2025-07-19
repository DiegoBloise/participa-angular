import { Component, inject, OnInit } from '@angular/core';
import { UserEvent } from '../../models/interfaces';
import { EventService } from '../../services/event/event.service';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-events-list',
  imports: [EventCardComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  private eventService: EventService = inject(EventService);

  events?: UserEvent[];

  ngOnInit(): void {
    this.eventService
      .getEvents()
      .subscribe((data: UserEvent[]) => (this.events = data));
  }
}
