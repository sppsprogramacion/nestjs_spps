import { Injectable } from '@nestjs/common';
import { CreateTrimestreDto } from './dto/create-trimestre.dto';
import { UpdateTrimestreDto } from './dto/update-trimestre.dto';

@Injectable()
export class TrimestresService {
  create(createTrimestreDto: CreateTrimestreDto) {
    return 'This action adds a new trimestre';
  }

  findAll() {
    return `This action returns all trimestres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trimestre`;
  }

  update(id: number, updateTrimestreDto: UpdateTrimestreDto) {
    return `This action updates a #${id} trimestre`;
  }

  remove(id: number) {
    return `This action removes a #${id} trimestre`;
  }
}
