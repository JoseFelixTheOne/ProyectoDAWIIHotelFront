import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipousuarioPrincipalComponent } from './tipousuario-principal/tipousuario-principal.component';
import { TablaTipousuarioComponent } from './tabla-tipousuario/tabla-tipousuario.component';
import { TipousuarioService } from './tipousuario.service';
import { FormTipousuarioComponent } from './form-tipousuario/form-tipousuario.component';
import {FormsModule} from "@angular/forms"
import { MenuModule } from '../menu/menu.module';
import { AuthGuard } from '../loginPageApp/guards/auth.guard';


@NgModule({
  declarations: [
    TipousuarioPrincipalComponent,
    TablaTipousuarioComponent,
    FormTipousuarioComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MenuModule
  ],
  providers:[
    TipousuarioService,
    { provide: 'AuthService', useValue: AuthGuard },
    { provide: 'CanActivateFn', useValue: AuthGuard },
  ]
})
export class TipousuarioModule { }
