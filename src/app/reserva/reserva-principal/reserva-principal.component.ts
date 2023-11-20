import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/habitacion/habitacion.service';

@Component({
  selector: 'app-reserva-principal',
  templateUrl: './reserva-principal.component.html',
  styleUrls: ['./reserva-principal.component.css']
})
export class ReservaPrincipalComponent {

  constructor(private habitacionService:HabitacionService,private router:Router){

  }

  get pisos(){
    return this.habitacionService.pisos
  }

  verHabitacion(idpiso:number){
    this.router.navigate(["reserva/piso/"+idpiso])
  }

}
