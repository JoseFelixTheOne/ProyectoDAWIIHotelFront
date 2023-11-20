import { Component } from '@angular/core';
import { DetallereservaService } from '../detallereserva.service';
import Swal from 'sweetalert2';
import Reserva from '../interfaces/Reserva';
import { ReservaService } from '../reserva.service';
@Component({
  selector: 'app-detallereserva-principal',
  templateUrl: './detallereserva-principal.component.html',
  styleUrls: ['./detallereserva-principal.component.css']
})
export class DetallereservaPrincipalComponent {
  reserva:Reserva= {
    iduser:1,
    date:new Date().toLocaleDateString(),
    total:0,
    active:"A",
    details:[],
  }
  constructor(private detalleReservaReserva:DetallereservaService,private reservaService:ReservaService){
    this.calcularTotal()
  }

  calcularTotal(){
    var t=0;
    for(var i=0;i<this.detalleReservaReserva.detallereservas.length;i++){
      t+= this.detalleReservaReserva.detallereservas[i].price

    }
    this.reserva.total=t;
  }

  get detalles(){
    return this.detalleReservaReserva.detallereservas
  }

  guardar(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta seguro de guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        for(var i=0;i<this.detalleReservaReserva.detallereservas.length;i++){
          this.detalleReservaReserva.detallereservas[i].detailId=(i+1)
          this.detalleReservaReserva.detallereservas[i].checkin="2023-11-19T12:00:00"
          this.detalleReservaReserva.detallereservas[i].checkout="2023-11-19T12:00:00"
        }
        

        this.reserva.iduser=2;
        this.reserva.active="A"
        this.reserva.date= "2023-11-19T12:00:00"
        this.reserva.details=this.detalleReservaReserva.detallereservas
        console.log(this.reserva)  
        this.reservaService.insertarReserva(this.reserva).subscribe(res=>{

          
            Swal.fire('Exito!', 'Se  guardó los cambios correctamente', 'success');
            
          })
      }
    });
  }

}
