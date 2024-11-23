import { Injectable } from '@nestjs/common';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';

@Injectable()
export class ProhibicionesVisitaService {
  create(createProhibicionesVisitaDto: CreateProhibicionesVisitaDto) {
    return 'This action adds a new prohibicionesVisita';
  }

  findAll() {
    return `This action returns all prohibicionesVisita`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prohibicionesVisita`;
  }

  update(id: number, updateProhibicionesVisitaDto: UpdateProhibicionesVisitaDto) {
    return `This action updates a #${id} prohibicionesVisita`;
  }

  remove(id: number) {
    return `This action removes a #${id} prohibicionesVisita`;
  }
}
