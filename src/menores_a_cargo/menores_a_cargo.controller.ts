import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenoresACargoService } from './menores_a_cargo.service';
import { CreateMenoresACargoDto } from './dto/create-menores_a_cargo.dto';
import { UpdateMenoresACargoDto } from './dto/update-menores_a_cargo.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('menores-a-cargo')
export class MenoresACargoController {
  constructor(private readonly menoresACargoService: MenoresACargoService) {}

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() createMenoresACargoDto: CreateMenoresACargoDto
  ) {
        
    return this.menoresACargoService.create(createMenoresACargoDto, user);
  }

  @Get()
  findAll() {
    return this.menoresACargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menoresACargoService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenoresACargoDto: UpdateMenoresACargoDto) {
  //   return this.menoresACargoService.update(+id, updateMenoresACargoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menoresACargoService.remove(+id);
  // }
}
