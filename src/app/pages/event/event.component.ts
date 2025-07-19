import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { UserEvent } from '../../models/interfaces';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event',
  imports: [
    CardModule,
    ButtonModule,
    DatePipe,
    AvatarModule,
    TooltipModule,
    TagModule,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  private eventService: EventService = inject(EventService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  userEvent!: UserEvent;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getEventById(params['eventId']).subscribe((data) => {
        this.userEvent = data;
      });
    });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/600x400';
  }
}
