import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { PasajeroService } from '../pasajero.service';

@Component({
  selector: 'app-pasajero-principal',
  templateUrl: './pasajero-principal.component.html',
  styleUrls: ['./pasajero-principal.component.css']
})
export class PasajeroPrincipalComponent {
  nombrepasajero:string=""
  constructor(private router:Router,private pasajeroService:PasajeroService){

  }


  agregar(){
    this.router.navigate(["pasajero/agregar"])
  }

  buscarPasajero(){
    if(this.nombrepasajero==""){
      this.pasajeroService.listarPasajeros();
    }else{
      this.pasajeroService.buscarPasajeros(this.nombrepasajero)
    }
  }
}
