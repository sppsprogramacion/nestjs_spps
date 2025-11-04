import { Injectable } from '@nestjs/common';
import { CreateListasGeneralesTablaDto } from './dto/create-listas-generales-tabla.dto';
import { UpdateListasGeneralesTablaDto } from './dto/update-listas-generales-tabla.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ListasGeneralesTablasService {

  constructor(private dataSource: DataSource) {}
  
  async obtenerCaracteristicasPersonalesTodas() {    

    const resultados = await this.dataSource.query(`
      SELECT id_ojo_color AS id, ojo_color AS descripcion, tipo_caracteristica FROM ojos_color
      UNION ALL
      SELECT id_nariz_forma AS id, nariz_forma AS descripcion, tipo_caracteristica FROM nariz_forma
      UNION ALL
      SELECT id_pelo_tipo AS id, pelo_tipo AS descripcion, tipo_caracteristica FROM pelo_tipo
      UNION ALL
      SELECT id_pelo_color AS id, pelo_color AS descripcion, tipo_caracteristica FROM pelo_color
      UNION ALL
      SELECT id_piel AS id, piel AS descripcion, tipo_caracteristica FROM piel
      UNION ALL
      SELECT id_tamanio AS id, tamanio AS descripcion, tipo_caracteristica FROM tamanio
      UNION ALL
      SELECT id_sexo AS id, sexo AS descripcion, tipo_caracteristica FROM sexo
    `);

    const ojos_color = resultados
      .filter(r => r.tipo_caracteristica === 'ojo_color')
      .map(r => ({
        id_ojo_color: r.id,
        ojo_color: r.descripcion
      }));

    const nariz_forma = resultados
      .filter(r => r.tipo_caracteristica === 'nariz_forma')
      .map(r => ({
        id_nariz_forma: r.id,
        nariz_forma: r.descripcion
      }));

    const pelo_tipo = resultados
      .filter(r => r.tipo_caracteristica === 'pelo_tipo')
      .map(r => ({
        id_pelo_tipo: r.id,
        pelo_tipo: r.descripcion
      }));
    
    const pelo_color = resultados
      .filter(r => r.tipo_caracteristica === 'pelo_color')
      .map(r => ({
        id_pelo_color: r.id,
        pelo_color: r.descripcion
      }));

    const piel = resultados
      .filter(r => r.tipo_caracteristica === 'piel')
      .map(r => ({
        id_piel: r.id,
        piel: r.descripcion
      }));

    const tamanio = resultados
      .filter(r => r.tipo_caracteristica === 'tamanio')
      .map(r => ({
        id_tamanio: r.id,
        tamanio: r.descripcion
      }));
    
    const sexo = resultados
      .filter(r => r.tipo_caracteristica === 'sexo')
      .map(r => ({
        id_sexo: r.id,
        sexo: r.descripcion
      }));

    return { ojos_color, nariz_forma, pelo_tipo, pelo_color, piel, tamanio, sexo };
  
  }


  async obtenerTablasFiliarotiosTodas() {    

    const resultados = await this.dataSource.query(`
      SELECT id_estado_civil AS id, estado_civil AS descripcion, tipo_caracteristica FROM estado_civil
      UNION ALL
      SELECT id_nacionalidad AS id, nacionalidad AS descripcion, tipo_caracteristica FROM nacionalidades
      UNION ALL
      SELECT id_zona_residencia AS id, zona_residencia AS descripcion, tipo_caracteristica FROM zona_residencia
      
    `);

    const estado_civil = resultados
      .filter(r => r.tipo_caracteristica === 'estado_civil')
      .map(r => ({
        id_estado_civil: r.id,
        estado_civil: r.descripcion
      }));

    const nacionalidad = resultados
      .filter(r => r.tipo_caracteristica === 'nacionalidad')
      .map(r => ({
        id_nacionalidad: r.id,
        nacionalidad: r.descripcion
      }));

    const zona_residencia = resultados
      .filter(r => r.tipo_caracteristica === 'zona_residencia')
      .map(r => ({
        id_zona_residencia: r.id,
        zona_residencia: r.descripcion
      }));
    
    

    return { estado_civil, nacionalidad, zona_residencia };
  
  }
}
