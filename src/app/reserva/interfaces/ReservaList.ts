import DetalleReservaList from "./DetalleReservaList";

export default interface ReservaList {
    reservationId: number;
    iduser: number;
    date: string;
    total: number;
    active: string;
    details: DetalleReservaList[];
  }