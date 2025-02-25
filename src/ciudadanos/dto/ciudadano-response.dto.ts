import { Departamento } from "src/departamentos/entities/departamento.entity";
import { EstadoCivil } from "src/estado-civil/entities/estado-civil.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Nacionalidad } from "src/nacionalidades/entities/nacionalidad.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Pais } from "src/paises/entities/pais.entity";
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";


export class CiudadanoRespnseDto {
    
    id_ciudadano: number;
    
    dni: number;

    apellido: string;

    nombre: string;

    sexo_id: number;

    sexo: Sexo;
    
    fecha_nac: Date;
    
    telefono: string;    
    
    estado_civil_id: number;
    
    estado_civil: EstadoCivil;
    
    nacionalidad_id: string;
   
    nacionalidad: Nacionalidad;
    
    pais_id: string;

    pais: Pais;
    
    provincia_id: string;
    
    provincia: Provincia;
    
    departamento_id: number;
    
    departamento: Departamento;
    
    municipio_id: number;

    municipio: Municipio;
    
    ciudad: string;
    
    barrio: string;

    direccion: string;
    
    numero_dom: number;
        
    tiene_discapacidad: boolean;
   
    es_visita: boolean;
   
    foto: string; 

    foto_defecto: string; 
        
    fecha_alta: Date;

    organismo_alta_id: number;

    organismo_alta: Organismo;
    
    usuario_id_alta: number;
    
    usuario_alta: Usuario;

    edad: number;

    categoria: string;
    
}
