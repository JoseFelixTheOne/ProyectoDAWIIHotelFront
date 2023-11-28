import { Component, ViewChild } from '@angular/core';
import { HabitacionService } from '../habitacion.service';
import { Piso } from '../interfaces/Piso';
import { EstadoHabitacion } from '../interfaces/EstadoHabitacion';
import { TipoHabitacion } from '../interfaces/TipoHabitacion';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from '../interfaces/Habitacion';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-habitacion',
  templateUrl: './form-habitacion.component.html',
  styleUrls: ['./form-habitacion.component.css']
})
export class FormHabitacionComponent {
  @ViewChild('form_habitacion') form_habitacion!:NgForm;

  titulo:string=""
  habitacion:Habitacion={
    roomId:        0,
    roomNumber:    "",
    roomPrice:     0,
    roomStatusId:  0,
    floorId:       0,
    roomTypeId:    0,
    roomActive:    ""
  }
  private controlInvalidAndTouched(controlName: string): boolean {
    const control = this.form_habitacion?.controls[controlName];
    return control?.invalid && control.touched;
}
nroHabitacionInvalido(): boolean {
  return this.controlInvalidAndTouched('roomNumber') ;
}
precioInvalido(): boolean {
  const roomPrice = this.form_habitacion?.controls['roomPrice'].value;
  return (
    roomPrice === 0 ||
    this.controlInvalidAndTouched('roomPrice')
  );
}
EstadoHabitacionInvalido(): boolean {
  return this.form_habitacion?.controls['roomStatusId'].value === 0;
}
nroPisoInvalido(): boolean {
  return this.form_habitacion?.controls['floorId'].value === 0;
}
tipoHabitacionInvalido(): boolean {
  return this.form_habitacion?.controls['roomTypeId'].value === 0;
}
  
  constructor(private habitacionService:HabitacionService,private routes:Router,
    private activateRoute:ActivatedRoute){
     var id= activateRoute.snapshot.params["id"]
      if(id==undefined) this.titulo="Agregar Habitación"
      else  {
        this.titulo="Editar Habitación"
        habitacionService.obtenerHabitacion(Number(id)).subscribe(res=>{
          this.habitacion=res;
        })
      }
    }

  get pisos():Piso[]{
    return this.habitacionService.pisos;
  }

  get estadohabitaciones():EstadoHabitacion[]{
    return this.habitacionService.estadohabitaciones;
  }

  get tipohabitaciones():TipoHabitacion[]{
    return this.habitacionService.tipohabitaciones
  }

  regresar(){
    this.routes.navigate(["habitacion"])
  }
  guardar(){

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de guardar los datos de la habitación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
       
        if(this.habitacion.roomId==0){

          this.habitacionService.insertarHabitacion(this.habitacion).subscribe(res=>{
              if(res.roomId>0){
                Swal.fire('Exito!', 'Se  guardó los cambios correctamente', 'success');
                 this.routes.navigate(["habitacion"])
                 this.habitacionService.listarHabitacion();
              }
          },(err)=>{
            Swal.fire('Ocurrio un error', err.error, 'error');
         })
    
        }else{
    
          this.habitacionService.actualizarHabitacion(this.habitacion).subscribe(res=>{
             if(res.roomId>0){
                Swal.fire('Exito!', 'Se  actualizó los cambios correctamente', 'success');
                 this.routes.navigate(["habitacion"])
                 this.habitacionService.listarHabitacion();
              }
          },(err)=>{
            Swal.fire('Ocurrio un error', err.error, 'error');
         })
    
        }

      }
    });


   
  }
}
