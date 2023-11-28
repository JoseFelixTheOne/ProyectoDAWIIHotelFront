import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasajeroPrincipalComponent } from './pasajero-principal/pasajero-principal.component';
import { TablaPasajeroComponent } from './tabla-pasajero/tabla-pasajero.component';
import { PasajeroService } from './pasajero.service';
import { FormPasajeroComponent } from './form-pasajero/form-pasajero.component';
import {FormsModule} from "@angular/forms"
import { CustomMinDirective } from './form-pasajero/custom-min.directive';
import { MenuModule } from '../menu/menu.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../loginPageApp/guards/auth.guard';



@NgModule({
  declarations: [
    PasajeroPrincipalComponent,
    TablaPasajeroComponent,
    FormPasajeroComponent,
    CustomMinDirective
    
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    MenuModule,
    NgxPaginationModule
  ],
  providers:[
    PasajeroService,
    { provide: 'AuthService', useValue: AuthGuard },
    { provide: 'CanActivateFn', useValue: AuthGuard },
  ]
})
export class PasajeroModule { }
