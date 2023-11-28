import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router, Routes } from '@angular/router';
import {CargarScriptsService} from './../../cargar-scripts.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent {

  get usuarios(){
    return [...this.usuarioService.usuarios]
  }
  constructor(private usuarioService:UsuarioService,private routes:Router,private _CargarScripts:CargarScriptsService){
    //_CargarScripts.Carga(["datatable"]);

  }
  get page(){
    return this.usuarioService.page;
  }

  get totalLength(){
    return this.usuarioService.totalLength;
  }

  cambiar(event:any){
    this.usuarioService.page=event;
  }

  editar(id:number){
    this.routes.navigate(["usuario/editar/"+id])
  }


  eliminar(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe(res=>{
            Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
            this.usuarioService.listarUsuarios()
          }) 
      }
    });
  }


  
}
