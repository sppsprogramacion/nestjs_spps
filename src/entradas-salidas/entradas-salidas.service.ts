import { Injectable } from '@nestjs/common';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { UpdateEntradasSalidaDto } from './dto/update-entradas-salida.dto';

@Injectable()
export class EntradasSalidasService {
  create(createEntradasSalidaDto: CreateEntradasSalidaDto) {
    return 'This action adds a new entradasSalida';
  }

  findAll() {
    return `This action returns all entradasSalidas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entradasSalida`;
  }

  update(id: number, updateEntradasSalidaDto: UpdateEntradasSalidaDto) {
    return `This action updates a #${id} entradasSalida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradasSalida`;
  }
}
