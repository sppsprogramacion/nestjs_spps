import { Module } from '@nestjs/common';
import { ParentescosService } from './parentescos.service';
import { ParentescosController } from './parentescos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parentesco } from './entities/parentesco.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Parentesco
    ])
  ],
  controllers: [ParentescosController],
  providers: [ParentescosService]
})
export class ParentescosModule {}
