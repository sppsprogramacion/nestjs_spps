import { Module } from '@nestjs/common';
import { BiometriaVersionService } from './biometria_version.service';
import { BiometriaVersionController } from './biometria_version.controller';

@Module({
  controllers: [BiometriaVersionController],
  providers: [BiometriaVersionService]
})
export class BiometriaVersionModule {}
