import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


import { EstadoCivil } from "src/estado-civil/entities/estado-civil.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Nacionalidad } from "src/nacionalidades/entities/nacionalidad.entity";
import { Pais } from "src/paises/entities/pais.entity";
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";

@Entity('ciudadanos')
export class Ciudadano {
    @PrimaryGeneratedColumn()
    id_ciudadano: number;
    
    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    dni: number;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    apellido: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    nombre: string;

    //SEXO
    @Column({
        type: 'int',
        nullable: false
    })
    sexo_id: number;

    @ManyToOne(type => Sexo, {eager: true} )
    @JoinColumn({
        name: 'sexo_id',
        referencedColumnName: 'id_sexo'
    })
    sexo: Sexo;
    //FIN SEXO

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_nac: Date;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;    

    //ESTADO CIVIL
    @Column({
        type: 'int',
        nullable: false
    })
    estado_civil_id: number;

    @ManyToOne(type => EstadoCivil, {eager: true} )
    @JoinColumn({
        name: 'estado_civil_id',
        referencedColumnName: 'id_estado_civil'
    })
    estado_civil: EstadoCivil;
    //FIN ESTADO CIVIL

    //NACIONALIDAD
    @Column({
        type: 'varchar',
        length: 10,
        default: 'AR'
    })
    nacionalidad_id: string;

    @ManyToOne(type => Nacionalidad, {eager: true} )
    @JoinColumn({
        name: 'nacionalidad_id',
        referencedColumnName: 'id_nacionalidad'
    })
    nacionalidad: Nacionalidad;
    //FIN NACIONALIDAD

    //PAIS
    @Column({
        type: 'varchar',
        length: 10,
        default: 'AR'
    })
    pais_id: string;

    @ManyToOne(type => Pais, {eager: true} )
    @JoinColumn({
        name: 'pais_id',
        referencedColumnName: 'id_pais'
    })
    pais: Pais;
    //FIN PAIS

    //PROVINCIA
    @Column({
        type: 'varchar',
        length: 10,
        default: 'SINESP'
    })
    provincia_id: string;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_id',
        referencedColumnName: 'id_provincia'
    })
    provincia: Provincia;
    //FIN PROVINCIA

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    departamento_id: number;

    @ManyToOne(type => Departamento, {eager: true} )
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento;
    //FIN DEPARTAMENTO

    //MUNICIPIO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    municipio_id: number;

    @ManyToOne(type => Municipio, {eager: true} )
    @JoinColumn({
        name: 'municipio_id',
        referencedColumnName: 'id_municipio'
    })
    municipio: Municipio;
    //FIN MUNICIPIO

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    ciudad: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    barrio: string;

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: 'Sin especificar'
    })
    direccion: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    numero_dom: number;
  
    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    tiene_discapacidad: boolean;

    @Column({
        type:'varchar',
        length: 2000,
        nullable: false,
        default: 'Sin especificar'
    })
    discapacidad_detalle: string;
    
    
    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    es_visita: boolean;
    
    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    foto: string; 

    @Column({
        type: 'varchar',
        length: 500,
        default: 'https://drive.google.com/uc?id=1Fe8GN5PrwVvU1EBW_2lGo2OusPp8d3Ej&export=download',
        nullable: true
    })
    foto_defecto: string; 
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_alta: Date;

    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_alta_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_alta_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_alta: Organismo;
    //FIN ORGANISMO

    //USUARIO ALTA
    @Column({
        type: 'int',
        nullable: false,
        default:2
    })
    usuario_id_alta: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_id_alta',
        referencedColumnName: 'id_usuario'
    })
    usuario_alta: Usuario;
    //FIN USUARIO ALTA


}
