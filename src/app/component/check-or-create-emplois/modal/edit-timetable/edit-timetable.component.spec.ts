import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimetableComponent } from './edit-timetable.component';

describe('EditTimetableComponent', () => {
  let component: EditTimetableComponent;
  let fixture: ComponentFixture<EditTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTimetableComponent]
    });
    fixture = TestBed.createComponent(EditTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
