import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import UserLogin from 'src/app/login-page-app/interfaces/UserLogin';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard{

 
  constructor(private router: Router,private usuarioService:UsuarioService) {}

  canLoad(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):any{
    console.log(this.usuarioService.obtenerUsuarioDesdeStorage())
    if(this.usuarioService.obtenerUsuarioDesdeStorage()==null){
      this.router.navigate(["/"])
      return false;
    }
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log(this.usuarioService.obtenerUsuarioDesdeStorage())
    if(this.usuarioService.obtenerUsuarioDesdeStorage()==null){
      this.router.navigate(["/"])
      return false;
    }
    return true;
  }
};

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(authGuard).canActivate(next, state);
}