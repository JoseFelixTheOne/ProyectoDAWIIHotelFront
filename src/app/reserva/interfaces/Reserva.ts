import DetalleReserva from "./DetalleReserva";

export default interface Reserva {
    iduser: number;
    date: string;
    total: number;
    active: string;
    details: DetalleReserva[];
  }