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
    this.nombreusuario=this.usuarioService.nombreusuario
  }
  
  agregar(){
    this.routes.navigate(["usuario/agregar"])
  }

  cambiar(event:any){
    this.usuarioService.nombreusuario= event.target.value;
  }

  buscarUsuario(){
    this.usuarioService.page=1
    if(this.usuarioService.nombreusuario==""){
      this.usuarioService.listarUsuarios();
    }else{
      this.usuarioService.buscarUsuarios(this.usuarioService.nombreusuario)
    }
  }

  limpiar(){
    this.nombreusuario=""
    this.usuarioService.nombreusuario=""
    this.usuarioService.listarUsuarios()
  }

}
