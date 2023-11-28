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
import { TablaHabitacionComponent } from './habitacion/tabla-habitacion/tabla-habitacion.component';
import { HabitacionPrincipalComponent } from './habitacion/habitacion-principal/habitacion-principal.component';
import { HabitacionModule } from './habitacion/habitacion.module';
import {HttpClientModule} from "@angular/common/http"
import { MenuModule } from './menu/menu.module';
import { MenuComponent } from './menu/menu/menu.component';
import { DetallereservaPrincipalComponent } from './detallereserva/detallereserva-principal/detallereserva-principal.component';
import { LoginPageAppComponent } from './login-page-app/login-page-app.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DetallereservaPrincipalComponent,
    LoginPageAppComponent
    ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PasajeroModule,
    ReservaModule,
    TipousuarioModule,
    UsuarioModule,
    HabitacionModule,
    MenuModule,
    NgxPaginationModule

  ],
  providers: [
    CargarScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
