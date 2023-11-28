import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitacionPrincipalComponent } from './habitacion-principal/habitacion-principal.component';
import { TablaHabitacionComponent } from './tabla-habitacion/tabla-habitacion.component';
import { HabitacionService } from './habitacion.service';
import { FormHabitacionComponent } from './form-habitacion/form-habitacion.component';
import {FormsModule} from "@angular/forms"
import { CustomMinDirective } from './form-habitacion/custom-min.directive';
import { MenuModule } from '../menu/menu.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../loginPageApp/guards/auth.guard';


@NgModule({
  declarations: [
    HabitacionPrincipalComponent,
    TablaHabitacionComponent,
    FormHabitacionComponent,
    CustomMinDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    MenuModule,
    NgxPaginationModule
  ],
  providers:[
    HabitacionService,
    { provide: 'AuthService', useValue: AuthGuard },
    { provide: 'CanActivateFn', useValue: AuthGuard },
  ]
})
export class HabitacionModule { }
