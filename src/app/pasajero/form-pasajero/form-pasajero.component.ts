import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasajeroService } from '../pasajero.service';
import { Pasajero } from '../interfaces/Pasajero'; 
import { AbstractControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-pasajero',
  templateUrl: './form-pasajero.component.html',
  styleUrls: ['./form-pasajero.component.css']
})
export class FormPasajeroComponent {
  @ViewChild('formpasajero') formpasajero!:NgForm;
  titulo:string=""
  pasajero:Pasajero={
    names:"",
    lastname1:"",
    lastname2:"",
    nrodoc:"",
    idtpodoc:0,
    email:"",
    idpas:0,
    active:"1",
    phone:""
    };
    private controlInvalidAndTouched(controlName: string): boolean {
      const control = this.formpasajero?.controls[controlName];
      return control?.invalid && control.touched;
  }
  
  

    nombreValido(): boolean {
      return this.controlInvalidAndTouched('names');    
    }
    apellidoPatValido(): boolean {
      return this.controlInvalidAndTouched('lastname1');
    }
    
    apellidMatValido(): boolean {
      return this.controlInvalidAndTouched('lastname2');
    }
    tipoDocumentoInvalido(): boolean {
      return this.formpasajero?.controls['idtpodoc'].value === 0;
    }
    DocumentoInvalido(): boolean {
      return this.controlInvalidAndTouched('nrodoc');
    }
    EmailInvalido(): boolean {
      return this.controlInvalidAndTouched('email');
    }
    PhoneInvalido(): boolean {
      return this.controlInvalidAndTouched('phone');
    }
    
  
  constructor(private router:Router,private pasajeroService:PasajeroService,private routes:ActivatedRoute){
     var id:string=routes.snapshot.params["id"];
     if(id==undefined) this.titulo="Agregar Pasajero"
     else{
      this.titulo="Editar Pasajero"
      this.pasajeroService.obtenerPasajero(Number(id)).subscribe(res=>{
          this.pasajero=res;
      })
     } 
  }

  get tipodocumentos(){
    return this.pasajeroService.tipodocumentos
  }
  
  regresar(){
    this.router.navigate(["pasajero"])
  }

  guardar(){


    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de guardar los datos del pasajero?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.pasajero.idpas==0){
          this.pasajeroService.insertarPasajero(this.pasajero).subscribe(res =>{
            if(res.idpas>0){
              Swal.fire('Exito!', 'Se  guardó los cambios correctamente', 'success');
              this.router.navigate(["pasajero"]) 
              this.pasajeroService.listarPasajeros();
            }
          },(err)=>{
            Swal.fire('Ocurrio un error', err.error, 'error');
         })
        }else{
          this.pasajeroService.actualizarPasajero(this.pasajero).subscribe(res=>{
            if(res.idpas>0){
              Swal.fire('Exito!', 'Se  actualizó los cambios correctamente', 'success');
              this.router.navigate(["pasajero"]) 
              this.pasajeroService.listarPasajeros();
            }
          },(err)=>{
            Swal.fire('Ocurrio un error', err.error, 'error');
         })
        }

      }
    });


   

  }




}
