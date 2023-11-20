import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Habitacion } from 'src/app/habitacion/interfaces/Habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import DetalleReserva from '../interfaces/DetalleReserva';
import { DetallereservaService } from '../detallereserva.service';

@Component({
  selector: 'app-habitacionpiso',
  templateUrl: './habitacionpiso.component.html',
  styleUrls: ['./habitacionpiso.component.css']
})
export class HabitacionpisoComponent {


    private _idhabitacion:number=0;
    private _precio:number=0;

    detallereserva:DetalleReserva={
      detailId:0,
      roomId:0,
      checkin:new Date().toISOString().split('T')[0],
      checkout:new Date().toISOString().split('T')[0],
      price:0,
      note:""
      
    }
    habitaciones:Habitacion[]=[]
    constructor(private reservaService:ReservaService,private activateRoute:ActivatedRoute, private router:Router,private el: ElementRef ,
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

    reservar(idhabitacion:number,precio:number){
      this._idhabitacion=idhabitacion,
      this._precio=precio
    }

    aceptar(){
      const btnCerrar = this.el.nativeElement.querySelector('#btnCerrar');
      this.detallereserva.price=this._precio
      this.detallereserva.roomId=this._idhabitacion
      if (btnCerrar) {
        btnCerrar.click();
      }
      this.detalleService.agregarDetalle(this.detallereserva)
      this.router.navigate(["/detallereserva"])
    }

}
