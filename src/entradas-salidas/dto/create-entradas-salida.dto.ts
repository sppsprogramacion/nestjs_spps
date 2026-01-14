import { IsInt, IsOptional, Length } from "class-validator";

export class CreateEntradasSalidaDto {
    
    id_entrada_salida: number;   
    
    numero_ficha: string

    numero_aux: number;
    
    @IsInt({message: "interno_id debe ser un número entero."})
    interno_id: number;
    
    //@Length(1,300,{message: "nombre_interno debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre_interno: string    
    
    @IsInt({message: "ciudadano_id debe ser un número entero."})
    ciudadano_id: number;    
    
    //@Length(1,300,{message: "nombre_visita debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre_visita: string
    
    //@IsInt({message: "edad debe ser un número entero."})
    edad: number;
    
    //@IsInt({message: "sexo_id debe ser un número entero."})
    sexo_id: number;    
    
    // @IsOptional()
    // @IsInt({message: "parentesco_id debe ser un número entero."})
    parentesco_id: number;    
    
    //@Length(1,20,{message: "nombre_visita debe tener entre $constraint1 y $constraint2 caracteres."})
    categoria: string

    //@IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_tutor_id?: number;       
    
    //ingreso principal    
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
    
    // @IsOptional()
    // @Length(1,1000,{message: "menores debe tener entre $constraint1 y $constraint2 caracteres."})
    menores: string;
    
    @IsOptional()
    @Length(1,20,{message: "pabellon debe tener entre $constraint1 y $constraint2 caracteres."})
    pabellon: string;    
    
    @IsOptional()
    @Length(1,200,{message: "casillero debe tener entre $constraint1 y $constraint2 caracteres."})
    casillero: string;

    observaciones_usuarios: string;
   
    cancelado: boolean;
    
    detalle_cancelado: string;
   
    organismo_id: number;

    usuario_id: number;
    
}
