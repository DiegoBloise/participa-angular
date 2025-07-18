import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
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
import { SpeedDialModule } from 'primeng/speeddial';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { Category, UserEvent } from '../../models/interfaces';
import { EventService } from '../../services/event/event.service';
import { endAfterStartValidator } from '../../validators/date.validator';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'feed',
  imports: [
    TopbarComponent,
    EventCardComponent,
    ButtonModule,
    SpeedDialModule,
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
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  providers: [MessageService],
  standalone: true,
})
export class FeedComponent implements OnInit {
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);

  constructor() {}

  minStartDate?: Date;
  minEndDate?: Date | null;

  events?: UserEvent[];
  categories?: Category[];
  items: MenuItem[] | null = null;

  formSubmitted: boolean = false;

  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

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
          Validators.maxLength(42),
        ],
      ],
      phone: [''],
    }),
    category: this.formBuilder.group({
      title: ['', Validators.required],
    }),
  });

  ngOnInit() {
    this.eventService
      .getEvents()
      .subscribe((data: UserEvent[]) => (this.events = data));

    this.categoryService
      .getCategories()
      .subscribe((data: Category[]) => (this.categories = data));

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
      this.messageService.add({
        severity: 'success',
        summary: 'Evento Criado',
        detail: 'O evento foi criado com sucesso!',
      });
      this.reset();
    }
  }

  createEvent() {
    this.minStartDate = new Date();
    this.showDialog();
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

  isInvalid(controlPath: string): boolean {
    const control = this.eventForm.get(controlPath);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.formSubmitted)
    );
  }

  reset() {
    this.hideDialog();
    this.eventForm.reset();
    this.eventForm.patchValue({
      maxParticipants: 2,
    });
    this.formSubmitted = false;
  }
}
