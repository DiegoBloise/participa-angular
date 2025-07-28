import { Component, inject, input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-share-event-button',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './share-event-button.component.html',
  styleUrl: './share-event-button.component.css',
})
export class ShareEventButtonComponent {
  private messageService = inject(MessageService);

  eventId = input.required<string>();

  copyEventURLHandler() {
    try {
      navigator.clipboard.writeText(
        `${window.location.origin}/event/${this.eventId()}`
      );
      this.messageService.add({
        severity: 'info',
        summary: 'Evento copiado',
        detail: 'Link do evento foi copiado para a área de transferencia!',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
