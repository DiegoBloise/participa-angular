import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { data } from '../../models/data';
import { UserEvent } from '../../models/interfaces';

@Component({
  selector: 'feed',
  imports: [
    TopbarComponent,
    EventCardComponent,
    ButtonModule,
    SpeedDialModule,
    ToastModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  providers: [MessageService],
})
export class FeedComponent implements OnInit {
  events: UserEvent[] = data;

  items: MenuItem[] | null = null;

  value1: string | undefined;

  value2: string | undefined;

  value3: string | undefined;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Criar Evento',
        icon: 'pi pi-plus',
        command: () => this.createEvent(),
      },
      {
        label: 'Modificar Evento',
        icon: 'pi pi-pencil',
        command: () => this.updateEvent(),
      },
    ];
  }

  createEvent() {
    this.messageService.add({
      severity: 'success',
      summary: 'Evento Criado',
      detail: 'O evento foi criado com sucesso!',
    });
  }

  updateEvent() {
    this.messageService.add({
      severity: 'info',
      summary: 'Evento Atualizado',
      detail: 'O evento foi atualizado com sucesso!',
    });
  }
}
