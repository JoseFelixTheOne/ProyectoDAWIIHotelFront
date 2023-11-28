import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Habitacion } from 'src/app/habitacion/interfaces/Habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import DetalleReserva from '../interfaces/DetalleReserva';
import { DetallereservaService } from '../detallereserva.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-habitacionpiso',
  templateUrl: './habitacionpiso.component.html',
  styleUrls: ['./habitacionpiso.component.css']
})
export class HabitacionpisoComponent {


    private _idhabitacion:number=0;
    private _precio:number=0;
    private _numerohabitacion:string="";

    detallereserva:DetalleReserva={
      detailId:0,
      roomId:0,
      checkin:new Date().toISOString().split('T')[0],
      checkout:new Date().toISOString().split('T')[0],
      pricepornight:0,
      price:0,
      note:"",
      days:1,
      roomNumber:""
      
    }
    habitaciones:Habitacion[]=[]
    constructor(private reservaService:ReservaService,private activateRoute:ActivatedRoute, private router:Router,
      private el: ElementRef ,private datePipe: DatePipe,
      private detalleService:DetallereservaService){
      var param=this.activateRoute.snapshot.params["id"]
      this.buscarHabitacionPiso(Number(param))
      
    }

    buscarHabitacionPiso(idpiso:number){
      this.reservaService.buscarHabitacionPorPiso(idpiso).subscribe(res=>{
        this.habitaciones=res;
      })
    }

    guardarDetalle(){



    }

    reservar(idhabitacion:number,precio:number,numerohabitacion:string){
      this._idhabitacion=idhabitacion,
      this._precio=precio
      this._numerohabitacion=numerohabitacion
    }

    aceptar(){

    const fechaActual = new Date();
    const fechaActualFormateada = this.datePipe.transform(fechaActual, 'yyyy-MM-dd')?? '';;
    const fechaInicio = new Date(this.detallereserva.checkin);
    const fechaFin = new Date(this.detallereserva.checkout);

      if(this.detallereserva.checkin < fechaActualFormateada){
        Swal.fire('Ocurrio un error', "Las fecha de inicio no puede ser menor a la fecha actual", 'error');
        return;
      }
      else if(this.detallereserva.checkout < fechaActualFormateada){
        Swal.fire('Ocurrio un error', "Las fecha fin no puede ser menor a la fecha actual", 'error');
        return;
      }

      else if (fechaInicio > fechaFin) {
        Swal.fire('Ocurrio un error', "La fecha de inicio no puede ser menor a la fecha actual.", 'error');
        return;      
      }

     else {


      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta seguro que desea guardar la operación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:"No"
      }).then((result) => {
        if (result.isConfirmed) {
         
            // Las fechas son válidas, puedes continuar con el proceso de guardado
            const btnCerrar = this.el.nativeElement.querySelector('#btnCerrar');
            this.detallereserva.days = this.calcularDiferenciaEnDias(fechaInicio,fechaFin)
            this.detallereserva.pricepornight= this._precio;
            this.detallereserva.price=this._precio * this.detallereserva.days
            this.detallereserva.roomId=this._idhabitacion
            this.detallereserva.roomNumber=this._numerohabitacion

            if (btnCerrar) {
              btnCerrar.click();
            }
            this.detalleService.agregarDetalle(this.detallereserva)
            this.router.navigate(["/detallereserva"])     
  
        }
      });
  


    }

   
    }


     calcularDiferenciaEnDias(date1:any, date2:any) {
      const diferenciaEnMilisegundos = date2 - date1;
    
      const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    
      return Math.round(diferenciaEnDias) +1 ;
    }


}
