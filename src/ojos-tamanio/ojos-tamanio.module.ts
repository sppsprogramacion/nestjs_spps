import { Module } from '@nestjs/common';
import { OjosTamanioService } from './ojos-tamanio.service';
import { OjosTamanioController } from './ojos-tamanio.controller';

@Module({
  controllers: [OjosTamanioController],
  providers: [OjosTamanioService]
})
export class OjosTamanioModule {}
