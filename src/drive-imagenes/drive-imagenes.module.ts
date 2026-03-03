import { Module } from '@nestjs/common';
import { DriveImagenesService } from './drive-imagenes.service';
import { DriveImagenesController } from './drive-imagenes.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
      AuthModule,
    ],
  controllers: [DriveImagenesController],
  providers: [DriveImagenesService]
})
export class DriveImagenesModule {}
