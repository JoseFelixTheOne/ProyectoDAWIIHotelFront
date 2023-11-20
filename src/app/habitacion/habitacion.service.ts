import { Injectable } from '@angular/core';
import { Habitacion } from './interfaces/Habitacion';
import { EstadoHabitacion } from './interfaces/EstadoHabitacion';
import { Piso } from './interfaces/Piso';
import { TipoHabitacion } from './interfaces/TipoHabitacion';
import { HttpClient } from '@angular/common/http';
import urlBase from '../contantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private _estadohabitaciones:EstadoHabitacion[]=[]
  private _pisos:Piso[]=[]
  private _tipohabitaciones:TipoHabitacion[]=[]
  private _habitacion: Habitacion[]=[]

  get habitaciones():Habitacion[] {
    return [...this._habitacion];
  }

  get pisos():Piso[] {
    return [...this._pisos];
  }

  get estadohabitaciones():EstadoHabitacion[] {
    return [...this._estadohabitaciones];
  }

  get tipohabitaciones():TipoHabitacion[] {
    return [...this._tipohabitaciones];
  }

  listarEstadoHabitacion(){
    this._http.get<EstadoHabitacion[]>(urlBase+"/estateroom").subscribe(res=>{
        this._estadohabitaciones=res;
    })
  }

  
  listarPiso(){
    this._http.get<Piso[]>(urlBase+"/floor").subscribe(res=>{
        this._pisos=res;
    })
  }

  listarTipoHabitacion(){
    this._http.get<TipoHabitacion[]>(urlBase+"/roomtypes").subscribe(res=>{
        this._tipohabitaciones=res;
    })
  }

  listarHabitacion(){
    this._http.get<Habitacion[]>(urlBase+"/room").subscribe(res=>{
      this._habitacion=res;
    })
  }

  obtenerHabitacion(id:number) : Observable<Habitacion>  {
    return this._http.get<Habitacion>(urlBase+"/room/"+id);
  }

  insertarHabitacion(ohabitacion:Habitacion){
    return this._http.post<Habitacion>(urlBase+"/room/",ohabitacion);
   }

   
   actualizarHabitacion(ohabitacion:Habitacion){
    return this._http.put<Habitacion>(urlBase+"/room/",ohabitacion);
   }

   eliminarHabitacion(id:number){
    return this._http.delete(urlBase+"/room/"+id);
  }

  buscarhabitacion(nombrehabitacion:string){
    this._http.get<Habitacion[]>(urlBase+"/room/roomnumber/"+nombrehabitacion).subscribe(res=>{
      this._habitacion=res;
     }) 
   }

  constructor(private _http:HttpClient) {
    this.listarEstadoHabitacion()
    this.listarPiso();
    this.listarTipoHabitacion();
    this.listarHabitacion()
   }
}
