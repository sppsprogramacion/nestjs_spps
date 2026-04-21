import { Concepto } from "src/concepto/entities/concepto.entity";
import { Conducta } from "src/conducta/entities/conducta.entity";
import { EstadoProcesal } from "src/estado-procesal/entities/estado-procesal.entity";
import { Fase } from "src/fases/entities/fase.entity";
import { Interno } from "src/internos/entities/interno.entity";
import { Jurisdiccion } from "src/jurisdiccion/entities/jurisdiccion.entity";
import { OrganismoExterno } from "src/organismos-externos/entities/organismos-externo.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { Pabellon } from "src/pabellones/entities/pabellone.entity";
import { Progresividad } from "src/progresividad/entities/progresividad.entity";
import { Reingreso } from "src/reingreso/entities/reingreso.entity";
import { SituacionProvisoria } from "src/situacion-provisoria/entities/situacion-provisoria.entity";
import { TipoDefensor } from "src/tipos-defensor/entities/tipos-defensor.entity";
import { Trimestre } from "src/trimestres/entities/trimestre.entity";
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

    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    obs_organismo_externo: string;

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
    
    @Column({
        type:'varchar',
        length: 200,
        nullable: true
    })
    obs_organismo_procedencia: string;

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
    reingreso: Reingreso;
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

    //PABELLON
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    pabellon_id: number;

    @ManyToOne(type => Pabellon, {eager: true} )
    @JoinColumn({
        name: 'pabellon_id',
        referencedColumnName: 'id_pabellon'
    })
    pabellon: Pabellon;
    //FIN PABELLON    

    @Column({
        type:'varchar',
        length: 10,
        nullable: true,
        default: 0
    })
    celda: string;

    @Column({
        type: "boolean",
        default: false
    })
    tiene_programa_puerta: boolean;

    //SITUIACION PROVISORIA
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    situacion_provisoria_id: number;

    @ManyToOne(type => SituacionProvisoria, {eager: true} )
    @JoinColumn({
        name: 'situacion_provisoria_id',
        referencedColumnName: 'id_situacion_provisoria'
    })
    situacion_provisoria: SituacionProvisoria;
    //FIN SITUIACION PROVISORIA
    
    @Column({
        type:'varchar',
        length: 500,
        nullable: true,
    })
    situacion_provisoria_detalle: string;

    //TRIMESTRE
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    trimestre_id: number;

    @ManyToOne(type => Trimestre, {eager: true} )
    @JoinColumn({
        name: 'trimestre_id',
        referencedColumnName: 'id_trimestre'
    })
    trimestre: Trimestre;
    //FIN TRIMESTRE

    //CONDUCTA
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    conducta_id: number;

    @ManyToOne(type => Conducta, {eager: true} )
    @JoinColumn({
        name: 'conducta_id',
        referencedColumnName: 'id_conducta'
    })
    conducta: Conducta;
    //FIN CONDUCTA

    //CONCEPTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    concepto_id: number;

    @ManyToOne(type => Concepto, {eager: true} )
    @JoinColumn({
        name: 'concepto_id',
        referencedColumnName: 'id_concepto'
    })
    concepto: Concepto;
    //FIN CONCEPTO

    //PROGRESIVIDAD
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    progresividad_id: number;

    @ManyToOne(type => Progresividad, {eager: true} )
    @JoinColumn({
        name: 'progresividad_id',
        referencedColumnName: 'id_progresividad'
    })
    progresividad: Progresividad;
    //FIN PROGRESIVIDAD

    //FASE
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    fase_id: number;

    @ManyToOne(type => Fase, {eager: true} )
    @JoinColumn({
        name: 'fase_id',
        referencedColumnName: 'id_fase'
    })
    fase: Fase;
    //FIN FASE

    @Column({
        type: "boolean",
        default: false
    })
    tiene_extramuro: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    tiene_granja: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    tiene_semilibertad: boolean;

    

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
