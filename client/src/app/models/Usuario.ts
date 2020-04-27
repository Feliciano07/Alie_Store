export interface Usuario{
  id_usuario?: number;
  nombre?: string;
  apellido?: string;
  clave?: string;
  correo?: string;
  telefono?: number;
  foto?: string;
  fecha_nacimiento?: Date;
  fecha_registro?: Date;
  direccion?: string;
  credito?: number;
  ganancia?: number;
  clase_cliente?: number;
  genero?: number;
  status?: number;
  tipo_usuario?: number;
}

export interface Check{
  value1?: string;
}
