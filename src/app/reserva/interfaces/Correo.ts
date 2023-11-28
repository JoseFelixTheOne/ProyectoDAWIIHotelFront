export default interface Correo {
    correosAEnviar: string[];
    asunto: string;
    contenido: string;
    nombresArchivos?: string[];
    listabyte?: Uint8Array[];
  }