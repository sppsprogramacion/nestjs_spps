
import { IsDateString, IsInt, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEstablecerCondenaDto{
    
    tiene_computo: boolean;
  
    estado_procesal_id: string;

    @IsDateString()
    @Transform(({ value }) => {
      if (typeof value !== 'string') return value;
      return value.split('T')[0];
    })
    fecha_ultima_detencion: Date;

    @IsDateString()
    @Transform(({ value }) => {
      if (typeof value !== 'string') return value;
      return value.split('T')[0];
    })
    fecha_condena: Date;

    @Length(1,10,{message: "tribunal_condena_id debe tener entre $constraint1 y $constraint2 caracteres."})
    tribunal_condena_id: string;
   
    @IsInt({message: "pena_anios debe ser un número entero."})
    pena_anios: number;

    @IsInt({message: "pena_meses debe ser un número entero."})
    pena_meses: number;

    @IsInt({message: "pena_dias debe ser un número entero."})
    pena_dias: number;
   
    @IsDateString()
    @Transform(({ value }) => {
      if (typeof value !== 'string') return value;
      return value.split('T')[0];
    })
    fecha_cumple_pena: Date;

}
