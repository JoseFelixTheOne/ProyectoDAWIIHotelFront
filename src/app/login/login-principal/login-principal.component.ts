import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-principal',
  templateUrl: './login-principal.component.html',
  styleUrls: ['./login-principal.component.css']
})
export class LoginPrincipalComponent {

  constructor(private router:Router){

  }

  enviar(){
    this.router.navigate(["/pasajero"])
  }

}
