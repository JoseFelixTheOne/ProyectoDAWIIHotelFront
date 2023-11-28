import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasajeroService } from 'src/app/pasajero/pasajero.service';
import { TipousuarioService } from 'src/app/tipousuario/tipousuario.service';
import { Usuario } from '../interface/Usuario';
import { UsuarioService } from '../usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pasajero } from 'src/app/pasajero/interfaces/Pasajero';
import Correo from 'src/app/reserva/interfaces/Correo';
import { ReservaService } from 'src/app/reserva/reserva.service';

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

pasajeros:Pasajero[]=[]

  constructor(private tipousuarioService:TipousuarioService,private pasajeroService:PasajeroService,private routes:Router ,private activateRoute:ActivatedRoute,
    private usuarioService:UsuarioService,private reservaService:ReservaService){
      var param=this.activateRoute.snapshot.params["id"]
      if(param==undefined) this.titulo="Nuevo Usuario"
      else 
      {
        this.titulo="Editar Usuario"
        this.usuarioService.obtenerUsuario(Number(param)).subscribe(res=>{
          this.usuario= res;
        })
      }
      this.listarPersonasSinusuario();
  }

  get tipousuarios(){
    return this.tipousuarioService.tipousuarios
  }

  listarPersonasSinusuario(){
    return this.usuarioService.listarPersonasSinUsuarios().subscribe(res=>{
      this.pasajeros=res
    })
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
              var objpass=this.pasajeros.filter(p=>p.idpas==this.usuario.idpassenger)[0];
              /////
              console.log(objpass)
              const datosParaEnviar:Correo = {
                correosAEnviar: [objpass.email],
                asunto: 'Bienvenido a Hotel Premier',
                contenido: `

                ¡Bienvenido/a al Sistema de Reservas de Hotel Premier, ${objpass.names+ ' '+objpass.lastname1+' '+objpass.lastname2 }! ,le queremos informar
                que se acaba de crearle un usuario que es ${this.usuario.user}

                Estamos emocionados de tenerte como parte de nuestro equipo de gestión. Aquí es donde puedes administrar las reservas del hotel de manera eficiente. Esperamos que encuentres todas las herramientas y funciones que necesitas para asegurar una experiencia de reserva fluida para nuestros huéspedes.

                Si tienes alguna pregunta o necesitas orientación sobre el uso del sistema, nuestro equipo de soporte está disponible para ayudarte.

                ¡Gracias por tu dedicación para hacer que las estancias en Hotel Premier sean inolvidables! ¡Que tengas un día productivo!

                `, 
              };
               this.reservaService.enviarCorreo(datosParaEnviar).subscribe(res=>{
                  console.error('Se envio el correo');
                },               
                error => {
                  console.error('Error en la solicitud:', error);
                }
              )

              /////

            }
          },(err)=>{
             Swal.fire('Ocurrio un error', err.error, 'error');
          })
        }else{
          this.usuarioService.editarUsuario(this.usuario).subscribe(res=>{
            if(res.iduser>0){
              Swal.fire('Exito!', 'Se  actualizó los cambios correctamente', 'success');
              this.routes.navigate(["usuario"])
              this.usuarioService.listarUsuarios();
            }
          },(err)=>{
            Swal.fire('Ocurrio un error', err.error, 'error');
         })
        }
      }
    });
  }
}
