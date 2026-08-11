import { Injectable } from '@nestjs/common';
import { CreateHuellasCambioDto } from './dto/create-huellas-cambio.dto';
import { UpdateHuellasCambioDto } from './dto/update-huellas-cambio.dto';

@Injectable()
export class HuellasCambiosService {
  create(createHuellasCambioDto: CreateHuellasCambioDto) {
    return 'This action adds a new huellasCambio';
  }

  findAll() {
    return `This action returns all huellasCambios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} huellasCambio`;
  }

  update(id: number, updateHuellasCambioDto: UpdateHuellasCambioDto) {
    return `This action updates a #${id} huellasCambio`;
  }

  remove(id: number) {
    return `This action removes a #${id} huellasCambio`;
  }
}
