import { Component } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import Reserva from '../interfaces/Reserva';
import ReservaList from '../interfaces/ReservaList';
import Swal from 'sweetalert2';
import FechaRango from '../interfaces/FechaRango';
@Component({
  selector: 'app-mis-reservas-page',
  templateUrl: './mis-reservas-page.component.html',
  styleUrls: ['./mis-reservas-page.component.css']
})
export class MisReservasPageComponent {

  orango:FechaRango={
    startDate:"",
    endDate:""
  }
  errorFecha: boolean = false;

  constructor(private reservaService:ReservaService,private usuarioService:UsuarioService){
    const hoy = new Date();

    const fechaInicio = new Date();
    fechaInicio.setMonth(hoy.getMonth() - 2);

    this.orango.startDate = fechaInicio.toISOString().substring(0, 10);
    this.orango.endDate = hoy.toISOString().substring(0, 10);
    console.log(this.orango.startDate)
  }

   validarFechas(): boolean {
    const fechaInicioDate = new Date(this.orango.startDate);
    const fechaFinDate = new Date( this.orango.endDate );

    if (fechaInicioDate > fechaFinDate) {
      this.errorFecha = true;
      return false;
    } else {
      this.errorFecha = false;
      return true;
    }
  }

   buscar() {
    var orangofecha:FechaRango={
      startDate:this.reservaService.convertirFormatoFecha(this.orango.startDate),
      endDate:this.reservaService.convertirFormatoFecha(this.orango.endDate),
    }
    var json= this.usuarioService.obtenerUsuarioDesdeStorage()
    if (this.validarFechas()) {

      if (this.orango.startDate === this.orango.endDate) {
        // Ajusta endDate al final del día
        const endDate = new Date(this.orango.endDate);
        endDate.setHours(23, 59, 59, 999);
        orangofecha.endDate = endDate.toISOString();
      }else{
        orangofecha.endDate = this.reservaService.convertirFormatoFechaUltima(this.orango.endDate)
      }
      
      this.reservaService.buscarReservasPorIdUsuario(json.userId,orangofecha).subscribe(res=>{
        console.log(res)
        this.reservaService.setreservas(res)
      })
    }else{
      Swal.fire('Ocurrio un error', "La fecha de inicio no puede ser mayor a la de fin", 'error');
    }
  }

  limpiar() {

  }

}
