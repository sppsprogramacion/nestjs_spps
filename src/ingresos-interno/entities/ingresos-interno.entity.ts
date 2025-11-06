import { EstadoProcesal } from "src/estado-procesal/entities/estado-procesal.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Jurisdiccion } from "src/jurisdiccion/entities/jurisdiccion.entity";
import { OrganismoExterno } from "src/organismos-externos/entities/organismos-externo.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
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
        type: 'int',
        nullable: false,
        default: 1
    })
    estado_procesal_id: number;

    @ManyToOne(type => EstadoProcesal, {eager: true} )
    @JoinColumn({
        name: 'estado_procesal_id',
        referencedColumnName: 'id_estado_procesal'
    })
    estado_procesal: EstadoProcesal;
    //FIN ESTADO PROCESAL    

    //JURISDICCION
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    jurisdiccion_id: number;

    @ManyToOne(type => Jurisdiccion, {eager: true} )
    @JoinColumn({
        name: 'jurisdiccion_id',
        referencedColumnName: 'id_jurisdiccion'
    })
    jurisdiccion: Jurisdiccion;
    //FIN JURISDICCION  


    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    anulado: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    prohibido: boolean;

    

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_inicio: Date;

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_fin: Date;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    detalles_prohibicion: string;

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
    organismo_id: number;

    @ManyToOne(type => Organismo, {eager: true} )
    @JoinColumn({
        name: 'organismo_id',
        referencedColumnName: 'id_organismo'
    })
    organismo: Organismo;
    //FIN ORGANISMO

    //USUARIO
    @Column({
        type: 'int',
        nullable: false,
        default: 2
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
