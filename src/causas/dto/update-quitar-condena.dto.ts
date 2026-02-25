
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateQuitarCondenaDto{
  
  id_causa: number;
  
  @IsBoolean()
  tiene_computo: boolean;

  estado_procesal_id: string;
  
  fecha_condena: Date;
  
  tribunal_condena_id: string;
    
  pena_anios: number;
  
  pena_meses: number;
  
  pena_dias: number;
  
  fecha_cumple_pena: Date;

}
