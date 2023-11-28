import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageAppService } from '../login-page-app.service';
import Login from './interfaces/Login';
import Swal from 'sweetalert2';
import UserLogin from './interfaces/UserLogin';
import { UsuarioService } from '../usuario/usuario.service';
import { DetallereservaService } from '../reserva/detallereserva.service';
@Component({
  selector: 'app-login-page-app',
  templateUrl: './login-page-app.component.html',
  styleUrls: ['./login-page-app.component.css']
})
export class LoginPageAppComponent {
  oLogin:Login={
    user:"",
    password:""
  }



  constructor(private router:Router,private servicioLogin:LoginPageAppService,private usuarioService:UsuarioService,
    private detalleReserva:DetallereservaService){

  }

  nuevo(){
    this.router.navigate(["/registrar"])
  }

  enviar(){
    console.log(this.oLogin.user)
    console.log(this.oLogin.password)
    this.servicioLogin.login(this.oLogin).subscribe((res: UserLogin)=>{
      var nombrecompleto= res.name+" "+res.lastname1+" "+res.lastname2
      Swal.fire('Bienvenido!', 'Bievenido al Sistema '+nombrecompleto, 'success');
      this.servicioLogin.oUser=res;
      this.usuarioService.guardarUsuarioEnStorage(this.servicioLogin.oUser)
      this.detalleReserva.limpiarDetalle()
      this.router.navigate(["/reserva"])
    },(error) => {
      Swal.fire('Error', 'Usuario y/o contraseña incorrecta', 'error');
    })
  }

}
