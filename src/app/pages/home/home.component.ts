import { Component, inject, OnInit, signal } from '@angular/core';
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

  minStartDate = signal<Date | null>(null);
  minEndDate = signal<Date | null>(null);

  categories = signal<Category[]>([]);
  createdEvent = signal<CreatedEvent>({} as CreatedEvent);

  formSubmitted = signal<boolean>(false);
  eventDetailsDialog = signal<boolean>(false);
  eventCreatedDialog = signal<boolean>(false);
  updateEventDialog = signal<boolean>(false);

  selectedEventId = signal<string | undefined>(undefined);

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
    this.loadCategories();

    this.eventForm.get('startAt')?.valueChanges.subscribe((startAt) => {
      const endAtControl = this.eventForm.get('endAt');

      if (startAt) {
        const date = new Date(startAt);
        if (!isNaN(date.getTime())) {
          date.setMinutes(date.getMinutes() + 30);
          this.minEndDate.set(date);
          endAtControl?.enable();
        } else {
          this.minEndDate.set(null);
          endAtControl?.disable();
        }
      } else {
        this.minEndDate.set(null);
        endAtControl?.disable();
      }
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar as categorias.',
        });
      },
    });
  }

  onSubmit() {
    this.formSubmitted.set(true);
    if (!this.eventForm.valid) return;

    const eventData = this.eventForm.value as UserEvent;
    const isEditing = !!this.selectedEventId();
    const request$ = isEditing
      ? this.eventService.updateEvent({
          ...eventData,
          id: this.selectedEventId(),
        })
      : this.eventService.createEvent(eventData);

    request$.subscribe((data: CreatedEvent) => {
      this.createdEvent.set(data);

      this.messageService.add({
        severity: isEditing ? 'info' : 'success',
        summary: isEditing ? 'Evento Atualizado' : 'Evento Criado',
        detail: isEditing
          ? 'O evento foi atualizado com sucesso!'
          : 'O evento foi criado com sucesso!',
      });

      this.router.navigate(['/event', data.eventId]);
      if (!isEditing) this.showEventCreatedDialog();

      this.reset();
    });
  }

  onUpdateEventSubmit() {
    this.formSubmitted.set(true);
    if (this.updateEventForm.valid) {
      this.eventService
        .getEventByAccessCode(
          this.updateEventForm.get('accessCode')?.value as string
        )
        .subscribe((data: UserEvent) => {
          this.selectedEventId.set(data.id);
          this.eventForm.patchValue(data);
          this.hideUpdateEventDialog();
          this.createEvent();
        });
    }
  }

  createEvent() {
    this.minStartDate.set(new Date());
    this.showEventDetailsDialog();
  }

  updateEvent() {
    this.showUpdateEventDialog();
  }

  showEventDetailsDialog() {
    this.eventDetailsDialog.set(true);
  }

  hideEventDetailsDialog() {
    this.eventDetailsDialog.set(false);
  }

  showEventCreatedDialog() {
    this.eventCreatedDialog.set(true);
  }

  hideEventCreatedDialog() {
    this.eventCreatedDialog.set(false);
  }

  showUpdateEventDialog() {
    this.updateEventDialog.set(true);
  }

  hideUpdateEventDialog() {
    this.updateEventForm.reset();
    this.updateEventDialog.set(false);
  }

  isInvalid(controlPath: string): boolean {
    const control = this.eventForm.get(controlPath);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.formSubmitted())
    );
  }

  isInvalidAccessCode(controlPath: string): boolean {
    const control = this.updateEventForm.get(controlPath);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.formSubmitted())
    );
  }

  reset() {
    this.hideEventDetailsDialog();
    this.updateEventForm.reset();
    this.selectedEventId.set(undefined);
    this.eventForm.reset();
    this.eventForm.patchValue({
      maxParticipants: 2,
    });
    this.formSubmitted.set(false);
  }

  copyCodeHandler() {
    try {
      navigator.clipboard.writeText(this.createdEvent().accessCode as string);
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
