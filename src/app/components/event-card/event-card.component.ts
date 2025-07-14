import { DatePipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { UserEvent } from '../../models/interfaces';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-event-card',
  imports: [
    CardModule,
    ButtonModule,
    DatePipe,
    AvatarModule,
    TooltipModule,
    TagModule,
    SlicePipe,
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  userEvent = input.required<UserEvent>();

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/600x400';
  }

  likeEvent(eventId: string) {
    console.log(eventId);
  }
}
