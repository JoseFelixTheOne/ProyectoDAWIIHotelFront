import { Injectable } from '@angular/core';
import { Usuario } from './interface/Usuario';
import { HttpClient } from '@angular/common/http';
import urlBase from '../contantes';
import {Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private _usuarios:Usuario[]=[]

 get usuarios():Usuario[]{
  return [...this._usuarios]
 }

 listarUsuarios(){
  this._http.get<Usuario[]>(urlBase+"/user").subscribe(res=>{
     this._usuarios=res
  })
 }

 agregarUsuario(ousuario:Usuario):Observable<Usuario>{
    return this._http.post<Usuario>(urlBase+"/user/",ousuario)
 }

 editarUsuario(ousuario:Usuario):Observable<Usuario>{
  return this._http.put<Usuario>(urlBase+"/user/",ousuario)
 }

 obtenerUsuario(id:number): Observable<Usuario>{
  return this._http.get<Usuario>(urlBase+"/user/"+id);
 }

 eliminarUsuario(id:number){
   return this._http.delete(urlBase+"/user/"+id);
 }

 buscarUsuarios(nombreusuario:string){
  this._http.get<Usuario[]>(urlBase+"/user/username/"+nombreusuario).subscribe(res=>{
    this._usuarios=res;
   }) 
 }


  constructor(private _http:HttpClient) {
    this.listarUsuarios()
   }
}
