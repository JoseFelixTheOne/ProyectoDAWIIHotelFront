import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageAppComponent } from './login-page-app.component';

describe('LoginPageAppComponent', () => {
  let component: LoginPageAppComponent;
  let fixture: ComponentFixture<LoginPageAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageAppComponent]
    });
    fixture = TestBed.createComponent(LoginPageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
