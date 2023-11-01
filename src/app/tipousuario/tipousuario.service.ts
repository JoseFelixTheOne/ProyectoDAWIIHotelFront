import { Injectable } from '@angular/core';
import TipoUsuario from './interface/TipoUsuario';
import { Menu } from './interface/Menu';
import { HttpClient } from '@angular/common/http';
import urlBase from '../contantes';
import {Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  private _tipousuarios: TipoUsuario[] = []

   private _menus: Menu[]= [
    {
      idmenu:1,
      nombremenu:"Pasajero",
      iconomenu:"",
      urlmenu:""
    },
    {
      idmenu:2,
      nombremenu:"Usuario",
      iconomenu:"",
      urlmenu:""
    },
    {
      idmenu:3,
      nombremenu:"Tipo Usuario",
      iconomenu:"",
      urlmenu:""
    },
    {
      idmenu:4,
      nombremenu:"Habitación",
      iconomenu:"",
      urlmenu:""
    },
    {
      idmenu:5,
      nombremenu:"Reserva",
      iconomenu:"",
      urlmenu:""
    }

   ]

   listarTipoUsuario(){
    this._http.get<TipoUsuario[]>(urlBase+"/usertypes").subscribe((res)=>{
       this._tipousuarios=res;
    })
   }

   obtenerTipoUsuario(id:number) :Observable<TipoUsuario> {
    return this._http.get<TipoUsuario>(urlBase+"/usertypes/"+id);
   }


   get tipousuarios():TipoUsuario[]{
     return [...this._tipousuarios];
   }

   get menus():Menu[]{
    return [...this._menus]
   }

  constructor(private _http:HttpClient) { 
    this.listarTipoUsuario();
  }
}
