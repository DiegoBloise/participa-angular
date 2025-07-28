import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-event-card-skeleton',
  imports: [SkeletonModule],
  templateUrl: './event-card-skeleton.component.html',
  styleUrl: './event-card-skeleton.component.css',
})
export class EventCardSkeletonComponent {}
