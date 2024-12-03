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

    return this.ciudadanoRepository
    .createQueryBuilder('ciudadano')
    .select(['ciudadano.id_ciudadano', 'ciudadano.apellido', 'ciudadano.nombre', 'ciudadano.dni']) // Campos específicos
    .leftJoinAndSelect('ciudadano.sexo', 'sexo') // Relación
    .where('ciudadano.dni = :dni', {dni: dnix})
    .orderBy('ciudadano.apellido', 'ASC')
    .getMany();

  }
  //FIN BUSCAR LISTA POR DNI....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string) {
    console.log("en apellido");
    
    return this.ciudadanoRepository
    .createQueryBuilder('ciudadano')
    .select(['ciudadano.id_ciudadano', 'ciudadano.apellido', 'ciudadano.nombre', 'ciudadano.dni']) // Campos específicos
    .leftJoinAndSelect('ciudadano.sexo', 'sexo') // Relación
    .where('ciudadano.apellido LIKE :apellido', {apellido: `%${apellidox}%`})
    .orderBy('ciudadano.apellido', 'ASC')
    .getMany();
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

  async update(id: number, updateCiudadanoDto: UpdateCiudadanoDto) {
    try{
      const respuesta = await this.ciudadanoRepository.update(id, updateCiudadanoDto);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }

  remove(id: number) {
    return `This action removes a #${id} ciudadano`;
  }

  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
