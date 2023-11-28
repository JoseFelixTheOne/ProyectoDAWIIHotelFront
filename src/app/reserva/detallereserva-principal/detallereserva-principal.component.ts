import { Component } from '@angular/core';
import { DetallereservaService } from '../detallereserva.service';
import Swal from 'sweetalert2';
import Reserva from '../interfaces/Reserva';
import { ReservaService } from '../reserva.service';
import { LoginPageAppService } from 'src/app/login-page-app.service';
import DetalleReserva from '../interfaces/DetalleReserva';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import autoTable from 'jspdf-autotable'
import Correo from '../interfaces/Correo';

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
  visibleReporte:boolean=false
  visibleGuardar:boolean=true
  visibleOperaciones:boolean=true
  copiadetalle:DetalleReserva[]=[]
  detalle:DetalleReserva[]=[]
  constructor(private detalleReservaReserva:DetallereservaService,private reservaService:ReservaService,
    private loginService:LoginPageAppService,private usuarioService:UsuarioService){
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
        this.detalleReservaReserva.eliminarDetalle(id)
        this.calcularTotal()
      }
    });


  }

  guardar(){

    if(this.detalleReservaReserva.detallereservas.length==0){
      Swal.fire('Error', 'Debe ingresar al menos un detalle para guardar la reserva', 'error');
      return;
    }

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
        this.detalle = JSON.parse(JSON.stringify(this.detalleReservaReserva.detallereservas));
        for(var i=0;i<this.detalle.length;i++){
          this.detalle[i].detailId=(i+1)
          this.detalle[i].checkin=this.reservaService.convertirFormatoFecha(this.detalle[i].checkin)
          this.detalle[i].checkout=this.reservaService.convertirFormatoFecha(this.detalle[i].checkout)
        }       
        var data = this.usuarioService.obtenerUsuarioDesdeStorage()
        this.reserva.iduser=data.userId
        this.reserva.active="A"
        this.reserva.date= this.reservaService.fechaActual()
        this.reserva.details=this.detalle
        this.reservaService.insertarReserva(this.reserva).subscribe(res=>{

          
            Swal.fire('Exito!', 'Se  guardó los cambios correctamente', 'success');
            this.visibleGuardar=false
            this.visibleReporte=true
            this.visibleOperaciones=false
            this.copiadetalle=this.detalleReservaReserva.detallereservas
            this.detalleReservaReserva.limpiarDetalle()
            this.calcularTotal()

            ///
            const blobPDF = this.generarPDFBlob();

            blobPDF.arrayBuffer().then((arrayBuffer:any) => {
              const arrayDeBytes = new Uint8Array(arrayBuffer); 
              const listabyte = [Array.from(arrayDeBytes)];
                            
              
              var usuario= this.usuarioService.obtenerUsuarioDesdeStorage()
              
                          const datosParaEnviar:Correo = {
                            correosAEnviar: [usuario.email,],
                            asunto: 'Confirmación de Reserva en Hotel Premier',
                            contenido: `
                            ¡Tu reserva en Hotel Premier se ha realizado correctamente! Adjunto encontrarás el comprobante de reserva.
                            `
                            
                            ,
                            nombresArchivos: ['reportereserva.pdf'],
                            listabyte:listabyte as unknown as Uint8Array[],  
              
                          };
                        
                          this.reservaService.enviarCorreo(datosParaEnviar).subscribe(res=>{
                            console.error('Se envio correctamente');
                           },
                           
                           error => {
                            console.error('Error en la solicitud:', error);
                          }
                          )


              //
            });


        
            

            ///

          })
      }
    });
  }

   convertDate(fecha:string) {
    const fechaObj = new Date(fecha);
  
    // Obtener día, mes y año
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; 
    const anio = fechaObj.getFullYear();
  
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
  
    return fechaFormateada;
  }

  generarPDF(): void {
    var blob:any=  this.generarPDFBlob()
    var a =document.createElement("a")
    a.href= URL.createObjectURL(blob)
    a.download="reporte.pdf"
    a.click()
  }

  generarPDFBlob(): any {
    const doc = new jsPDF();
    const arraydet: any = [];
   var usuario= this.usuarioService.obtenerUsuarioDesdeStorage()


    var total=0;
    for (var i = 0; i < this.copiadetalle.length; i++) {
      var obj = this.copiadetalle[i];
      var array = [obj.roomNumber, this.convertDate(obj.checkin) + " al " + this.convertDate(obj.checkout), obj.days, obj.pricepornight, obj.price];
      total+=  obj.price
      arraydet.push(array);
    }
  
    const data = arraydet;
    const columns = ['Numero Habitacion', 'Fechas', 'Dias', 'Precio Por Noche', 'Subtotal'];
    const titulo = "Reporte de Reserva";
  
    const pageSize = doc.internal.pageSize;
    const textWidth = doc.getTextWidth(titulo);
    const x = (pageSize.width - textWidth) / 2;
    const y = 15; 
    const columnWidth = pageSize.width / 2; // Divide la página en dos columnas
    const columnMargin = 10; // Margen entre las dos columnas
    doc.setFontSize(10); // Ajusta el tamaño de letra solo para esta línea
      // Agrega la información adicional
  const informacionAdicional = [
    ['Nombre Completo', usuario.name+" "+usuario.lastname1+" "+usuario.lastname2],
    ['Usuario', usuario.username],
    ['Fecha de Reserva',new Date().toLocaleDateString()],
    ['Email', usuario.email],
    ['Total Pagar', "S/"+total],
  ];
    informacionAdicional.forEach((info, index) => {
      const infoText = info.join(': ');
      const xPos = index % 2 === 0 ? 20 : columnWidth + columnMargin;
      const yPos = y + 10 * Math.floor(index / 2);
      doc.text(infoText, xPos, yPos+12);
    });

    autoTable(doc, {
      head: [columns],
      startY: 55, 
      body: data,
      didDrawPage: function (data) {
        doc.setFontSize(14); // Ajusta el tamaño de letra solo para esta línea
        doc.setFont('helvetica', 'bold');
        doc.text(titulo, x, y);
      },
      didDrawCell: function (data) {
      }
    });
    doc.setFont('helvetica', 'normal');

    const pdfBytes = doc.output();
  
    const blobArchivo = new Blob([pdfBytes], { type: 'application/pdf' });
    return blobArchivo;
  }



}

