import { Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';

@Injectable()
export class SistemasService {
  create(createSistemaDto: CreateSistemaDto) {
    return 'This action adds a new sistema';
  }

  findAll() {
    return `This action returns all sistemas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sistema`;
  }

  update(id: number, updateSistemaDto: UpdateSistemaDto) {
    return `This action updates a #${id} sistema`;
  }

  remove(id: number) {
    return `This action removes a #${id} sistema`;
  }
}
