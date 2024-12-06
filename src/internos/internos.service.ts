import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInternoDto } from './dto/create-interno.dto';
import { UpdateInternoDto } from './dto/update-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interno } from './entities/interno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InternosService {
  constructor(
    @InjectRepository(Interno)
    private readonly internoRepository: Repository<Interno>
  ){}
  
  async create(createDto: CreateInternoDto) {
    try {

      const nuevo: Interno = await this.internoRepository.create(createDto );

      return await this.internoRepository.save(nuevo);

    } catch (error) {      

      if(error.code=='ER_DUP_ENTRY'){
      
        let existe = await this.internoRepository.findOneBy({prontuario: createDto.prontuario});
        if(existe) throw new BadRequestException ("El prontuario ya existe.");
      }   

      throw new InternalServerErrorException('Error al crear el interno: ' + error.message);
    }
  }

  async findAll() {
    return await this.internoRepository.find(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }
  
  //BUSCAR LISTA POR PRONTUARIO
  async findListaXProntuario(dnix: number) {

    return this.internoRepository
      .createQueryBuilder('interno')
      .select(['interno.id_ciudadano', 'interno.apellido', 'interno.nombre', 'interno.prontuario']) // Campos específicos
      .leftJoinAndSelect('interno.sexo', 'sexo') // Relación
      .where('interno.dni = :dni', {dni: dnix})
      .orderBy('interno.apellido', 'ASC')
      .getMany();

  }
  //FIN BUSCAR LISTA POR PRONTUARIO....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string) {
    
    return this.internoRepository
      .createQueryBuilder('interno')
      .select(['interno.id_ciudadano', 'interno.apellido', 'interno.nombre', 'interno.prontuario']) // Campos específicos
      .leftJoinAndSelect('interno.sexo', 'sexo') // Relación
      .where('interno.apellido LIKE :apellido', {apellido: `%${apellidox}%`})
      .orderBy('interno.apellido', 'ASC')
      .getMany();
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................

  //BUSCAR  XPRONTUARIO
  async findXProntuario(prontuariox: number) {
    
    const respuesta = await this.internoRepository.findOneBy({prontuario: prontuariox});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XPRONTUARIO..................................................................


  async findOne(id: number) {
    const respuesta = await this.internoRepository.findOneBy({id_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.", "verificque el id del ciudadano");

    return respuesta;
  }

  async update(id: number, updateDto: UpdateInternoDto) {
    try{
      const respuesta = await this.internoRepository.update(id, updateDto);
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
