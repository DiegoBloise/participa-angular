import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ActionsComponent } from '../../components/actions/actions.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { Category, CreatedEvent, UserEvent } from '../../models/interfaces';
import { CategoryService } from '../../services/category/category.service';
import { EventService } from '../../services/event/event.service';
import { endAfterStartValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    TopbarComponent,
    ActionsComponent,
    ButtonModule,
    ToastModule,
    MessageModule,
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
    InputMaskModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  constructor() {}

  minStartDate?: Date;
  minEndDate?: Date | null;

  categories?: Category[];
  createdEvent?: CreatedEvent;

  formSubmitted: boolean = false;
  eventDetailsDialog: boolean = false;
  eventCreatedDialog: boolean = false;
  updateEventDialog: boolean = false;

  selectedEventId?: string;

  eventForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(42)],
    ],
    description: ['', Validators.maxLength(255)],
    banner: [''],
    maxParticipants: [2],
    startAt: ['', Validators.required],
    endAt: ['', [Validators.required, endAfterStartValidator('startAt', 30)]],
    location: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(42)],
    ],
    organizer: this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      phone: [''],
    }),
    category: [{} as Category, Validators.required],
  });

  updateEventForm = this.formBuilder.group({
    accessCode: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
  });

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe((data: Category[]) => (this.categories = data));

    this.eventForm.get('startAt')?.valueChanges.subscribe((startAt) => {
      const endAtControl = this.eventForm.get('endAt');

      if (startAt) {
        const date = new Date(startAt);
        if (!isNaN(date.getTime())) {
          date.setMinutes(date.getMinutes() + 30);
          this.minEndDate = date;
          endAtControl?.enable();
        } else {
          this.minEndDate = null;
          endAtControl?.disable();
        }
      } else {
        this.minEndDate = null;
        endAtControl?.disable();
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.eventForm.valid) {
      if (this.selectedEventId) {
        this.eventService
          .updateEvent({
            ...(this.eventForm.value as UserEvent),
            id: this.selectedEventId,
          })
          .subscribe((data: CreatedEvent) => {
            this.createdEvent = data;
            this.messageService.add({
              severity: 'info',
              summary: 'Evento Atualizado',
              detail: 'O evento foi atualizado com sucesso!',
            });
            this.router.navigate([`/event/${this.createdEvent?.eventId}`]);
          });
      } else {
        this.eventService
          .createEvent(this.eventForm.value as UserEvent)
          .subscribe((data: CreatedEvent) => {
            this.createdEvent = data;
            this.messageService.add({
              severity: 'success',
              summary: 'Evento Criado',
              detail: 'O evento foi criado com sucesso!',
            });
            this.router.navigate([`/event/${this.createdEvent?.eventId}`]);
            this.showEventCreatedDialog();
          });
      }
      this.reset();
    }
  }

  onUpdateEventSubmit() {
    this.formSubmitted = true;
    if (this.updateEventForm.valid) {
      this.eventService
        .getEventByAccessCode(
          this.updateEventForm.get('accessCode')?.value as string
        )
        .subscribe((data: UserEvent) => {
          this.selectedEventId = data.id;
          this.eventForm.patchValue(data);
          this.hideUpdateEventDialog();
          this.createEvent();
        });
    }
  }

  createEvent() {
    this.minStartDate = new Date();
    this.showEventDetailsDialog();
  }

  updateEvent() {
    this.showUpdateEventDialog();
  }

  showEventDetailsDialog() {
    this.eventDetailsDialog = true;
  }

  hideEventDetailsDialog() {
    this.eventDetailsDialog = false;
  }

  showEventCreatedDialog() {
    this.eventCreatedDialog = true;
  }

  hideEventCreatedDialog() {
    this.eventCreatedDialog = false;
  }

  showUpdateEventDialog() {
    this.updateEventDialog = true;
  }

  hideUpdateEventDialog() {
    this.updateEventDialog = false;
  }

  isInvalid(controlPath: string): boolean {
    const control = this.eventForm.get(controlPath);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.formSubmitted)
    );
  }

  reset() {
    this.hideEventDetailsDialog();
    this.updateEventForm.reset();
    this.selectedEventId = undefined;
    this.eventForm.reset();
    this.eventForm.patchValue({
      maxParticipants: 2,
    });
    this.formSubmitted = false;
  }

  copyCodeHandler() {
    try {
      navigator.clipboard.writeText(this.createdEvent?.accessCode as string);
      this.messageService.add({
        severity: 'info',
        summary: 'Código copiado',
        detail: 'Código de acesso copiado para a área de transferencia!',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
