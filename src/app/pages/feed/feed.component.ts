import { Component } from '@angular/core';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { data } from '../../models/data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DatePipe, SlicePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'feed',
  imports: [
    TopbarComponent,
    CardModule,
    ButtonModule,
    DatePipe,
    AvatarModule,
    TooltipModule,
    TagModule,
    SlicePipe,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  events = data;

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/600x400';
  }

  likeEvent(eventId: String) {
    console.log(eventId);
  }
}
