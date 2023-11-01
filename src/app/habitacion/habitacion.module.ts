import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitacionPrincipalComponent } from './habitacion-principal/habitacion-principal.component';
import { TablaHabitacionComponent } from './tabla-habitacion/tabla-habitacion.component';
import { HabitacionService } from './habitacion.service';
import { FormHabitacionComponent } from './form-habitacion/form-habitacion.component';
import {FormsModule} from "@angular/forms"


@NgModule({
  declarations: [
    HabitacionPrincipalComponent,
    TablaHabitacionComponent,
    FormHabitacionComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers:[
    HabitacionService
  ]
})
export class HabitacionModule { }
