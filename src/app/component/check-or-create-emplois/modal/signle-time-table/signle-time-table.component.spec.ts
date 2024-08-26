import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleTimeTableComponent } from './signle-time-table.component';

describe('SignleTimeTableComponent', () => {
  let component: SignleTimeTableComponent;
  let fixture: ComponentFixture<SignleTimeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignleTimeTableComponent]
    });
    fixture = TestBed.createComponent(SignleTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
