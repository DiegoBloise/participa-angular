import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserEvent } from '../../models/interfaces';
import { EventService } from '../../services/event/event.service';
import { EventCardSkeletonComponent } from '../event-card-skeleton/event-card-skeleton.component';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-events-list',
  imports: [EventCardComponent, EventCardSkeletonComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  private eventService: EventService = inject(EventService);
  private messageService = inject(MessageService);

  events = signal<UserEvent[]>([]);

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => {
        console.error('Erro ao buscar eventos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os eventos.',
        });
      },
    });
  }
}
