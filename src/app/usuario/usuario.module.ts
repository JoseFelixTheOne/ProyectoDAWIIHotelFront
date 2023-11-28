import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPrincipalComponent } from './usuario-principal/usuario-principal.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { UsuarioService } from './usuario.service';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import {FormsModule} from "@angular/forms"
import { CustomMinDirective } from './form-usuario/custom-min.directive';
import { MenuModule } from '../menu/menu.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../loginPageApp/guards/auth.guard';
import { UsuarioRegisterComponent } from './usuario-register/usuario-register.component';


@NgModule({
  declarations: [
    UsuarioPrincipalComponent,
    TablaUsuarioComponent,
    FormUsuarioComponent,
    CustomMinDirective,
    UsuarioRegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MenuModule,
    NgxPaginationModule
  ],
  providers:[UsuarioService,
    { provide: 'AuthService', useValue: AuthGuard },
    { provide: 'CanActivateFn', useValue: AuthGuard },
  ]
})
export class UsuarioModule { }
