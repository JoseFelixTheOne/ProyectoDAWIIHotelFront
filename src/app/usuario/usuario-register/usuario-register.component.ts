import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasajeroService } from 'src/app/pasajero/pasajero.service';
import UsuarioRegister from '../interface/UsuarioRegister';
import { UsuarioService } from '../usuario.service';
import Swal from 'sweetalert2';
import Correo from 'src/app/reserva/interfaces/Correo';
import { ReservaService } from 'src/app/reserva/reserva.service';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './usuario-register.component.html',
  styleUrls: ['./usuario-register.component.css']
})
export class UsuarioRegisterComponent {

  ousuario:UsuarioRegister={
    names:"",
    lastname2:"",
    lastname1:"",
    idtpodoc:0,
    email:"",
    nrodoc:"",
    password:"",
    password1:"",
    phone:"",
    user:""
  }

  constructor(private router:Router,private pasajeroService:PasajeroService,private routes:ActivatedRoute,
    private usuarioService:UsuarioService,   private reservaService:ReservaService){


  }

  get tipodocumentos(){
    return this.pasajeroService.tipodocumentos
  }

  regresar(){
    this.router.navigate(["/"])
  }

  registrar(){
    if(this.ousuario.names.trim()=="")    {
      Swal.fire('Ocurrio un error', "Ingrese un nombre", 'error');
      return;
    }   

    if(this.ousuario.lastname1.trim()=="")    {
      Swal.fire('Ocurrio un error', "Ingrese apellido paterno", 'error');
      return;
    }   

    if(this.ousuario.lastname2.trim()=="")    {
      Swal.fire('Ocurrio un error', "Ingrese apellido materno", 'error');
      return;
    }  

    if(this.ousuario.email.trim()=="")    {
      Swal.fire('Ocurrio un error', "Ingrese email", 'error');
      return;
    }  

    
    if(this.ousuario.phone.trim()=="")    {
      Swal.fire('Ocurrio un error', "Ingrese telefono", 'error');
      return;
    }  

    if(this.ousuario.phone.length!=9)    {
      Swal.fire('Ocurrio un error', "Ingrese un telefono de 9 digitos", 'error');
      return;
    }  

    if(this.ousuario.idtpodoc==0)    {
      Swal.fire('Ocurrio un error', "Seleccione tipo documento", 'error');
      return;
    }  

    if(this.ousuario.nrodoc=="")    {
      Swal.fire('Ocurrio un error', "Ingrese numero documento", 'error');
      return;
    }  

    if(this.ousuario.user=="")    {
      Swal.fire('Ocurrio un error', "Ingrese un usuario", 'error');
      return;
    }  

    if(this.ousuario.password=="")    {
      Swal.fire('Ocurrio un error', "Ingrese una contraseña 1", 'error');
      return;
    }  

    if(this.ousuario.password1=="")    {
      Swal.fire('Ocurrio un error', "Ingrese una contraseña 2", 'error');
      return;
    }  

    if(this.ousuario.password1!=this.ousuario.password)    {
      Swal.fire('Ocurrio un error', "La contraseña no coincide", 'error');
      return;
    }  


    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de guardar sus datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.usuarioService.agregarUsuarioExterno(this.ousuario).subscribe(res=>{
          Swal.fire('Exito!', 'Se  guardó el usuario correctamente', 'success');
          this.router.navigate(["/"]) 

          const datosParaEnviar:Correo = {
            correosAEnviar: [this.ousuario.email],
            asunto: 'Bienvenido a Hotel Premier',
            contenido: `
            ¡Bienvenido/a al Sistema de Reservas de Hotel Premier, ${this.ousuario.names + ' ' + this.ousuario.lastname1 + ' ' + this.ousuario.lastname2}!
        
            Te damos la bienvenida como usuario de Hotel Premier. Ahora puedes disfrutar de las siguientes funciones:
        
            - Realizar reservas de habitaciones para tu estancia.
            - Consultar y ver el historial de tus reservas.
        
            Estamos emocionados de tenerte como parte de nuestra comunidad. Si tienes alguna pregunta o necesitas asistencia, nuestro equipo está disponible para ayudarte.
        
            ¡Gracias por elegir Hotel Premier! Esperamos que tengas una experiencia inolvidable con nosotros.
             `, 
          };
           this.reservaService.enviarCorreo(datosParaEnviar).subscribe(res=>{
              console.error('Se envio el correo');
            },               
            error => {
              console.error('Error en la solicitud:', error);
            }
          )


        },(err)=>{
          Swal.fire('Ocurrio un error', err.error, 'error');
        })

      }
    });




  } 

}
