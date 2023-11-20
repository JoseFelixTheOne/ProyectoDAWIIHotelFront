import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasajeroService } from 'src/app/pasajero/pasajero.service';
import { TipousuarioService } from 'src/app/tipousuario/tipousuario.service';
import { Usuario } from '../interface/Usuario';
import { UsuarioService } from '../usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  @ViewChild('formUser') formUser!:NgForm;
  titulo:string=""
  usuario:Usuario={
    idpassenger:0,
    iduser:0,
    password:"",
    user:"",
    usertpe:0,
    active:"1"
  }
  private controlInvalidAndTouched(controlName: string): boolean {
    const control = this.formUser?.controls[controlName];
    return control?.invalid && control.touched;
}
usuarioNombreInvalido(): boolean {
  return this.controlInvalidAndTouched('user');    
}
contraseniaInvalido(): boolean {
  return this.controlInvalidAndTouched('password');    
}
tipoNombreInvalido(): boolean {
  return this.formUser?.controls['idpassenger'].value === 0;
}
tipoUsuarioInvalido(): boolean {
  return this.formUser?.controls['usertpe'].value === 0;
}
  constructor(private tipousuarioService:TipousuarioService,private pasajeroService:PasajeroService,private routes:Router ,private activateRoute:ActivatedRoute,
    private usuarioService:UsuarioService){
      var param=this.activateRoute.snapshot.params["id"]
      if(param==undefined) this.titulo="Nuevo Usuario"
      else 
      {
        this.titulo="Editar Usuario"
        this.usuarioService.obtenerUsuario(Number(param)).subscribe(res=>{
          this.usuario= res;
        })
      }
  }

  get tipousuarios(){
    return this.tipousuarioService.tipousuarios
  }

  get pasajeros(){
    return this.pasajeroService.pasajeros
  }
  
  regresar(){
    this.routes.navigate(["usuario"])
  }

  guardar(){

    
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de guardar los datos del usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.usuario.iduser==0){
          this.usuarioService.agregarUsuario(this.usuario).subscribe(res=>{
            if(res.iduser>0){
              Swal.fire('Exito!', 'Se  guardó los cambios correctamente', 'success');
              this.routes.navigate(["usuario"])
              this.usuarioService.listarUsuarios();
            }
          })
        }else{
          this.usuarioService.editarUsuario(this.usuario).subscribe(res=>{
            if(res.iduser>0){
              Swal.fire('Exito!', 'Se  actualizó los cambios correctamente', 'success');
              this.routes.navigate(["usuario"])
              this.usuarioService.listarUsuarios();
            }
          })
        }

      }
    });

  
  }
}
