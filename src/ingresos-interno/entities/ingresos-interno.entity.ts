import { EstadoProcesal } from "src/estado-procesal/entities/estado-procesal.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Jurisdiccion } from "src/jurisdiccion/entities/jurisdiccion.entity";
import { OrganismoExterno } from "src/organismos-externos/entities/organismos-externo.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Reingreso } from "src/reingreso/entities/reingreso.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingresos_interno')
export class IngresoInterno {

    @PrimaryGeneratedColumn()
    id_ingreso_interno: number;

    //INTERNO
    @Column({
        type: 'int',
        nullable: false
    })
    interno_id: number;

    @ManyToOne(type => Interno, {eager: true} )
    @JoinColumn({
        name: 'interno_id',
        referencedColumnName: 'id_interno'
    })
    interno: Interno;
    //FIN INTERNO

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_primer_ingreso: Date;

    //ORGANISMO EXTERNO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_externo_id: number;

    @ManyToOne(type => OrganismoExterno, {eager: true} )
    @JoinColumn({
        name: 'organismo_externo_id',
        referencedColumnName: 'id_organismo_externo'
    })
    organismo_externo: OrganismoExterno;
    //FIN ORGANISMO EXTERNO    

    //ORGANISMO PROCEDENCIA
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_procedencia_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_procedencia_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_procedencia: Organismo;
    //FIN ORGANISMO PROCEDENCIA    

    //ORGANISMO ALOJAMIENTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    organismo_alojamiento_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_alojamiento_id',
        referencedColumnName: 'id_organismo'
    })
    organismo_alojamiento: Organismo;
    //FIN ORGANISMO ALOJAMIENTO    
    
    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_alojamiento: Date;

    //ESTADO PROCESAL
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'P'
    })
    estado_procesal_id: string;

    @ManyToOne(type => EstadoProcesal, {eager: true} )
    @JoinColumn({
        name: 'estado_procesal_id',
        referencedColumnName: 'id_estado_procesal'
    })
    estado_procesal: EstadoProcesal;
    //FIN ESTADO PROCESAL    

    //JURISDICCION
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'P'
    })
    jurisdiccion_id: string;

    @ManyToOne(type => Jurisdiccion, {eager: true} )
    @JoinColumn({
        name: 'jurisdiccion_id',
        referencedColumnName: 'id_jurisdiccion'
    })
    jurisdiccion: Jurisdiccion;
    //FIN JURISDICCION  

    //JURISDICCION
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'P'
    })
    otra_jurisdiccion_id: string;

    @ManyToOne(type => Jurisdiccion, {eager: true} )
    @JoinColumn({
        name: 'otra_jurisdiccion_id',
        referencedColumnName: 'id_jurisdiccion'
    })
    otra_jurisdiccion: Jurisdiccion;
    //FIN JURISDICCION  

    //REINGRESO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    reingreso_id: number;

    @ManyToOne(type => Reingreso, {eager: true} )
    @JoinColumn({
        name: 'reingreso_id',
        referencedColumnName: 'id_reingreso'
    })
    reingreso: Jurisdiccion;
    //FIN REINGRESO  

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    numero_reingreso: number;

    @Column({
        type:'varchar',
        length: 50,
        nullable: false
    })
    prontuario_policial: string;

    @Column({
        type: "boolean",
        default: false
    })
    esta_liberado: boolean;

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_egreso: Date;

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_carga: Date;

    //ORGANISMO CARGA
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
    //FIN ORGANISMO CARGA

    //USUARIO CARGA
    @Column({
        type: 'int',
        nullable: false,
        default: 2
    })
    usuario_carga_id: number;

    @ManyToOne(type => Usuario, {eager: true} )
    @JoinColumn({
        name: 'usuario_carga_id',
        referencedColumnName: 'id_usuario'
    })
    usuario_carga: Usuario;
    //FIN USUARIO CARGA

    @Column({
        type: "boolean",
        default: false
    })
    eliminado: boolean;
}
