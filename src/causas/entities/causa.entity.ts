import { EstadoProcesal } from "src/estado-procesal/entities/estado-procesal.entity";
import { IngresoInterno } from "src/ingresos-interno/entities/ingresos-interno.entity";
import { Jurisdiccion } from "src/jurisdiccion/entities/jurisdiccion.entity";
import { Juzgado } from "src/juzgados/entities/juzgado.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { PrisionReclusion } from "src/prision-reclusion/entities/prision-reclusion.entity";
import { Reincidencia } from "src/reincidencia/entities/reincidencia.entity";
import { TipoDelito } from "src/tipo-delito/entities/tipo-delito.entity";
import { TipoDefensor } from "src/tipos-defensor/entities/tipos-defensor.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('causas')
export class Causa {
    @PrimaryGeneratedColumn()
    id_causa: number;

    //INGRESO
    @Column({
        type: 'int',
        nullable: false
    })
    ingreso_interno_id: number;

    @ManyToOne(type => IngresoInterno, {eager: true} )
    @JoinColumn({
        name: 'ingreso_interno_id',
        referencedColumnName: 'id_ingreso_interno'
    })
    ingreso_interno: IngresoInterno;
    //FIN INGRESO

    @Column({
        type:'varchar',
        length: 300,
        nullable: false
    })
    causa: string;

    //PRISION_RECLUSION
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
        default: 'P'
    })
    prision_reclusion_id: string;

    @ManyToOne(type => PrisionReclusion, {eager: true} )
    @JoinColumn({
        name: 'prision_reclusion_id',
        referencedColumnName: 'id_prision_reclusion'
    })
    prision_reclusion: PrisionReclusion;
    //FIN PRISION_RECLUSION    

    @Column({
        type:'varchar',
        length: 50,
        nullable: true
    })
    expediente: string;

    //TIPO DELITO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    tipo_delito_id: number;

    @ManyToOne(type => TipoDelito, {eager: true} )
    @JoinColumn({
        name: 'tipo_delito_id',
        referencedColumnName: 'id_tipo_delito'
    })
    tipo_delito: TipoDelito;
    //FIN TIPO DELITO 

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
    
    //JUZGADO
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    juzgado_id: string;

    @ManyToOne(type => Juzgado, {eager: true} )
    @JoinColumn({
        name: 'juzgado_id',
        referencedColumnName: 'id_juzgado'
    })
    juzgado: Juzgado;
    //FIN JUZGADO    

    //OTRO JUZGADO
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    otro_juzgado_id: string;

    @ManyToOne(type => Juzgado, {eager: true} )
    @JoinColumn({
        name: 'otro_juzgado_id',
        referencedColumnName: 'id_juzgado'
    })
    otro_juzgado: Juzgado;
    //FIN OTRO JUZGADO    

    //REINCIDENCIA
    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    reincidencia_id: string;

    @ManyToOne(type => Reincidencia, {eager: true} )
    @JoinColumn({
        name: 'reincidencia_id',
        referencedColumnName: 'id_reincidencia'
    })
    reincidencia: Reincidencia;
    //FIN REINCIDENCIA  

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_ultima_detencion: Date;

    @Column({
        type: "boolean",
        default: false
    })
    tiene_computo: boolean;

    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_condena: Date;

    //TRIBUNAL CONDENA
    @Column({
        type: 'varchar',
        length: 10,
        nullable: true
    })
    tribunal_condena_id: string;

    @ManyToOne(type => Juzgado, {eager: true} )
    @JoinColumn({
        name: 'tribunal_condena_id',
        referencedColumnName: 'id_juzgado'
    })
    tribunal_condena: Juzgado;
    //FIN TRIBUNAL CONDENA    
    
    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    pena_anios: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    pena_meses: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    pena_dias: number;
    
    @Column({
        type: 'date',
        nullable: true        
    })
    fecha_cumple_pena: Date;

    //TIPO DEFENSOR
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    tipo_defensor_id: number;

    @ManyToOne(type => TipoDefensor, {eager: true} )
    @JoinColumn({
        name: 'tipo_defensor_id',
        referencedColumnName: 'id_tipo_defensor'
    })
    tipo_defensor: TipoDefensor;
    //FIN TIPO DEFENSOR    

    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    abogado: string;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

    @Column({
        type: 'date',
        nullable: false        
    })
    fecha_carga: Date;
    
    @Column({
        type: "boolean",
        default: false
    })
    eliminado: boolean;

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

}
