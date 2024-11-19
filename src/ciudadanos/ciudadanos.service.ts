import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CiudadanosService {

  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>
  ){}
  
  async create(createCiudadanoDto: CreateCiudadanoDto) {
    try {

      const nuevo: Ciudadano = await this.ciudadanoRepository.create(createCiudadanoDto );

      return await this.ciudadanoRepository.save(nuevo);

    } catch (error) {      

      if(error.code=='ER_DUP_ENTRY'){
      
        let existe = await this.ciudadanoRepository.findOneBy({dni: createCiudadanoDto.dni});
        if(existe) throw new BadRequestException ("El dni ya existe.");
      }   

      throw new InternalServerErrorException('Error al crear el ciudadano: ' + error.message);
    }
  }

  async findAll() {
    return await this.ciudadanoRepository.find(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }
  
  //BUSCAR LISTA POR DNI
  async findListaXDni(dnix: number) {

    return await this.ciudadanoRepository.findAndCount(
      {
        order:{
            apellido: "ASC"
        },
        where: {
          dni: dnix,          
        }
      }
    );
  }
  //FIN BUSCAR LISTA POR DNI....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string) {

    return await this.ciudadanoRepository.findAndCount(
      {
        order:{
            apellido: "ASC"
        },
        where: {
          apellido: Like(`%${apellidox}%`),          
        }
      }
    );
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................


  async findOne(id: number) {
    const respuesta = await this.ciudadanoRepository.findOneBy({id_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.", "verificque el id del ciudadano");

    return respuesta;
  }

  update(id: number, updateCiudadanoDto: UpdateCiudadanoDto) {
    return `This action updates a #${id} ciudadano`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciudadano`;
  }
}
