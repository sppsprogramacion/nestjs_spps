import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { EstadoCivil } from "src/estado-civil/entities/estado-civil.entity";
import { Nacionalidad } from "src/nacionalidades/entities/nacionalidad.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bitacora_ciudadano')
export class BitacoraCiudadano {
    
    @PrimaryGeneratedColumn()
    id_bitacora_ciudadano: number;

    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO
    
    @Column({
        type: 'int',
        nullable: false,
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
        type: 'int',
        nullable: false,
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

    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    tiene_discapacidad: boolean;
    
    
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
        length: 2000,
        nullable: false
    })
    detalle_motivo: string;
    
    @Column({
        type: 'date',
        nullable: false
    })
    fecha_cambio: Date;

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
    organismo_alta: Organismo;
    //FIN ORGANISMO

    //USUARIO
    @Column({
        type: 'int',
        nullable: false,
        default:2
    })
    usuario_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO

}
