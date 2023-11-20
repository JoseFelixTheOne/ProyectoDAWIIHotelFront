import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-habitacion-principal',
  templateUrl: './habitacion-principal.component.html',
  styleUrls: ['./habitacion-principal.component.css']
})
export class HabitacionPrincipalComponent  {

  numerohabitacion:string=""
  constructor(private routes:Router,private habitacionService:HabitacionService){

  }


  agregar(){
    this.routes.navigate(["habitacion/agregar"])
  }

  buscarHabitacion(){
    if(this.numerohabitacion==""){
      this.habitacionService.listarHabitacion();
    }else{
      this.habitacionService.buscarhabitacion(this.numerohabitacion)
    }
  } 

}
