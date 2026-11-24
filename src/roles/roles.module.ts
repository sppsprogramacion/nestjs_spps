import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Rol
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
