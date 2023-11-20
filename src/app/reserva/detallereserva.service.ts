import { Injectable } from '@angular/core';
import DetalleReserva from './interfaces/DetalleReserva';

@Injectable({
  providedIn: 'root'
})
export class DetallereservaService {

  private _detalleReserva:DetalleReserva[]=[]
  
  constructor() { 

  }

  get detallereservas(){
    return [...this._detalleReserva]
  }

  agregarDetalle(detalle:DetalleReserva){
    this._detalleReserva.push(detalle)
  }

}
