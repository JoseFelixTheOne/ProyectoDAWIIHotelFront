import { TestBed } from '@angular/core/testing';

import { LoginPageAppService } from './login-page-app.service';

describe('LoginPageAppService', () => {
  let service: LoginPageAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPageAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
