import { Injectable } from '@nestjs/common';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';

@Injectable()
export class IngresosInternoService {
  create(createIngresosInternoDto: CreateIngresosInternoDto) {
    return 'This action adds a new ingresosInterno';
  }

  findAll() {
    return `This action returns all ingresosInterno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingresosInterno`;
  }

  update(id: number, updateIngresosInternoDto: UpdateIngresosInternoDto) {
    return `This action updates a #${id} ingresosInterno`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingresosInterno`;
  }
}
