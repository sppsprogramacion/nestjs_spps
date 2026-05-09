
import { IsBoolean, IsInt, Length } from 'class-validator';

export class UpdateQuitarCondenaDto{
  
  id_causa: number;
    
  tiene_computo: boolean;

  @Length(1,10,{message: "estado_procesal_id debe tener entre $constraint1 y $constraint2 caracteres."})
  estado_procesal_id: string;
  
  fecha_condena: Date;
  
  tribunal_condena_id: string;
    
  pena_anios: number;
  
  pena_meses: number;
  
  pena_dias: number;
  
  fecha_cumple_pena: Date;

}
