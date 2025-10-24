import { EstadoCivil } from "src/estado-civil/entities/estado-civil.entity";
import { Nacionalidad } from "src/nacionalidades/entities/nacionalidad.entity";
import { OjosColor } from "src/ojos_color/entities/ojos_color.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Tamanio } from "src/tamanio/entities/tamanio.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
        nullable: false,
        unique: true
    })
    prontuario: number;
    
    @Column({
        type: 'int',
        nullable: false,
        unique: false
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
        nullable: false
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
        type:'decimal',
        nullable: false
    })
    talla: number;

    //OJOS COLOR
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'A'
    })
    ojos_color_id: number;

    @ManyToOne(type => OjosColor, {eager: true} )
    @JoinColumn({
        name: 'ojo_color_id',
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
    ojos_tamanio_id: number;

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
    nariz_tamanio_id: number;

    @ManyToOne(type => Tamanio, {eager: true} )
    @JoinColumn({
        name: 'nariz_tamanio_id',
        referencedColumnName: 'id_tamanio'
    })
    nariz_tamanio: Tamanio;
    //FIN NARIZ TAMANIO

    //FIN CARACTERISTICAS PERSONALES.................................

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_nacimiento: Date;

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
        nullable: true
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

}
