import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CaracteristicasPersonalesService {
  constructor(private dataSource: DataSource) {}

  async obtenerTodas() {
    const query = `
      SELECT ojo_color, id_ojo_color, 'ojo_color' AS tipo_caracteristica FROM ojos_color
      UNION
      SELECT id_nariz_forma AS ojo_color, nariz_forma AS id_ojo_color, 'nariz_forma' AS tipo_caracteristica FROM nariz_forma
      UNION
      SELECT id_pelo_tipo AS ojo_color, pelo_tipo AS id_ojo_color, 'pelo_tipo' AS tipo_caracteristica FROM pelo_tipo
      UNION
      SELECT id_piel AS ojo_color, piel AS id_ojo_color, 'piel' AS tipo_caracteristica FROM piel
      UNION
      SELECT id_tamanio AS ojo_color, tamanio AS id_ojo_color, 'tamanio' AS tipo_caracteristica FROM tamanio;
    `;

    const resultado = await this.dataSource.query(query);

    // Agrupar por tipo_caracteristica
    const agrupado = {
      ojos_color: resultado.filter(r => r.tipo_caracteristica === 'ojo_color'),
      nariz_forma: resultado.filter(r => r.tipo_caracteristica === 'nariz_forma'),
      pelo_tipo: resultado.filter(r => r.tipo_caracteristica === 'pelo_tipo'),
      piel: resultado.filter(r => r.tipo_caracteristica === 'piel'),
      tamanio: resultado.filter(r => r.tipo_caracteristica === 'tamanio'),
    };

    return agrupado;
  }
}
