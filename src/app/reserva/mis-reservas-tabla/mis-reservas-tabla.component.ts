import { Component } from '@angular/core';
import ReservaList from '../interfaces/ReservaList';
import { ReservaService } from '../reserva.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-mis-reservas-tabla',
  templateUrl: './mis-reservas-tabla.component.html',
  styleUrls: ['./mis-reservas-tabla.component.css']
})
export class MisReservasTablaComponent {
  
  reservasL: any[] = []; // Asegúrate de que tus reservas tengan la propiedad 'details'
  reservaSeleccionada: number | null = null;

  // Método para mostrar/ocultar detalles
  toggleDetails(index: number) {
    this.reservaSeleccionada = this.reservaSeleccionada === index ? null : index;
  }
  //reservas:ReservaList[]=[]
  nombreusuario:string=""
  totalLength:any;
  page:number=1;
  constructor(private reservaService:ReservaService,private usuarioService:UsuarioService){
    var json= this.usuarioService.obtenerUsuarioDesdeStorage()
    this.reservaService.listarReservasPorIdUsuario(json.userId).subscribe(res=>{
      this.reservaService.setreservas(res)
    })
  }
  get reservas(){
    return this.reservaService.reservas
  }
  cambiar(event:any){
    this.page=event;
  }



}
