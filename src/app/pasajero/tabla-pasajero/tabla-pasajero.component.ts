import { AfterViewInit, Component } from '@angular/core';
import { PasajeroService } from '../pasajero.service';
import { Router } from '@angular/router';
import {CargarScriptsService} from './../../cargar-scripts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-pasajero',
  templateUrl: './tabla-pasajero.component.html',
  styleUrls: ['./tabla-pasajero.component.css']
})
export class TablaPasajeroComponent {

  get page(){
    return this.pasajeroService.page;
  }

  get totalLength(){
    return this.pasajeroService.totalLength;

  }

  get pasajeros(){
    return [...this.pasajeroService.pasajeros]
  }
  constructor(private pasajeroService:PasajeroService,private routes:Router,private _CargarScripts:CargarScriptsService){
  }

  cambiar(event:any){
    this.pasajeroService.page=event
  }

  
  editar(idpasajero:number){
    this.routes.navigate(["pasajero/editar/"+idpasajero])
  }

 

  eliminar(idpasajero:number){
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
          this.pasajeroService.eliminarPasajero(idpasajero).subscribe(res=>{
            Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
            this.pasajeroService.listarPasajeros()
          }) 
      }
    });
  }
}
