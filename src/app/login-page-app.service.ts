import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Login from './login-page-app/interfaces/Login';
import UserLogin from './login-page-app/interfaces/UserLogin';
import urlBase from './contantes';

@Injectable({
  providedIn: 'root'
})
export class LoginPageAppService {

   oUser: UserLogin | null = null;

  constructor(private _http:HttpClient) { 


  }


  login(ologin:Login){
    console.log(urlBase)
    return this._http.post<UserLogin>(urlBase+"/user/login",ologin);
   }


}
