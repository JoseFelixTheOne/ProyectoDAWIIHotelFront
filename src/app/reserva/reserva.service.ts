import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../habitacion/interfaces/Habitacion';
import urlBase from '../contantes';
import Reserva from './interfaces/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private _habitacion:Habitacion[]=[]

  buscarHabitacionPorPiso(idpiso:number){
    return this._http.get<Habitacion[]>(urlBase+"/room/floor/"+idpiso)
  }


  constructor(private _http:HttpClient) { 

  }

  insertarReserva(oreserva:Reserva){
    return this._http.post<Reserva>(urlBase+"/reservation",oreserva);
   }


}
