import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-principal',
  templateUrl: './usuario-principal.component.html',
  styleUrls: ['./usuario-principal.component.css']
})
export class UsuarioPrincipalComponent {
  
  nombreusuario:string=""
  constructor(private routes:Router,private usuarioService:UsuarioService){

  }
  
  agregar(){
    this.routes.navigate(["usuario/agregar"])
  }

  buscarUsuario(){
    if(this.nombreusuario==""){
      this.usuarioService.listarUsuarios();
    }else{
      this.usuarioService.buscarUsuarios(this.nombreusuario)
    }
  }
}
