

export class UpdateEntradaRegistrarControlDto {

    id_entrada_salida: number;     
               
    ciudadano_id: number;

    ///ingreso principal    
    fecha_ingreso_principal: Date;
   
    hora_ingreso_principal: string;

    hora_egreso_principal: string;
    //fin ingreso principal

    //control interno   
    fecha_ingreso_control_interno: Date;
    
    hora_ingreso_control_interno: string;
    
    hora_egreso_control_interno: string;
    //fin control interno

    //mesa de control    
    fecha_ingreso_mesa_control: Date;
    
    hora_ingreso_mesa_control: string;

    hora_egreso_mesa_control: string;
    //fin mesa de control
    
    fecha_ingreso_acceso_4: Date;
    
    hora_ingreso_acceso_4: string;
    
    hora_egreso_acceso_4: string;
    //fin acceso 4

    observaciones_usuarios: string;

}