import { Injectable } from '@nestjs/common';
import { CreateBiometriaVersionDto } from './dto/create-biometria_version.dto';
import { UpdateBiometriaVersionDto } from './dto/update-biometria_version.dto';

@Injectable()
export class BiometriaVersionService {
  create(createBiometriaVersionDto: CreateBiometriaVersionDto) {
    return 'This action adds a new biometriaVersion';
  }

  findAll() {
    return `This action returns all biometriaVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biometriaVersion`;
  }

  update(id: number, updateBiometriaVersionDto: UpdateBiometriaVersionDto) {
    return `This action updates a #${id} biometriaVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} biometriaVersion`;
  }
}
