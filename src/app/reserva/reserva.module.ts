import { NgModule } from '@angular/core';
import { CommonModule,DatePipe  } from '@angular/common';
import { ReservaPrincipalComponent } from './reserva-principal/reserva-principal.component';
import { MenuModule } from '../menu/menu.module';
import { HabitacionpisoComponent } from './habitacionpiso/habitacionpiso.component';
import { FormsModule } from '@angular/forms';
import { DetallereservaPrincipalComponent } from './detallereserva-principal/detallereserva-principal.component';
import { AuthGuard } from '../loginPageApp/guards/auth.guard';
import { MisReservasPageComponent } from './mis-reservas-page/mis-reservas-page.component';
import { MisReservasTablaComponent } from './mis-reservas-tabla/mis-reservas-tabla.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ReservaPrincipalComponent,
    HabitacionpisoComponent,
    DetallereservaPrincipalComponent,
    MisReservasPageComponent,
    MisReservasTablaComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    FormsModule,
    NgxPaginationModule

  ],
  providers:[
    DatePipe ,
    { provide: 'AuthService', useValue: AuthGuard },
    { provide: 'CanActivateFn', useValue: AuthGuard },
  ]
})
export class ReservaModule { }
