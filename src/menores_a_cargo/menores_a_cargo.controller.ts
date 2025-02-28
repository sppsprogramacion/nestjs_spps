import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenoresACargoService } from './menores_a_cargo.service';
import { CreateMenoresACargoDto } from './dto/create-menores_a_cargo.dto';
import { UpdateMenoresACargoDto } from './dto/update-menores_a_cargo.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('menores-a-cargo')
export class MenoresACargoController {
  constructor(private readonly menoresACargoService: MenoresACargoService) {}

  @Post()
  create(@Body() createMenoresACargoDto: CreateMenoresACargoDto) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.menoresACargoService.create(createMenoresACargoDto, usuariox);
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
