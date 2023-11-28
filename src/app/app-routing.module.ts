import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaPrincipalComponent } from './reserva/reserva-principal/reserva-principal.component';
import { TipousuarioPrincipalComponent } from './tipousuario/tipousuario-principal/tipousuario-principal.component';
import { UsuarioPrincipalComponent } from './usuario/usuario-principal/usuario-principal.component';
import { PasajeroPrincipalComponent } from './pasajero/pasajero-principal/pasajero-principal.component';
import { HabitacionPrincipalComponent } from './habitacion/habitacion-principal/habitacion-principal.component';
import { FormPasajeroComponent } from './pasajero/form-pasajero/form-pasajero.component';
import { FormHabitacionComponent } from './habitacion/form-habitacion/form-habitacion.component';
import { FormTipousuarioComponent } from './tipousuario/form-tipousuario/form-tipousuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import { HabitacionpisoComponent } from './reserva/habitacionpiso/habitacionpiso.component';
import { DetallereservaPrincipalComponent } from './reserva/detallereserva-principal/detallereserva-principal.component';
import { LoginPageAppComponent } from './login-page-app/login-page-app.component';
import { AuthGuard } from './loginPageApp/guards/auth.guard';
import { MisReservasPageComponent } from './reserva/mis-reservas-page/mis-reservas-page.component';
import { UsuarioRegisterComponent } from './usuario/usuario-register/usuario-register.component';

const routes: Routes = [

  {
    path:'',
    component: LoginPageAppComponent,
    pathMatch:"full"
  },
  {
    path:'pasajero',
    component: PasajeroPrincipalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'registrar',
    component: UsuarioRegisterComponent,
  },
  {
    path:'pasajero/agregar',
    component: FormPasajeroComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'pasajero/editar/:id',
    component: FormPasajeroComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'habitacion',
    component: HabitacionPrincipalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'habitacion/agregar',
    component: FormHabitacionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'habitacion/editar/:id',
    component: FormHabitacionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'reserva',
    component: ReservaPrincipalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'misreserva',
    component: MisReservasPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'reserva/piso/:id',
    component: HabitacionpisoComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'tipousuario',
    component: TipousuarioPrincipalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'tipousuario/editar/:id',
    component: FormTipousuarioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'tipousuario/agregar',
    component: FormTipousuarioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'usuario',
    component: UsuarioPrincipalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'usuario/agregar',
    component: FormUsuarioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'usuario/editar/:id',
    component: FormUsuarioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component: LoginPageAppComponent
  },
  {
    path:'detallereserva',
    component: DetallereservaPrincipalComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
