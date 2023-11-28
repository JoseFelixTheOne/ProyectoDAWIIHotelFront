import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../habitacion/interfaces/Habitacion';
import urlBase from '../contantes';
import Reserva from './interfaces/Reserva';
import Correo from './interfaces/Correo';
import ReservaList from './interfaces/ReservaList';
import FechaRango from './interfaces/FechaRango';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private _habitacion:Habitacion[]=[]

  private _reservas:ReservaList[]=[]


  get reservas(){
    return [...this._reservas]
  }

   setreservas(reservas:ReservaList[]){
    this._reservas=reservas
  }

  buscarHabitacionPorPiso(idpiso:number){
    return this._http.get<Habitacion[]>(urlBase+"/room/floor/"+idpiso)
  }


  constructor(private _http:HttpClient) { 

  }

  insertarReserva(oreserva:Reserva){
    return this._http.post<Reserva>(urlBase+"/reservation",oreserva);
   }

   enviarCorreo(ocorreo:Correo){
    return this._http.post<Correo>(urlBase+"/mail",ocorreo); 
   }

   listarReservasPorIdUsuario(idusuario:number){
    return this._http.get<ReservaList[]>(urlBase+"/reservation/"+idusuario+"/my-reservations")
   }

   buscarReservasPorIdUsuario(idusuario:number, orango:FechaRango){
    return this._http.post<ReservaList[]>(urlBase+"/reservation/"+idusuario+"/my-reservations",orango)

   }

   fechaActual(){
    const fechaActual = new Date();

    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // El mes es 0 indexado, por eso se suma 1
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    const hora = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;

    return fechaFormateada;
 }

 convertirFormatoFecha(fechaEnFormatoYYYYMMDD: string) {
  const fechaConHoraMedianoche = fechaEnFormatoYYYYMMDD + 'T00:00:00';
  return fechaConHoraMedianoche;
}

convertirFormatoFechaUltima(fechaEnFormatoYYYYMMDD: string) {
  const fechaConUltimaHora = fechaEnFormatoYYYYMMDD + 'T23:59:59';
  return fechaConUltimaHora;
}



}
