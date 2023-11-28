import { Injectable } from '@angular/core';
import { Usuario } from './interface/Usuario';
import { HttpClient } from '@angular/common/http';
import urlBase from '../contantes';
import {Observable} from "rxjs"
import { Pasajero } from '../pasajero/interfaces/Pasajero';
import UserLogin from '../login-page-app/interfaces/UserLogin';
import UsuarioRegister from './interface/UsuarioRegister';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private _usuarios:Usuario[]=[]
 private _pasajero:Pasajero[]=[]

  nombreusuario:string=""
  totalLength:any;
  page:number=1;

 get usuarios():Usuario[]{
  return [...this._usuarios]
 }

 guardarUsuarioEnStorage(usuario: UserLogin): void {
  localStorage.setItem('usuario', JSON.stringify(usuario));
 }

 obtenerUsuarioDesdeStorage(): any {
  const usuarioString = localStorage.getItem('usuario');
  return usuarioString ? JSON.parse(usuarioString) : null;
} 

 eliminarUsuarioDelStorage(): void {
  localStorage.removeItem('usuario');
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


 listarPersonasSinUsuarios(){
  return this._http.get<Pasajero[]>(urlBase+"/passenger/listWithoutUser")
 }


 agregarUsuarioExterno(ousuario:UsuarioRegister){
  return this._http.post<UsuarioRegister>(urlBase+"/user/register",ousuario)
}

 get pasajeros(){
  return [...this._pasajero];
 }



  constructor(private _http:HttpClient) {
    this.listarUsuarios()
   }
}
