import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { PasajeroService } from '../pasajero.service';

@Component({
  selector: 'app-pasajero-principal',
  templateUrl: './pasajero-principal.component.html',
  styleUrls: ['./pasajero-principal.component.css']
})
export class PasajeroPrincipalComponent{
  nombrepasajero:string=""

  ngOnInit(): void {
   
  }

  constructor(private router:Router,private pasajeroService:PasajeroService){
    this.nombrepasajero=this.pasajeroService.nombrepasajero
  }

  limpiar(){
    this.pasajeroService.nombrepasajero=""
    this.nombrepasajero=""
    this.pasajeroService.listarPasajeros()
  }

  onKeyUp(event: any): void {
    const valorTipeado = event.target.value;
    this.pasajeroService.nombrepasajero=valorTipeado;
  }
  agregar(){
    this.router.navigate(["pasajero/agregar"])
  }

  buscarPasajero(){
    this.pasajeroService.page=1;
    if(this.pasajeroService.nombrepasajero==""){
      this.pasajeroService.listarPasajeros();
    }else{
      this.pasajeroService.buscarPasajeros(this.pasajeroService.nombrepasajero)
    }
  }
}
