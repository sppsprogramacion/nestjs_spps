import { Module } from '@nestjs/common';
import { DriveImagenesService } from './drive-imagenes.service';
import { DriveImagenesController } from './drive-imagenes.controller';

@Module({
  controllers: [DriveImagenesController],
  providers: [DriveImagenesService]
})
export class DriveImagenesModule {}
