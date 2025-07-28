import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardSkeletonComponent } from './event-card-skeleton.component';

describe('EventCardSkeletonComponent', () => {
  let component: EventCardSkeletonComponent;
  let fixture: ComponentFixture<EventCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
