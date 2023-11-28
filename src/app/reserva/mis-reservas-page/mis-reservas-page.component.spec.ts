import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservasPageComponent } from './mis-reservas-page.component';

describe('MisReservasPageComponent', () => {
  let component: MisReservasPageComponent;
  let fixture: ComponentFixture<MisReservasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisReservasPageComponent]
    });
    fixture = TestBed.createComponent(MisReservasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
