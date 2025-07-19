import { Component, OnInit, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-actions',
  imports: [
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    SpeedDialModule,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent implements OnInit {
  items: MenuItem[] | null = null;

  updateEvent = output();
  createEvent = output();

  ngOnInit(): void {
    this.items = [
      {
        label: 'Criar Evento',
        icon: 'pi pi-plus',
        command: () => this.createEvent.emit(),
      },
      {
        label: 'Modificar Evento',
        icon: 'pi pi-pencil',
        command: () => this.updateEvent.emit(),
      },
    ];
  }
}
