import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionpisoComponent } from './habitacionpiso.component';

describe('HabitacionpisoComponent', () => {
  let component: HabitacionpisoComponent;
  let fixture: ComponentFixture<HabitacionpisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitacionpisoComponent]
    });
    fixture = TestBed.createComponent(HabitacionpisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
