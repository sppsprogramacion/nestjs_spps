import { Injectable } from '@nestjs/common';
import { CreateOjosTamanioDto } from './dto/create-ojos-tamanio.dto';
import { UpdateOjosTamanioDto } from './dto/update-ojos-tamanio.dto';

@Injectable()
export class OjosTamanioService {
  create(createOjosTamanioDto: CreateOjosTamanioDto) {
    return 'This action adds a new ojosTamanio';
  }

  findAll() {
    return `This action returns all ojosTamanio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ojosTamanio`;
  }

  update(id: number, updateOjosTamanioDto: UpdateOjosTamanioDto) {
    return `This action updates a #${id} ojosTamanio`;
  }

  remove(id: number) {
    return `This action removes a #${id} ojosTamanio`;
  }
}
