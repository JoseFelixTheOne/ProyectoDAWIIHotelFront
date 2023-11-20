import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaPrincipalComponent } from './reserva/reserva-principal/reserva-principal.component';
import { TipousuarioPrincipalComponent } from './tipousuario/tipousuario-principal/tipousuario-principal.component';
import { UsuarioPrincipalComponent } from './usuario/usuario-principal/usuario-principal.component';
import { PasajeroPrincipalComponent } from './pasajero/pasajero-principal/pasajero-principal.component';
import { LoginPrincipalComponent } from './login/login-principal/login-principal.component';
import { HabitacionPrincipalComponent } from './habitacion/habitacion-principal/habitacion-principal.component';
import { FormPasajeroComponent } from './pasajero/form-pasajero/form-pasajero.component';
import { FormHabitacionComponent } from './habitacion/form-habitacion/form-habitacion.component';
import { FormTipousuarioComponent } from './tipousuario/form-tipousuario/form-tipousuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import { HabitacionpisoComponent } from './reserva/habitacionpiso/habitacionpiso.component';
import { DetallereservaPrincipalComponent } from './reserva/detallereserva-principal/detallereserva-principal.component';

const routes: Routes = [

  {
    path:'',
    component: PasajeroPrincipalComponent,
    pathMatch:"full"
  },
  {
    path:'pasajero',
    component: PasajeroPrincipalComponent
  },
  {
    path:'pasajero/agregar',
    component: FormPasajeroComponent
  },
  {
    path:'pasajero/editar/:id',
    component: FormPasajeroComponent
  },
  {
    path:'habitacion',
    component: HabitacionPrincipalComponent
  },
  {
    path:'habitacion/agregar',
    component: FormHabitacionComponent
  },
  {
    path:'habitacion/editar/:id',
    component: FormHabitacionComponent
  },
  {
    path:'reserva',
    component: ReservaPrincipalComponent
  },
  {
    path:'reserva/piso/:id',
    component: HabitacionpisoComponent
  },
  {
    path:'tipousuario',
    component: TipousuarioPrincipalComponent
  },
  {
    path:'tipousuario/editar/:id',
    component: FormTipousuarioComponent
  },
  {
    path:'tipousuario/agregar',
    component: FormTipousuarioComponent
  },
  {
    path:'usuario',
    component: UsuarioPrincipalComponent
  },
  {
    path:'usuario/agregar',
    component: FormUsuarioComponent
  },
  {
    path:'usuario/editar/:id',
    component: FormUsuarioComponent
  },
  {
    path:'login',
    component: LoginPrincipalComponent
  },
  {
    path:'detallereserva',
    component: DetallereservaPrincipalComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
