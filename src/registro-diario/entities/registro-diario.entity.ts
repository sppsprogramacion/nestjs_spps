import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { MotivoAtencion } from "src/motivos_atencion/entities/motivos_atencion.entity";
import { Organismo } from "src/organismos/entities/organismo.entity";
import { OrganismoDestino } from "src/organismos_destino/entities/organismos_destino.entity";
import { SectorDestino } from "src/sectores_destino/entities/sectores_destino.entity";
import { TipoAcceso } from "src/tipos_acceso/entities/tipos_acceso.entity";
import { TipoAtencion } from "src/tipos_atencion/entities/tipos_atencion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('registro_diario')
export class RegistroDiario {

    @PrimaryGeneratedColumn()
    id_resgistro_diario: number;  
    
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
    ciudadano: OrganismoDestino;
    //FIN CIUDADANO

    //TIPO ATENCION
    @Column({
        type: 'int',
        nullable: false
    })
    tipo_atencion_id: number;
    
    @ManyToOne(type => TipoAtencion, {eager: true} )
    @JoinColumn({
        name: 'tipo_atencion_id',
        referencedColumnName: 'id_tipo_atencion'
    })
    tipo_atencion: TipoAtencion;
    //FIN TIPO ATENCION

    //TIPO ACCESO
    @Column({
        type: 'int',
        nullable: false
    })
    tipo_acceso_id: number;
    
    @ManyToOne(type => TipoAcceso, {eager: true} )
    @JoinColumn({
        name: 'tipo_acceso_id',
        referencedColumnName: 'id_tipo_acceso'
    })
    tipo_acceso: TipoAcceso;
    //FIN TIPO ACCESO

    //SECTOR DESTINO
    @Column({
        type: 'int',
        nullable: false
    })
    sector_destino_id: number;
    
    @ManyToOne(type => SectorDestino, {eager: true} )
    @JoinColumn({
        name: 'sector_destino_id',
        referencedColumnName: 'id_sector_destino'
    })
    sector_destino: SectorDestino;
    //FIN SECTOR DESTINO

    //MOTIVO ATENCION
    @Column({
        type: 'int',
        nullable: false
    })
    motivo_atencion_id: number;
    
    @ManyToOne(type => MotivoAtencion, {eager: true} )
    @JoinColumn({
        name: 'motivo_atencion_id',
        referencedColumnName: 'id_motivo_atencion'
    })
    motivo_atencion: MotivoAtencion;
    //FIN MOTIVO ATENCION

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    interno: string

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_ingreso: Date;

    @Column({
        type: 'time',
        nullable: false,
    })
    hora_ingreso: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    hora_egreso: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    observaciones: string;

    @Column({
        type: "boolean",
        default: false
    })
    anulado: boolean;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: true
    })
    detalle_anulado: string;

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
        nullable: false
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
