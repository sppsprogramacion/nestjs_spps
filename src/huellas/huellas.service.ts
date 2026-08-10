import { Injectable } from '@nestjs/common';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';

@Injectable()
export class HuellasService {
  create(createHuellaDto: CreateHuellaDto) {
    return 'This action adds a new huella';
  }

  findAll() {
    return `This action returns all huellas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} huella`;
  }

  update(id: number, updateHuellaDto: UpdateHuellaDto) {
    return `This action updates a #${id} huella`;
  }

  remove(id: number) {
    return `This action removes a #${id} huella`;
  }
}
