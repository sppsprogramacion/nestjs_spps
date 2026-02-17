import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsOptional, Length } from "class-validator";

export class CreateCausaDto {

    id_causa: number;
    
    @IsInt({message: "ingreso_interno_id debe ser un número entero."})
    ingreso_interno_id: number;

    @Length(1,300,{message: "causa debe tener entre $constraint1 y $constraint2 caracteres."})
    causa: string;
    
    @Length(1,10,{message: "prision_reclusion_id debe tener entre $constraint1 y $constraint2 caracteres."})
    prision_reclusion_id: string;
       
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,50,{message: "expediente debe tener entre $constraint1 y $constraint2 caracteres."})
    expediente: string;

    @IsInt({message: "tipo_delito_id debe ser un número entero."})
    tipo_delito_id: number;
    
    @Length(1,10,{message: "estado_procesal_id debe tener entre $constraint1 y $constraint2 caracteres."})
    estado_procesal_id: string;
    
    @Length(1,10,{message: "jurisdiccion_id debe tener entre $constraint1 y $constraint2 caracteres."})
    jurisdiccion_id: string;
    
    @Length(1,10,{message: "juzgado_id debe tener entre $constraint1 y $constraint2 caracteres."})
    juzgado_id: string;

    @Length(1,10,{message: "otro_juzgado_id debe tener entre $constraint1 y $constraint2 caracteres."})
    otro_juzgado_id: string;
       
    @Length(1,10,{message: "reincidencia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    reincidencia_id: string;

    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_ultima_detencion: Date;

    tiene_computo: boolean;

    fecha_condena: Date;

    tribunal_condena_id: string;
   
    pena_anios: number;

    pena_meses: number;

    pena_dias: number;
   
    fecha_cumple_pena: Date;

    @IsInt({message: "tipo_defensor_id debe ser un número entero."})
    tipo_defensor_id: number;

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "abogado debe tener entre $constraint1 y $constraint2 caracteres."})
    abogado: string;

    vigente: boolean;

    eliminado: boolean;
    
    fecha_carga: Date;

    organismo_carga_id: number;

    usuario_carga_id: number;

}
