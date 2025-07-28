import { Component, inject, OnInit, signal } from '@angular/core';
import { UserEvent } from '../../models/interfaces';
import { EventService } from '../../services/event/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-events-list',
  imports: [EventCardComponent],
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
