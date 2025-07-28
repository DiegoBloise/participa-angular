import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEventButtonComponent } from './share-event-button.component';

describe('ShareButtonComponent', () => {
  let component: ShareEventButtonComponent;
  let fixture: ComponentFixture<ShareEventButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareEventButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
