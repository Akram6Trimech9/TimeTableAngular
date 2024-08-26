import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateEmploiComponent } from './date-emploi.component';

describe('DateEmploiComponent', () => {
  let component: DateEmploiComponent;
  let fixture: ComponentFixture<DateEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateEmploiComponent]
    });
    fixture = TestBed.createComponent(DateEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
