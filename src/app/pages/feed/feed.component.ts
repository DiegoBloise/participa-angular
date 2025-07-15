import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SpeedDialModule } from 'primeng/speeddial';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { categorias, events } from '../../models/data';
import { Category, UserEvent } from '../../models/interfaces';

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
    DialogModule,
    TextareaModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  providers: [MessageService],
})
export class FeedComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  events?: UserEvent[] = events;
  categorias?: Category[] = categorias;
  items: MenuItem[] | null = null;

  private formBuilder = inject(FormBuilder);

  eventForm = this.formBuilder.group({
    name: [
      '',
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(42),
    ],
    description: ['', Validators.maxLength(255)],
    banner: [''],
    maxParticipants: [2],
    startAt: ['', Validators.required],
    endAt: ['', Validators.required],
    location: [
      '',
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(42),
    ],
    organizer: this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      name: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(42),
      ],
      phone: [''],
    }),
    category: this.formBuilder.group({
      title: ['', Validators.required],
    }),
  });

  ngOnInit() {
    this.events = events;

    this.categorias = categorias;

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

  onSubmit() {
    console.log(this.eventForm.value);
  }

  createEvent() {
    this.showDialog();
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

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  cancel() {
    this.hideDialog();
    this.eventForm.reset();
    this.eventForm.patchValue({
      maxParticipants: 2,
    });
  }
}
