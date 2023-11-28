import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservasTablaComponent } from './mis-reservas-tabla.component';

describe('MisReservasTablaComponent', () => {
  let component: MisReservasTablaComponent;
  let fixture: ComponentFixture<MisReservasTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisReservasTablaComponent]
    });
    fixture = TestBed.createComponent(MisReservasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
