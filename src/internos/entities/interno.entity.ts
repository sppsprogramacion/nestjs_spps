import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Departamento } from "src/departamentos/entities/departamento.entity";
import { EstadoCivil } from "src/estado-civil/entities/estado-civil.entity";
import { Nacionalidad } from "src/nacionalidades/entities/nacionalidad.entity";
import { NarizForma } from "src/nariz-forma/entities/nariz-forma.entity";
import { OjosColor } from "src/ojos_color/entities/ojos_color.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { PeloColor } from "src/pelo-color/entities/pelo-color.entity";
import { PeloTipo } from "src/pelo-tipo/entities/pelo-tipo.entity";
import { Piel } from "src/piel/entities/piel.entity";
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Tamanio } from "src/tamanio/entities/tamanio.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ZonaResidencia } from "src/zona-residencia/entities/zona-residencia.entity";
import { IngresoInterno } from "src/ingresos-interno/entities/ingresos-interno.entity";

@Entity('internos')
export class Interno {

    @PrimaryGeneratedColumn()
    id_interno: number;

    @Column({
        type:'varchar',
        length: 20,
        nullable: false,
        unique:true
    })
    codigo: string;

    @Column({
        type: 'int',
        nullable: true,
        unique: true,
        default:null
    })
    prontuario: number;
    
    @Column({
        type: 'int',
        nullable: true,
        unique: true,
        default: null
    })
    num_oc: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    dni: number;

    @Column({
        type:'varchar',
        length: 300,
        nullable: false
    })
    apellido: string;

    @Column({
        type:'varchar',
        length: 300,
        nullable: false
    })
    nombre: string;

    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    alias: string;

    //CARACTERISTICAS PERSONALES
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
        type: 'decimal',
      precision: 4,
      scale: 2,
      nullable: false, 
      default: 0
    })
    talla: string;

    //OJOS COLOR
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'A'
    })
    ojos_color_id: string;

    @ManyToOne(type => OjosColor, {eager: true} )
    @JoinColumn({
        name: 'ojos_color_id',
        referencedColumnName: 'id_ojo_color'
    })
    ojos_color: OjosColor;
    //FIN OJOS COLOR

    //OJOS TAMANIO
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'CH'
    })
    ojos_tamanio_id: string;

    @ManyToOne(type => Tamanio, {eager: true} )
    @JoinColumn({
        name: 'ojos_tamanio_id',
        referencedColumnName: 'id_tamanio'
    })
    ojos_tamanio: Tamanio;
    //FIN OJOS TAMANIO

    //NARIZ TAMANIO
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'CH'
    })
    nariz_tamanio_id: string;

    @ManyToOne(type => Tamanio, {eager: true} )
    @JoinColumn({
        name: 'nariz_tamanio_id',
        referencedColumnName: 'id_tamanio'
    })
    nariz_tamanio: Tamanio;
    //FIN NARIZ TAMANIO

    //NARIZ FORMA
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'A'
    })
    nariz_forma_id: string;

    @ManyToOne(type => NarizForma, {eager: true} )
    @JoinColumn({
        name: 'nariz_forma_id',
        referencedColumnName: 'id_nariz_forma'
    })
    nariz_forma: NarizForma;
    //FIN NARIZ FORMA

    //PELO TIPO
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'CO'
    })
    pelo_tipo_id: string;

    @ManyToOne(type => PeloTipo, {eager: true} )
    @JoinColumn({
        name: 'pelo_tipo_id',
        referencedColumnName: 'id_pelo_tipo'
    })
    pelo_tipo: PeloTipo;
    //FIN PELO TIPO

    //PELO COLOR
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'C'
    })
    pelo_color_id: string;

    @ManyToOne(type => PeloColor, {eager: true} )
    @JoinColumn({
        name: 'pelo_color_id',
        referencedColumnName: 'id_pelo_color'
    })
    pelo_color: PeloColor;
    //FIN PELO COLOR

    //PIEL
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'T'
    })
    piel_id: string;

    @ManyToOne(type => Piel, {eager: true} )
    @JoinColumn({
        name: 'piel_id',
        referencedColumnName: 'id_piel'
    })
    piel: Piel;
    //FIN PIEL

    //FIN CARACTERISTICAS PERSONALES.................................

    //DATOS FILIATORIOS
    
    //NACIONALIDAD
    @Column({
        type: 'varchar',
        length: 10,
        default: 'SINNAC'
    })
    nacionalidad_id: string;

    @ManyToOne(type => Nacionalidad, {eager: true} )
    @JoinColumn({
        name: 'nacionalidad_id',
        referencedColumnName: 'id_nacionalidad'
    })
    nacionalidad: Nacionalidad;
    //FIN NACIONALIDAD

    //PROVINCIA NACIMIENTO
    @Column({
        type: 'varchar',
        length: 10,
        default: 'SINESP'
    })
    provincia_nacimiento_id: string;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_nacimiento_id',
        referencedColumnName: 'id_provincia'
    })
    provincia_nacimiento: Provincia;
    //FIN PROVINCIA NACIMIENTO

    //DEPARTAMENTO NACIMIENTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    departamento_nacimiento_id: number;

    @ManyToOne(type => Departamento, {eager: true} )
    @JoinColumn({
        name: 'departamento_nacimiento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento_nacimiento: Departamento;
    //FIN DEPARTAMENTO NACIMIENTO

    @Column({
        type:'varchar',
        length: 100,
        nullable: false,
        default: "sin especificar"
    })
    ciudad: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_nacimiento: Date;
    
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

    //ZONA RESIDENCIA
    @Column({
        type: 'varchar',
        length: 10,
        default: "U"
    })
    zona_residencia_id: string;

    @ManyToOne(type => ZonaResidencia, {eager: true} )
    @JoinColumn({
        name: 'zona_residencia_id',
        referencedColumnName: 'id_zona_residencia'
    })
    zona_residencia: ZonaResidencia;
    //FIN ZONA RESIDENCIA

    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    padre: string;

    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    madre: string;

    @Column({
        type:'varchar',
        length: 500,
        nullable: true
    })
    parientes: string;
    
    //FIN DATOS FILIATORIOS......................................................

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;    

    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_id',
        referencedColumnName: 'id_organismo'
    })
    organismo: Organismo;
    //FIN ORGANISMO

        
    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        default: "foto-interno-0.jpg"
    })
    foto: string; 
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_carga: Date;

    //USUARIO CARGA
    @Column({
        type: 'int',
        nullable: false,
        default:2
    })
    usuario_carga_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_carga_id',
        referencedColumnName: 'id_usuario'
    })
    usuario_carga: Usuario;
    //FIN USUARIO CARGA

    //ORGANISMO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_carga_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_carga_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_carga: Organismo;
    //FIN ORGANISMO

    @OneToMany(() => IngresoInterno, ingreso => ingreso.interno)
    ingresos: IngresoInterno[];

}
