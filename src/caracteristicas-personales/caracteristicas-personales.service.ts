import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CaracteristicasPersonalesService {
  constructor(private dataSource: DataSource) {}

  async obtenerTodas() {
    // const query = `
    //   SELECT ojo_color, id_ojo_color, 'ojo_color' AS tipo_caracteristica FROM ojos_color
    //   UNION
    //   SELECT id_nariz_forma AS ojo_color, nariz_forma AS id_ojo_color, 'nariz_forma' AS tipo_caracteristica FROM nariz_forma
    //   UNION
    //   SELECT id_pelo_tipo AS ojo_color, pelo_tipo AS id_ojo_color, 'pelo_tipo' AS tipo_caracteristica FROM pelo_tipo
    //   UNION
    //   SELECT id_piel AS ojo_color, piel AS id_ojo_color, 'piel' AS tipo_caracteristica FROM piel
    //   UNION
    //   SELECT id_tamanio AS ojo_color, tamanio AS id_ojo_color, 'tamanio' AS tipo_caracteristica FROM tamanio;
    // `;

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
    `);

    //const resultados = await this.dataSource.query(query);

    // Agrupar por tipo_caracteristica
    // const agrupado = {
    //   ojos_color: resultado.filter(r => r.tipo_caracteristica === 'ojo_color'),
    //   nariz_forma: resultado.filter(r => r.tipo_caracteristica === 'nariz_forma'),
    //   pelo_tipo: resultado.filter(r => r.tipo_caracteristica === 'pelo_tipo'),
    //   piel: resultado.filter(r => r.tipo_caracteristica === 'piel'),
    //   tamanio: resultado.filter(r => r.tipo_caracteristica === 'tamanio'),
    // };

    // return agrupado;

    const ojos_color = resultados
      .filter(r => r.tipo_caracteristica === 'ojo_color')
      .map(r => ({
        id_ojos_color: r.id,
        ojos_color: r.descripcion
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

    return { ojos_color, nariz_forma, pelo_tipo, pelo_color, piel, tamanio };
  
  }
}
