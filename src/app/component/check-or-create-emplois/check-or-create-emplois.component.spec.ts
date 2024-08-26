import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOrCreateEmploisComponent } from './check-or-create-emplois.component';

describe('CheckOrCreateEmploisComponent', () => {
  let component: CheckOrCreateEmploisComponent;
  let fixture: ComponentFixture<CheckOrCreateEmploisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOrCreateEmploisComponent]
    });
    fixture = TestBed.createComponent(CheckOrCreateEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
