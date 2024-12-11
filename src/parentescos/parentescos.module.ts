import { Module } from '@nestjs/common';
import { ParentescosService } from './parentescos.service';
import { ParentescosController } from './parentescos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parentesco } from './entities/parentesco.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Parentesco
    ])
  ],
  controllers: [ParentescosController],
  providers: [ParentescosService]
})
export class ParentescosModule {}
