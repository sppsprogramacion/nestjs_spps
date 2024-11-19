import { Injectable } from '@nestjs/common';
import { CreateNacionalidadeDto } from './dto/create-nacionalidade.dto';
import { UpdateNacionalidadeDto } from './dto/update-nacionalidade.dto';

@Injectable()
export class NacionalidadesService {
  create(createNacionalidadeDto: CreateNacionalidadeDto) {
    return 'This action adds a new nacionalidade';
  }

  findAll() {
    return `This action returns all nacionalidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nacionalidade`;
  }

  update(id: number, updateNacionalidadeDto: UpdateNacionalidadeDto) {
    return `This action updates a #${id} nacionalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} nacionalidade`;
  }
}
