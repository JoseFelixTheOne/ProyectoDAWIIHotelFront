import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageAppService } from 'src/app/login-page-app.service';
import { MenuLogin } from 'src/app/login-page-app/interfaces/MenuLogin';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class MenuComponent {

  nombreCompleto:string=""
  constructor(private loginService:LoginPageAppService,private usuarioService:UsuarioService,private router:Router,
    private servicioLogin:LoginPageAppService)
  {
  
    var data = this.usuarioService.obtenerUsuarioDesdeStorage()
    this.nombreCompleto= data.name+" "+data.lastname1+" "+data.lastname2
  }

  cerrarSesion(){
    this.usuarioService.eliminarUsuarioDelStorage();
    this.servicioLogin.oUser=null
    this.router.navigate(["/"])
  }

  get menus(){
    var data= this.usuarioService.obtenerUsuarioDesdeStorage()
    var menus:MenuLogin[] = data.menus
    return menus
  }

}
