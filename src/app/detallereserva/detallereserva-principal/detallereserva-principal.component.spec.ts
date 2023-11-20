import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereservaPrincipalComponent } from './detallereserva-principal.component';

describe('DetallereservaPrincipalComponent', () => {
  let component: DetallereservaPrincipalComponent;
  let fixture: ComponentFixture<DetallereservaPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallereservaPrincipalComponent]
    });
    fixture = TestBed.createComponent(DetallereservaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
