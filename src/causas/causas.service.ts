import { Injectable } from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';

@Injectable()
export class CausasService {
  create(createCausaDto: CreateCausaDto) {
    return 'This action adds a new causa';
  }

  findAll() {
    return `This action returns all causas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} causa`;
  }

  update(id: number, updateCausaDto: UpdateCausaDto) {
    return `This action updates a #${id} causa`;
  }

  remove(id: number) {
    return `This action removes a #${id} causa`;
  }
}
