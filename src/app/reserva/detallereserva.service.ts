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

  limpiarDetalle(){
    this._detalleReserva=[]
  }

  agregarDetalle(detalle:DetalleReserva){
    if(this._detalleReserva.length==0)  detalle.detailId=1;
    else detalle.detailId= this._detalleReserva[this._detalleReserva.length-1].detailId+1
    this._detalleReserva.push(detalle)
  }

  eliminarDetalle(iddetalle:number){
    this._detalleReserva= this._detalleReserva.filter(p=>p.detailId!=iddetalle)
  }

}
