import { AfterViewInit, Component } from '@angular/core';
import { HabitacionService } from '../habitacion.service';
import { Habitacion } from '../interfaces/Habitacion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';

@Component({
  selector: 'app-tabla-habitacion',
  templateUrl: './tabla-habitacion.component.html',
  styleUrls: ['./tabla-habitacion.component.css']
})
export class TablaHabitacionComponent   {

  get habitaciones():Habitacion[]{
    return this.habitacionServices.habitaciones;
  }

  constructor(private habitacionServices:HabitacionService,private routes:Router){
   
  }
 

  editar(id:number){
    this.routes.navigate(["habitacion/editar/"+id])
  }

  eliminar(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
          this.habitacionServices.eliminarHabitacion(id).subscribe(res=>{
            Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
            this.habitacionServices.listarHabitacion()
          }) 
      }
    });
  }

}
