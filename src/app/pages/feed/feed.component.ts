import { Component } from '@angular/core';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'feed',
  imports: [TopbarComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
