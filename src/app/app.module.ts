import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//INICIO servicio
import{CargarScriptsService} from './cargar-scripts.service';
//Fin Servicio

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasajeroModule } from './pasajero/pasajero.module';
import { ReservaModule } from './reserva/reserva.module';
import { TipousuarioModule } from './tipousuario/tipousuario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginPrincipalComponent } from './login/login-principal/login-principal.component';
import { LoginModule } from './login/login.module';
import { TablaHabitacionComponent } from './habitacion/tabla-habitacion/tabla-habitacion.component';
import { HabitacionPrincipalComponent } from './habitacion/habitacion-principal/habitacion-principal.component';
import { HabitacionModule } from './habitacion/habitacion.module';
import {HttpClientModule} from "@angular/common/http"

@NgModule({
  declarations: [
    AppComponent,
    LoginPrincipalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PasajeroModule,
    ReservaModule,
    TipousuarioModule,
    UsuarioModule,
    LoginModule,
    HabitacionModule
  ],
  providers: [
    CargarScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
